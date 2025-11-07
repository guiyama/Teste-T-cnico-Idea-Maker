describe('🏠 Home Page - Validate Arrivals Section', () => {
  it('Should display exactly three visible Arrivals on the Home Page', () => {

    cy.log('Visiting the practice website')
    cy.visit('http://practice.automationtesting.in/')

    cy.log('Navigating to the Shop menu')
    cy.contains('a', 'Shop').click({ force: true })

    cy.log('Returning to the Home Page')
    cy.contains('a', 'Home').click({ force: true })

    cy.log('Verifying that only three Arrivals are displayed')
    cy.get('.woocommerce-LoopProduct-link', { log: false })
      .should('have.length', 3)
      .then(($products) => {
        cy.log(`Found ${$products.length} products under the Arrivals section`)
      })

    cy.log('Ensuring all Arrivals are visible')
    cy.get('.woocommerce-LoopProduct-link', { log: false })
      .each(($el, index) => {
        cy.wrap($el, { log: false }).should('be.visible')
        cy.log(`Arrival product ${index + 1} is visible`)
      })

    cy.log('Test completed successfully!')
  })
})
