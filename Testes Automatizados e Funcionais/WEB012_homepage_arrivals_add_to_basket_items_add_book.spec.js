describe('Home Page - Arrivals - Add to Basket - Items - Add Book', () => {

  beforeEach(() => {
    // Open the browser & 2) Enter the URL
    cy.visit('http://practice.automationtesting.in/', { log: false });
  });

  it('should allow updating basket quantity at checkout', () => {
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
    
    // Change quantity in cart (e.g., from 1 to 2)
    cy.get('input.qty', { log: false })
      .should('be.visible')
      .clear({ log: false })
      .type('2', { log: false });

    // Verify Update Basket button becomes clickable
    cy.get('[name="update_cart"]', { log: false })
      .should('not.be.disabled');

    // Click on Update Basket
    cy.get('[name="update_cart"]', { log: false }).click({ log: false });

    // Validate basket updated successfully
    cy.get('.woocommerce-message', { log: false })
      .should('be.visible')
      .and('contain.text', 'Basket updated')
      .then(() => {
        cy.log('Basket successfully updated at checkout');
      });
  });
});