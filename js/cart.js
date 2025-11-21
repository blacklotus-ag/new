document.addEventListener("DOMContentLoaded", () => {
  // Load initial count from localStorage
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const productCenter = document.querySelector(".product-center");
  
  const cartCounters = document.querySelectorAll(
    ".navigation .icon .bx-cart + span"
  );
  
  const updateCartCounters = () => {
    cartCounters.forEach((counter) => {
      counter.textContent = cartCount;
    });
  };
  
  // Event delegation for product cart buttons
  if (productCenter) {
    productCenter.addEventListener("click", (event) => {
      const cartButton = event.target.closest(".product-item .icons .bx-cart");
      if (!cartButton) return;
  
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      updateCartCounters();
    });
  }

  // Initial update on page load
  updateCartCounters();
});