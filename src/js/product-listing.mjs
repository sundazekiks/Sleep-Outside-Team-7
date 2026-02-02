import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams, capitalize, updateCartCounter } from "./utils.mjs";


updateCartCounter();

const category = getParams();

document.getElementById("category").textContent = capitalize(category)
// first create an instance of the ProductData class.
const dataSource = new ProductData(category);
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();
