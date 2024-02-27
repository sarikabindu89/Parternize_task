import { Cartpage } from "../PageObjects/Cartpage.cy";
import {Given,When,And,Then} from "@badeball/cypress-cucumber-preprocessor";


When ('Click on Add Product', ()=> {
    const addquantoncart = new Cartpage()
    addquantoncart.getCountonCart()
})
Then ('Validate the quantity on cart', () => {
    const cartcount = new Cartpage()
    cartcount.validatecartquant()
})