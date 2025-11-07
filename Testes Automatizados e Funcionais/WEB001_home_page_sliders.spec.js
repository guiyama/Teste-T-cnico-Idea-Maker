describe('Home Page with three Sliders only', () => {

  it('Should display exactly three sliders on the home page', () => {
    
    // Open the browser and navigate to URL
    cy.visit('http://practice.automationtesting.in/');

    // Click on Shop Menu
    cy.contains('a', 'Shop').click({ force: true }); // "Shop" menu item

    // Click on Home Menu
    cy.contains('a', 'Home').click({ force: true }); // "Home" menu item

    // Verify that the Home page contains only three sliders
    // Sliders are inside the "n2-ss-slider" or similar container
    cy.get('#n2-ss-6 .n2-ss-slide-background') // selector for each slider image
      .should('have.length', 3); // expect exactly 3

  });

});