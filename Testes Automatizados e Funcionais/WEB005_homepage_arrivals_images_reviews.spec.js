describe('Home Page - Arrivals, Images and Reviews', () => {
  
  beforeEach(() => {
    cy.visit('http://practice.automationtesting.in/')
  })

  it('Verifies arrivals, navigation, and review section', () => {
    cy.get('#menu-item-40 > a')
      .should('exist')
      .click({ force: true })

    cy.contains('a', 'Home')
      .should('exist')
      .click({ force: true })

    cy.get('.products .woocommerce-LoopProduct-link')
      .should('have.length', 3)
      .each(($el) => {
        cy.wrap($el)
          .scrollIntoView()
          .should('be.visible')
      })

    cy.get('.products .woocommerce-LoopProduct-link')
      .first()
      .scrollIntoView()
      .click()

    cy.url().should('include', '/product/')
    cy.get('.product_title').should('be.visible')

    cy.get('button.single_add_to_cart_button')
      .should('be.visible')
      .and('contain', 'Add to basket')

    cy.get('.reviews_tab')
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.get('#reviews').should('be.visible')
    cy.get('#comments').should('exist')
    cy.get('#review_form_wrapper').should('exist')
  })
})
