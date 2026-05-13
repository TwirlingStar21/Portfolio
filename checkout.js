function renderCheckout() {
  const container = document.getElementById("order-summary");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("checkout-total").textContent = "$0";
    return 0;
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

const total = renderCheckout();

// PayPal Buttons
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toString()
        }
      }]
    });
  },

  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert("Payment completed! Thank you, " + details.payer.name.given_name);

      const productName = cart.map(item => item.name).join(", ");

      emailjs.send("service_pnlkfq5", "template_8kpovh2", {
        customer_name: details.payer.name.given_name,
        customer_email: details.payer.email_address,
        product_name: productName,
        order_total: total
      }).then(function(response) {
        console.log("Email sent successfully!", response.status, response.text);
      }, function(error) {
        console.error("Failed to send email.", error);
      });

      emailjs.send("service_pnlkfq5", "template_29u58cl", {
        customer_name: details.payer.name.given_name,
        customer_email: details.payer.email_address,
        product_name: productName,
        order_total: total,
        order_time: new Date().toLocaleString()
      }).then(function(response) {
        console.log("Email sent successfully!", response.status, response.text);
      }, function(error) {
        console.error("Failed to send email.", error);
      });

      
      localStorage.removeItem("cart");
      window.location.href = "thankyou.html";

    });
  }
}).render('#paypal-button-container');
