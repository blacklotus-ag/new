document.addEventListener("DOMContentLoaded", () => {
  const renderWishlist = () => {
    const wishlistContent = document.querySelector(".wishlist-content");
    wishlistContent.innerHTML = ""; // Clear current content
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

    if (likedItems.length === 0) {
      wishlistContent.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
    }

    likedItems.forEach((item) => {
      const wishlistItem = document.createElement("div");
      wishlistItem.classList.add("wishlist-item");
      wishlistItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="wishlist-item-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>
        </div>
      `;
      wishlistContent.appendChild(wishlistItem);
    });
  };

  // Use event delegation on the document body
  document.body.addEventListener("click", (event) => {
    // Check if a wishlist icon in the header was clicked
    const wishlistIcon = event.target.closest(".navigation .icon .bx-heart");
    if (wishlistIcon) {
      const wishlistOverlay = document.querySelector(".wishlist-overlay");
      renderWishlist();
      wishlistOverlay.classList.add("open");
    }
    // Check if the close button was clicked
    const closeWishlist = event.target.closest(".wishlist-overlay-close");
    if (closeWishlist) {
      const wishlistOverlay = document.querySelector(".wishlist-overlay");
      wishlistOverlay.classList.remove("open");
    }
  });
});