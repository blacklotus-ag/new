document.addEventListener("DOMContentLoaded", () => {
  // Use event delegation on the document body
  document.body.addEventListener("click", (event) => {
    // Check if a search icon or its parent was clicked
    const searchIcon = event.target.closest(".icon .bx-search");
    if (searchIcon) {
      const searchOverlay = document.querySelector(".search-overlay");
      searchOverlay.classList.add("open");
    }
    // Check if the close button was clicked
    const closeSearch = event.target.closest(".search-overlay-close");
    if (closeSearch) {
      const searchOverlay = document.querySelector(".search-overlay");
      searchOverlay.classList.remove("open");
    }
  });
});