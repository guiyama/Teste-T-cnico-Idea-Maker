describe('🏠 Home Page - Arrivals images should navigate correctly', () => {

  it('Should navigate to product page when clicking on an Arrival image', () => {

    cy.log('Visiting the practice website')
    cy.visit('http://practice.automationtesting.in/')

    cy.log('Navigating to the Shop menu')
    cy.contains('a', 'Shop')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.log('Returning to the Home Page')
    cy.contains('a', 'Home')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.log('Verifying that only three Arrivals are displayed')
    cy.get('.woocommerce .products .product', { log: false })
      .should('have.length', 3)
      .then(($products) => {
        cy.log(`Found ${$products.length} arrivals on the Home Page`)
      })

    cy.log('Clicking the first Arrival image')
    cy.get('.woocommerce .products .product')
      .first()
      .find('img')
      .should('be.visible')
      .click({ force: true })

    cy.log('Verifying navigation to the product detail page')
    cy.url().should('include', '/product/')
    cy.get('button.single_add_to_cart_button')
      .should('be.visible')
      .and('contain.text', 'Add to basket')

    cy.log('Image click successfully navigated to the product page!')
  })
})
