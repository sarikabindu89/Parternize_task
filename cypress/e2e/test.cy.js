describe("Presta Online Shopping", () => {
it("Returns default products in a website", () => {
cy.visit("https://cms.demo.katalon.com/")
for(let i = 0;i<4;i++)
{
cy.get('div[class="columns-3"]').find('ul[class="products columns-3"]').find('li').find('a[class="button product_type_simple add_to_cart_button ajax_add_to_cart"]').its('length')
    .then($itemnum =>{
    
   cy.get('a[class="button product_type_simple add_to_cart_button ajax_add_to_cart"]').eq(Math.floor(Math.random()*$itemnum)).
    should('have.text','Add to cart').click()

   
    
    })
  
  }
  

  cy.visit("https://cms.demo.katalon.com/cart/")
  cy.get('table').find('tr[class="woocommerce-cart-form__cart-item cart_item"]').should('have.length',4)
 

   // cypress/integration/cart.spec.js



    cy.getCartPrices().then((cartPrices) => {
      // Check if there are prices in the cart
      expect(cartPrices).to.have.length.greaterThan(0);

      // Find the minimum price using JavaScript
      const minPrice = Math.min(...cartPrices);

      // Log the minimum price to the Cypress command log
      cy.log(`The minimum price in the cart is $${minPrice.toFixed(2)}`);
      const index = cartPrices.indexOf(minPrice)
      cy.log(index)
      cy.get('table[class="shop_table shop_table_responsive cart woocommerce-cart-form__contents"] tr[class="woocommerce-cart-form__cart-item cart_item"]').eq(index).then($item =>{
        cy.wrap($item).find('a.remove').click()
        cy.get('table').find('tr[class="woocommerce-cart-form__cart-item cart_item"]').should('have.length',3)

      })
        // Do something with each <tr> element
       


    });
  });
});

  






// cypress/integration/cart.spec.js


    // Use the custom command to add random items to the cart
   // cy.addRandomItemsToCart(5); // Add 5 random items (you can change the number)

    // Find the minimum total price in the cart
   


// cypress/integration/my-test.spec.js


  /*it('should click on 4 random elements', () => {
    // Visit the webpage you want to test
    cy.visit("https://cms.demo.katalon.com/");

    // Select all the elements you want to choose from (adjust the selector)
    cy.get('div[class="columns-3"]').find('ul[class="products columns-3"]').find('li').find('a[class="button product_type_simple add_to_cart_button ajax_add_to_cart"]')
    .then(($elements) => {
      // Ensure there are at least 4 elements to click
     

      // Create an array of 4 unique random indices
      const randomIndices = generateRandomIndices($elements.length, 4);

      // Click on the random elements
      randomIndices.forEach((index) => {
        cy.wrap($elements[index]).click()
        
      });
    });
    //cy.visit("https://cms.demo.katalon.com/cart/")
   // cy.get('tr[class="woocommerce-cart-form__cart-item cart_item"]').find('span[class="woocommerce-Price-amount amount"]').invoke('text').then($itemprice => {
    //  cy.log($itemprice)
   // })

   cy.visit("https://cms.demo.katalon.com/cart/")
   cy.get('tr[class="woocommerce-cart-form__cart-item cart_item"]').find('span[class="woocommerce-Price-amount amount"]').invoke('text').then($itemprice => {
    cy.log($itemprice)
   })
    });
  })
  
     


// Helper function to generate unique random indices

function generateRandomIndices(maxIndex, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}*/