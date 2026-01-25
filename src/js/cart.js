import { getLocalStorage, setLocalStorage, updateCartCounter } from "./utils.mjs";

// Initialize cart counter on page load
updateCartCounter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // render cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // NEW: render cart total
  renderCartTotal(cartItems);
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  // hide if cart is empty
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  // calculate total
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);

  // display total
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__id"><span class="remove-product" data-id="${item.Id}">X</span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.addEventListener("click", (event) => {
  if (event.target.matches(".remove-product")) {
    removeFromCart(event.target.dataset.id)
  }
})


function removeFromCart(productId) {
  console.log("product id :", productId)
  const cartItems = getLocalStorage("so-cart")
  if (!cartItems || !cartItems.length) return;

  const index = cartItems.findIndex(product => product.Id === productId)

  if (index !== -1) {
    cartItems.splice(index, 1)
  }

  if (cartItems.length === 0) {
    localStorage.removeItem("so-cart")
  } else {
    setLocalStorage("so-cart", cartItems)
  }

  renderCartContents();
  updateCartCounter(); // Update cart counter after removing items
}
renderCartContents();
