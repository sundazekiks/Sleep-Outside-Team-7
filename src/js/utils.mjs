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
// Travis - tweaked the getParams function to handle 2 queryParams; Change it to retun an array if there are more than 1 param
export const getParams = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const arr = [...urlParams.values()]
  console.log(arr.length)


  // condition if there are 2 elements in the query
  if (arr.length !== 2) {
    return arr[0]
  }

  return arr
}

// render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map((item) => templateFn(item))
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
