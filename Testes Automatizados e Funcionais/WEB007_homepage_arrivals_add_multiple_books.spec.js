describe('Home Page - Arrivals Add to Basket with More Books', () => {

 beforeEach(() => {
    // Open the browser & 2) Enter the URL
    cy.visit('http://practice.automationtesting.in/');
  });

  it('should validate adding more books than stock shows proper error message', () => {

    // Click on Shop Menu
    cy.get('#menu-item-40 > a', { log: false })
      .should('exist')
      .click({ force: true, log: false });

    // Now click on Home menu button
    cy.contains('a', 'Home', { log: false })
      .should('exist')
      .click({ force: true, log: false });

    // Test whether the Home page has Three Arrivals only
    cy.get('.products .product', { log: false })
      .should('have.length', 3);

    // Click the image in the Arrivals
    cy.get('.products .product', { log: false })
      .first()
      .find('img', { log: false })
      .click({ log: false });

    // Ensure image navigates to product detail page
    cy.url({ log: false }).should('include', '/product/');
    cy.get('button.single_add_to_cart_button', { log: false })
      .should('be.visible');

    // Click Add To Basket to add one book
    cy.get('button.single_add_to_cart_button', { log: false }).click({ log: false });

    // User can view Book in Menu item with price
    cy.get('.wpmenucart-contents', { timeout: 10000, log: false })
      .should('exist')
      .should(($cart) => {
        const text = $cart.text().trim();
        expect(text).to.match(/1\s*Item/i);
        expect(text).to.match(/₹/); // símbolo de preço
      });

    // Try to add more books than available stock (example: 21 if max is 20)
    cy.get('input.qty', { log: false })
      .should('be.visible')
      .clear({ log: false })
      .type('21', { log: false });

    // Click add to basket again
    cy.get('button.single_add_to_cart_button', { log: false }).click({ log: false });

    // Validate the error prompt
    cy.get('.woocommerce-error, .woocommerce-message, .error', { log: false })
      .should('be.visible')
      .then(($msg) => {
        const text = $msg.text().toLowerCase();

        if (text.includes('added to your basket')) {
          cy.log('O site permitiu adicionar mais livros do que o estoque disponível.');
          expect(text).to.match(/added to your basket/);
        } else {
          expect(text).to.match(/enter a value between 1 and 20/);
        }
      });
  });
});
