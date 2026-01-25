import { getLocalStorage, setLocalStorage, updateCartCounter } from "./utils.mjs";
export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {

    const mainTag = document.querySelector("main");
    this.product = await this.dataSource.findProductById(this.productId);



    const template = document.getElementById("product-template");
    this.renderProductDetails(mainTag, this.product, template);


    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));

  }

  addProductToCart(producto) {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    cartItems.push(producto);
    setLocalStorage("so-cart", cartItems);
    updateCartCounter(); // Update cart counter immediately
  }

  async addToCartHandler(e) {
    const product = await this.dataSource.findProductById(e.target.dataset.id);

    this.product = product;
    this.addProductToCart(product);
  }

  renderProductDetails(node, producto, template) {
    const clone = template.content.cloneNode(true);
    const [title, subTitle, image, price, color, desc, btn] = clone.querySelectorAll("h3, h2, img, p, p, p, button")

    title.textContent = producto.Brand.Name;
    subTitle.textContent = producto.NameWithoutBrand;
    image.src = producto.Images.PrimaryLarge;
    price.textContent = `$ ${producto.ListPrice}`;
    color.textContent = producto.Colors[0].ColorName;
    desc.innerHTML = producto.DescriptionHtmlSimple;
    btn.dataset.id = `${producto.Id}`

    node.appendChild(clone);
  }
}

