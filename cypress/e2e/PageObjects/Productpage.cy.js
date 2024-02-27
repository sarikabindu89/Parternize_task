class Productpage
{
    getProductDetails()
    {
        cy.get("ul#homefeatured")
        .find("li")
        .its("length")
        .then((itemnum) => Cypress._.random(0, itemnum - 1))
        .then((itemindex) => {
          cy.log(itemindex);
          cy.get("a.product-name")
            .eq(itemindex)
            .invoke("text")
            .then((expecteditemname) => {
              cy.get("div.product-container")
                .find("div.right-block")
                .find("p.product-desc")
                .eq(itemindex)
                .invoke("text")
                .then((expecteditemdesc) => {
                  cy.get("a.product-name")
                    .eq(itemindex)
                    .should("have.attr", "href")
                    .then((expecteditemlink) => {
                      cy.writeFile("cypress/fixtures/Itemdetails.json", { //writing a itemdetails.json file with item details
                        itemname: expecteditemname,
                        itemdesc: expecteditemdesc,
                        itemlink: expecteditemlink,
                      });
                      cy.get("ul#homefeatured")
                        .find("li")
                        .find("div.product-container")
                        .find("a.product_img_link")
                        .eq(itemindex)
                        .click();
                      cy.get("h1")
                        .invoke("text")
                        .then((actualitemname) => {
                          expect(actualitemname).eq(
                            expecteditemname.replace(/\n/g, "") // validating the Item name before and after navigating
                          );
                        });
                    });
                });
            });
        });
    }
    validateproductdetailsafterclick()
    {
        cy.readFile("cypress/fixtures/Itemdetails.json").then(function (expectedurl) {
            cy.visit(expectedurl.itemlink);
            const expecteditemdesc = expectedurl.itemdesc;
      
            cy.get('div[id="short_description_content"]')
              .find("p")
              .invoke("text")
              .then((shortdesc) => {
                expect(shortdesc).to.contains(expecteditemdesc.replace(/\n/g, ""), {
                  matchCase: false,
                });
              });
          });
    }
}
module.exports = {Productpage}