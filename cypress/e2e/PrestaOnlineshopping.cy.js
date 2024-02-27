describe("Presta Online Shopping", () => {
  beforeEach(() => {
    cy.visit("/"); //visiting the base url
    cy.get("ul#homefeatured").find("li").as("itemlist");
  });

  //checking the default product count and printing the item names
  it("Returns default products in a website", () => {
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
  });

  // Validating the Result when the user searches for a Product
  it("Returns the correct result when a user search a product", () => {
    cy.get('input[class="search_query form-control ac_input"]').type(
      Cypress.env("productname")
    ); //used a environment variable to give input
    cy.get("div.ac_results")
      .find("li")
      .then(($itemresult) => {
        expect($itemresult[0].textContent).contains(Cypress.env("productname"));
      });
  });

  // Checking the navigation of a product when clicked randomly
  it("Navigates to detailed page when a product clicked", () => {
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
  });
 // Validating the description of the product in product detail page by passing the clicked item url 
  it("validating the shortdesc of the product in product detail page", () => {
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
  });

  // validating the quantity of the cart when the product is added by passing the clicked item url

  it("validating the cart quantity", () => {
    cy.readFile("cypress/fixtures/Itemdetails.json").then(function (expectedurl) {
      cy.visit(expectedurl.itemlink);
      cy.get("button.exclusive").should("be.enabled").click();
      cy.get(".title > .ajax_cart_product_txt")
        .invoke("text")
        .then((cartquant) => {
          expect(cartquant).to.contains(1);
        });
    });
  });
  
});
