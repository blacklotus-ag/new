document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const renderCart = () => {
    if (!cartContainer) return;

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div style="text-align: center; padding: 5rem 0;">
            <h2>Your cart is empty</h2>
            <a href="product.html" class="btn" style="margin-top: 2rem;">Shop Now</a>
        </div>
      `;
      return;
    }

    let subtotal = 0;
    const cartTableBody = cartItems
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
        <tr>
          <td>
            <div class="cart-info">
              <img src="${item.image}" alt="${item.name}" />
              <div>
                <p>${item.name}</p>
                <span>Price: $${item.price.toFixed(2)}</span> <br />
                <a href="#" class="remove-item" data-id="${item.id}">remove</a>
              </div>
            </div>
          </td>
          <td><input type="number" value="${item.quantity}" min="1" class="item-quantity" data-id="${item.id}"/></td>
          <td>$${itemTotal.toFixed(2)}</td>
        </tr>
      `;
      })
      .join("");

    cartContainer.innerHTML = `
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        ${cartTableBody}
      </table>
      <div class="total-price">
        <table>
          <tr>
            <td>Subtotal</td>
            <td>$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>$${subtotal.toFixed(2)}</td>
          </tr>
        </table>
        <a href="#" class="checkout btn">Proceed To Checkout</a>
      </div>
    `;
  };

  const updateCartItem = (id, newQuantity) => {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // Note: You would also update the main cart counter here
        renderCart();
    }
  };

  // Initial render
  renderCart();
});