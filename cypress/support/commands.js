// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

    // cypress/support/commands.js
    // cypress/support/commands.js
Cypress.Commands.add('writeToFile', (filename, data) => {
  cy.writeFile(filename, data);
});

Cypress.Commands.add('getCartPrices', () => {
    const cartPrices = [];
  
    // Add commands here to navigate to the cart page and select cart items
    // Replace the selectors and commands as per your website structure
    cy.get('table').find('tr[class="woocommerce-cart-form__cart-item cart_item"]').find('td[class="product-price"]').find('span[class="woocommerce-Price-amount amount"]').each(($price) => {
      const priceText = $price.text();
      const priceValue = parseFloat(priceText.replace('$', '').replace(',', '')); // Adjust for your currency format
      cartPrices.push(priceValue);
    });
  
    return cy.wrap(cartPrices);
  });
  
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })