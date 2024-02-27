import {Homepage} from "../PageObjects/Homepage.cy.js"
import {Given,When,And,Then} from "@badeball/cypress-cucumber-preprocessor";
    Given ('Open Home page',()=>{
    const homepageurl = new Homepage()
    homepageurl.getHomepage()
    })
    Then ('Homepage opened get all the default Products',() =>{
        const getdefaultproducts = new Homepage()
        getdefaultproducts.getDefaultProducts()
    })
    When ('Type the Product',() =>{
        const productsearch = new Homepage()
        productsearch.typeProduct()
    })
    Then ('Validate product details when clicked',() => {
        const validateproductdetails = new Homepage()
        validateproductdetails.fetchProductDetail()
    })