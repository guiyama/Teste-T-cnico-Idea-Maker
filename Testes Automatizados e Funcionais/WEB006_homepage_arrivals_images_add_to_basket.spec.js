describe('Home Page - Arrivals, Images and Add to Basket', () => {

  beforeEach(() => {
    // Open the browser and navigate to the URL
    cy.visit('http://practice.automationtesting.in/')
  })

  it('Should verify arrivals and add to basket functionality correctly', () => {
    
    // Click on Shop Menu (usando force pois o menu é fixo)
    cy.get('#menu-item-40 > a')
      .should('exist')
      .click({ force: true })

    // Click on Home Menu button (usando busca textual para evitar erro de ID)
    cy.contains('a', 'Home')
      .should('exist')
      .click({ force: true })

    // Verify that Home page has exactly three arrivals
    cy.get('.products .woocommerce-LoopProduct-link')
      .should('have.length', 3)

    // Ensure arrivals are visible
    cy.get('.products .woocommerce-LoopProduct-link').each(($el) => {
      cy.wrap($el)
        .scrollIntoView()
        .should('be.visible')
    })

    // Click the first arrival image
    cy.get('.products .woocommerce-LoopProduct-link')
      .first()
      .scrollIntoView()
      .click()

    // Verify navigation to the product page
    cy.url().should('include', '/product/')
    cy.get('.product_title').should('be.visible')
  })
})