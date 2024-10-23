class Cartpage
{
    getCountonCart()
    {
        cy.readFile("cypress/fixtures/Itemdetails.json").then(function (expectedurl) {
            cy.visit(expectedurl.itemlink);
            cy.get("button.exclusive1").should("be.enabled").click();
        });
    }
    validatecartquant()
    {

            cy.get(".title > .ajax_cart_product_txt")
              .invoke("text")
              .then((cartquant) => {
                expect(cartquant).to.contains(1);
              });
            }
        
    
}
module.exports = {Cartpage}
