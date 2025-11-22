import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart"); //get cart array of items from local if null set to empty array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  const existing = cartItems.find((item) => item.Id === product.Id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.currentTarget.dataset.id;
  const product = await dataSource.findProductById(id);
  addProductToCart(product);
}

// add listener to Add to Cart button
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton) {
  addToCartButton.addEventListener("click", addToCartHandler);
}
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
