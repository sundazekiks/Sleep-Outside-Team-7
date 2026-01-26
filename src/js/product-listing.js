import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderListWithTemplate, updateCartCounter, loadHeaderFooter } from "./utils.mjs";
import { productCardTemplate } from "./product-card-temp.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize cart counter on page load
updateCartCounter();

// Create product data instance for tents
const productData = new ProductData("tents");

// Create and initialize product list
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);

// Fetch and render products
productList.init().then((products) => {
  renderListWithTemplate(
    productCardTemplate,
    document.querySelector(".product-list"),
    products,
    "beforeend",
    true,
  );
});