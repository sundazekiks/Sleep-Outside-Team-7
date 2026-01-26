import { renderListWithTemplate } from "./utils.mjs";

// Template for product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

// Product list class
export default class ProductList {

  // Constructor
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  // Initialize product list
  async init() {
    const ls = await this.dataSource.getData(this.category);
    this.renderList(ls)
    document.querySelector(".title").textContent = this.category;
  }

  // Render list of products
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

}
