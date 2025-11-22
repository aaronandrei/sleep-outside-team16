import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const productList = document.querySelector(".product-list");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  if (!cartItems.length) {
    productList.innerHTML = "<li>Your cart is emtpy.</li>";
    return;
  }
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  const qty = item.quantity || 1;

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <label class="cart-card__quantity">
    qty: 
    <input
      class=cart-qty"
      type="number"
      min="1"
      value="${qty}"
      data-index="${index}"
  </label>
  <p class="cart-card__price">$${(item.FinalPrice * qty).toFixed(2)}</p>
</li>`;

  return newItem;
}

// listen for changes on any quantity input (event delegation)
productList.addEventListener("change", (e) => {
  if (!e.target.matches(".cart-qty")) return;

  const index = parseInt(e.target.dataset.index, 10);
  let qty = parseInt(e.target.value, 10);

  // guard against bad values
  if (isNaN(qty) || qty < 1) {
    qty = 1;
    e.target.value = 1;
  }

  let cartItems = getLocalStorage("so-cart") || [];

  if (!Array.isArray(cartItems) || !cartItems[index]) {
    return;
  }

  cartItems[index].quantity = qty;
  setLocalStorage("so-cart", cartItems);

  // re-render so price updates
  renderCartContents();
});

// initial render
renderCartContents();
