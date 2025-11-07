describe('Home Page - Arrivals - Add to Cart - Remove Item', () => {
      beforeEach(() => {
    // Open the browser and navigate to URL
    cy.visit('http://practice.automationtesting.in/')
    cy.title().should('include', 'Automation Practice Site')
  })

  it('should add a book from Arrivals and remove it from the cart successfully', () => {

    // Click on Shop Menu
    cy.get('#menu-item-40 > a')
      .should('exist')
      .click({ force: true })

    // Click on Home Menu button
    cy.contains('a', 'Home')
      .should('exist')
      .click({ force: true })

    // Verify Home page has exactly 3 arrivals
    cy.get('.products .woocommerce-LoopProduct-link')
      .should('have.length', 3)

    // Click on second arrival (some books cost < 450)
    cy.get('.products .woocommerce-LoopProduct-link')
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

    // Verify navigation to product page
    cy.location('href')
      .should('include', '/product/')
    cy.get('.product_title').should('be.visible')

    // Capture book title and price
    let bookTitle = ''
    let bookPrice = 0

    cy.get('.product_title').invoke('text').then(text => bookTitle = text.trim())
    cy.get('.price > span').first().invoke('text').then(priceText => {
      // Remove currency symbol and convert to number
      bookPrice = Number(priceText.replace(/[₹,]/g, '').trim())
    })

    // Add book to basket
    cy.get('button.single_add_to_cart_button')
      .should('contain.text', 'Add to basket')
      .click()

    // Confirm success message
    cy.get('.woocommerce-message')
      .should('contain.text', 'has been added to your basket')

    // Click on basket menu to view items
    cy.get('.wpmenucart-contents')
      .should('contain.text', '1 item')
      .click({ force: true })

    // Verify that basket page contains the correct book
    cy.url().should('include', '/basket/')
    cy.get('.cart_item')
      .should('contain.text', bookTitle)

    // Clicar no ícone de remover livro (x)
    cy.get('.remove', { log: false }).first().click({ force: true, log: false });

    // Verificar se o carrinho ficou vazio
    cy.get('.cart-empty', { log: false })
      .should('be.visible')
      .and('contain.text', 'Your basket is currently empty')
      .then(() => {
        cy.log('Livro removido com sucesso do carrinho');
  })
})
})
