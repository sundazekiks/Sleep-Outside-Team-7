import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate, updateCartCounter, loadHeaderFooter } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";
import Alert from "./Alert.js";
// Initialize cart counter on page load
loadHeaderFooter()
updateCartCounter();


const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));

productList.init().then(products => {
  renderListWithTemplate(productCardTemplate, document.querySelector(".product-list"), products, "beforeend", true);
})

const a = new Alert(document.getElementById("atemp"), document.getElementById("alertHolder"))

a.generateAlert()










