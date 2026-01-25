import { getParams, updateCartCounter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Initialize cart counter on page load
updateCartCounter();

const query = getParams();
console.log(query)
const productId = query[0]
const category = query[1]
const dataSource = new ProductData(category);

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

// add listener to Add to Cart button

