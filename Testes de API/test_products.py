import json
from jsonschema import validate


# --- Função para carregar o schema (sem precisar de fixture separada) ---
def load_schema():
    with open("tests/schemas/product_schema.json", "r", encoding="utf-8") as f:
        return json.load(f)


# --- GET /products – listar produtos ---
def test_get_all_products(client, base_url):
    res = client.get(f"{base_url}/products")
    assert res.status_code == 200

    data = res.json()
    assert "products" in data
    assert isinstance(data["products"], list)
    assert len(data["products"]) > 0

    validate(instance=data["products"][0], schema=load_schema())


# --- POST /products/add – criar produto ---
def test_create_product(client, base_url):
    payload = {
        "title": "Produto Teste",
        "price": 99.99,
        "description": "Produto criado para teste automatizado",
        "category": "automation"
    }

    res = client.post(f"{base_url}/products/add", json=payload)

    # Aceita status code 200 ou 201
    assert res.status_code in [200, 201], f"Status inesperado: {res.status_code}"

    data = res.json()
    assert data["title"] == payload["title"]
    validate(instance=data, schema=load_schema())


# --- PUT /products/{id} – atualizar produto ---
def test_update_product(client, base_url):
    payload = {"price": 149.99}
    res = client.put(f"{base_url}/products/1", json=payload)
    assert res.status_code == 200

    data = res.json()
    assert data["price"] == 149.99
    validate(instance=data, schema=load_schema())


# --- DELETE /products/{id} – remover produto ---
def test_delete_product(client, base_url):
    res = client.delete(f"{base_url}/products/1")
    assert res.status_code == 200

    data = res.json()
    assert "isDeleted" in data
    assert data["isDeleted"] is True

