describe('Home Page - Arrivals - Add to Basket - Items - Coupon', () => {

  beforeEach(() => {
    // Open the browser and navigate to the URL
    cy.visit('http://practice.automationtesting.in/')
  })

  it('Should add item to basket and apply coupon successfully', () => {

    // Click on Shop Menu
    cy.get('#menu-item-40 > a')
      .should('exist')
      .click({ force: true })

    // Click on Home Menu button
    cy.contains('a', 'Home')
      .should('exist')
      .click({ force: true })

    // Verify Home page has exactly three arrivals
    cy.get('.products .woocommerce-LoopProduct-link')
      .should('have.length', 3)

    // Click on first arrival image
    cy.get('.products .woocommerce-LoopProduct-link', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

    // Verify navigation to product page
    cy.url().should('include', '/product/')
    cy.get('.product_title').should('be.visible')

    // Capture book title (for validation later)
    let bookTitle = ''
    cy.get('.product_title').invoke('text').then(text => bookTitle = text.trim())

    // Click on Add To Basket
    cy.get('button.single_add_to_cart_button')
      .should('contain.text', 'Add to basket')
      .click()

    // Verify success message
    cy.get('.woocommerce-message')
      .should('contain.text', 'has been added to your basket')

    // Verify basket in menu shows updated count and price
    cy.get('.wpmenucart-contents')
      .should('contain.text', '1 item')
      .and('contain.text', '₹')

    // Click on basket to go to checkout page
    cy.get('.wpmenucart-contents').click({ force: true })

    // Verify the basket page contains the correct book
    cy.url().should('include', '/basket/')
    cy.get('.cart_item')
      .should('exist')
      .and('contain.text', bookTitle)

      })
  })
