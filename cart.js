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
