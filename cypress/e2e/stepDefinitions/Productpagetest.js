import { Productpage } from "../PageObjects/Productpage.cy";
import {Given,When,And,Then} from "@badeball/cypress-cucumber-preprocessor";

When ('Click on Random Product',()=>{
    const productclick = new Productpage()
    productclick.getProductDetails()

})
Then ('Validate the Product Details', ()=>{
    const getproductdetails = new Productpage()
    getproductdetails.validateproductdetailsafterclick()
})

