describe('Home Page - Arrivals Images and Description', () => {

  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/')

    cy.contains('a', 'Shop')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.contains('a', 'Home')
      .scrollIntoView()
      .should('exist')
      .click({ force: true })
  })

  it('Verifies arrivals, navigates to product page, and checks description tab', () => {
    // Verify that Home page has exactly 3 arrivals
    cy.get('.woocommerce .products .product', { log: false })
      .should('have.length', 3)

    // Click the first Arrival image
    cy.get('.woocommerce .products .product')
      .first()
      .find('img')
      .should('be.visible')
      .click({ force: true })

    // Verify product page URL
    cy.url().should('include', '/product/')

    // Verify "Add to basket" button is visible
    cy.get('button.single_add_to_cart_button')
      .should('be.visible')
      .and('contain.text', 'Add to basket')

    // Open Description tab
    cy.get('a[href="#tab-description"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

    // Verify description content is visible and not empty
    cy.get('#tab-description')
      .should('be.visible')
      .and(($desc) => {
        expect($desc.text().trim()).to.not.be.empty
      })
  })
})
