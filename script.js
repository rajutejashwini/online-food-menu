// Get existing cart from browser
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add food to cart
function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } 
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");

    window.location.href = "cart.html";
}


// Display cart
function displayCart() {

    let cartItems = document.getElementById("cartItems");
    let totalElement = document.getElementById("total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerHTML = "Total: ₹0";

        return;
    }


    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Subtotal: ₹${itemTotal}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });


    totalElement.innerHTML = "Total: ₹" + total;
}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// Place order
function placeOrder(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;

    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Thank you, " + name + "!"
    );

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}


// Display cart when cart page opens
displayCart();