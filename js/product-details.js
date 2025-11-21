document.addEventListener("DOMContentLoaded", () => {
    const addCartButton = document.querySelector(".addCart");
    if (!addCartButton) return;

    addCartButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent link from navigating

        const detailsContainer = document.querySelector(".details.container");
        const productName = detailsContainer.querySelector(".right h1").textContent;
        const productPrice = parseFloat(detailsContainer.querySelector(".right .price").textContent.replace('$', ''));
        const productImage = detailsContainer.querySelector(".left .main img").src;
        const quantity = parseInt(detailsContainer.querySelector(".form input").value) || 1;

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const productId = productName.replace(/\s+/g, '-').toLowerCase(); // Simple ID generation

        const existingItemIndex = cartItems.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity,
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Update main cart counter
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll(".navigation .icon .bx-cart + span").forEach(counter => counter.textContent = totalQuantity);
        localStorage.setItem("cartCount", totalQuantity);
    });
});