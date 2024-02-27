class Homepage{
    getHomepage()
    {
        cy.visit("/"); //visiting the base url
        cy.get("ul#homefeatured").find("li").as("itemlist");
    }
    getDefaultProducts()
    {
        cy.get("@itemlist").its("length").should("have.length.eql", 7);

    cy.get("@itemlist").each(($items) => {
      cy.get($items)
        .find("div.product-container")
        .find("div.right-block")
        .then(($itemdetails) => {
          const itemname = $itemdetails.find("a.product-name").text(); //getting all the default product names
          cy.log(itemname);
        });
    });

    }
    typeProduct()
    {
        cy.get('input[class="search_query form-control ac_input"]').type(
            Cypress.env("productname")  //used a environment variable to give input

          );
         }
         fetchProductDetail()
         {
          cy.get("div.ac_results")
            .find("li")
            .then(($itemresult) => {
              expect($itemresult[0].textContent).contains(Cypress.env("productname"));
            });
    }

}
module.exports = {Homepage}