document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
  });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "$0";
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <p>${item.name} — $${item.price}</p>
        <button onclick="removeItem(${index})" class="remove-item">Remove</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = "$" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

if (document.getElementById("cart-items")) {
  renderCart();
}

function renderCheckout() {
  const container = document.getElementById("order-summary");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("checkout-total").textContent = "$0";
    return;
  }

  cart.forEach(item => {
    container.innerHTML += `
      <div class="checkout-item">
        <p>${item.name} — $${item.price}</p>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("checkout-total").textContent = "$" + total;

  return total;
}

if (document.getElementById("order-summary")) {
  renderCheckout();
}
