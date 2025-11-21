document.addEventListener("DOMContentLoaded", () => {
  // Load initial state from localStorage
  let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
  const productCenter = document.querySelector(".product-center");
  
  const wishlistCounters = document.querySelectorAll(
    ".navigation .icon .bx-heart + span"
  );
  
  const updateWishlistCounters = () => {
    const likedCount = likedItems.length;
    wishlistCounters.forEach((counter) => {
      counter.textContent = likedCount;
    });
  };

  const updateLikeButtonsUI = () => {
    const productLikeButtons = document.querySelectorAll(
      ".product-item .icons .bx-heart"
    );
    productLikeButtons.forEach(button => {
        const productItem = button.closest('.product-item');
        const productName = productItem.querySelector('.product-info a').textContent;
        if (likedItems.some(item => item.name === productName)) {
            button.classList.add("bxs-heart");
        } else {
            button.classList.remove("bxs-heart");
        }
    });
  };

  // Event delegation for product like buttons
  if (productCenter) {
    productCenter.addEventListener("click", (event) => {
      const likeButton = event.target.closest(".product-item .icons .bx-heart");
      if (!likeButton) return;
  
      const productItem = likeButton.closest(".product-item");
      const productName = productItem.querySelector(".product-info a").textContent;
      const productPrice = productItem.querySelector(".product-info h4").textContent;
      const productImage = productItem.querySelector(".product-thumb img").src;
  
      const itemIndex = likedItems.findIndex(item => item.name === productName);
  
      if (itemIndex > -1) {
        // Item is already liked, so unlike it
        likedItems.splice(itemIndex, 1);
        likeButton.classList.remove("bxs-heart");
      } else {
        // Item is not liked, so like it
        likedItems.push({ name: productName, price: productPrice, image: productImage });
        likeButton.classList.add("bxs-heart");
      }
  
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
      updateWishlistCounters();
    });
  }

  // Initial UI update on page load
  updateWishlistCounters();
  updateLikeButtonsUI();
});