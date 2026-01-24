// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Function to update cart counter
export function updateCartCounter() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.length;
  const cartCountElement = document.getElementById("cart-count");
  
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// get query string parameters

export const getParams = (params) => {

  const queryString = params;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product");

  return product;
}

// render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

}

// render items using a template function
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template
  if(callback){
    callback(data)
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text()
  return template
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html")
  const footerTemplate = await loadTemplate("../partials/footer.html")

  const headerElement = document.querySelector("#main-header")
  const footerElement = document.querySelector("#main-footer")
  
  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}