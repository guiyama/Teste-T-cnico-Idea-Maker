describe('Home Page - Arrivals - Add to Basket - Items', () => {

  beforeEach(() => {
    // Open your browser and visit the website.
    cy.visit('http://practice.automationtesting.in/')
  })

  it('Should verify adding arrival item to basket and navigating to checkout', () => {
    
    // Click on the “Shop” menu
    cy.get('#menu-item-40 > a')
      .should('exist')
      .click({ force: true })

    // Click on the “Home” menu
    cy.contains('a', 'Home')
      .should('exist')
      .click({ force: true })

    // Check that there are exactly three arrivals
    cy.get('.products .woocommerce-LoopProduct-link')
      .should('have.length', 3)

    // Click on the first arrival (book)
    cy.get('.products .woocommerce-LoopProduct-link')
      .first()
      .scrollIntoView()
      .click()

    // Ensure that you have been redirected to the product page.
    cy.url().should('include', '/product/')
    cy.get('.product_title').should('be.visible')

    // Capture the book title (for later validation)
    let bookTitle = ''
    cy.get('.product_title').invoke('text').then(text => bookTitle = text.trim())

    // Click on the “Add to basket” button
    cy.get('button.single_add_to_cart_button')
      .should('contain.text', 'Add to basket')
      .click()

    // Check success message
    cy.get('.woocommerce-message')
      .should('contain.text', 'has been added to your basket')

    // Check if the cart in the menu shows the item with the price
    cy.get('.wpmenucart-contents')
      .should('contain.text', '1 item')
      .and('contain.text', '₹')

    // Click on the menu item (icon/cart)
    cy.get('.wpmenucart-contents').click({ force: true })

    // Verify that the user has been redirected to checkout (basket).
    cy.url().should('include', '/basket/')
    cy.get('.cart_item')
      .should('exist')
      .and('contain.text', bookTitle)

    // Enter coupon code
    cy.get('#coupon_code').click()
      .should('have.attr', 'name', 'coupon_code')
      .type('krishnasakinala')

  })
})

    