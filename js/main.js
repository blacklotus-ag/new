document.addEventListener("DOMContentLoaded", () => {
  // Fetch and inject the popups into the body of the page
  fetch("../includes/popups.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => {
      console.error("Error loading popups:", error);
    });
});