document.addEventListener("DOMContentLoaded",() => {
    const menuContainer = document.getElementById("menu-items");
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const orderButton = document.getElementById("order-btn");
    const filterButtons = {
        all: document.getElementById("all-btn"),
        appetizer: document.getElementById("appetizer-btn"),
        main: document.getElementById("main-btn"),
        dessert: document.getElementById("dessert-btn")
    };

    let menuData = [];
    let cart = [];


    // Fetch menu data from json server

    fetch("http://localhost:3000/menu")
        .then(response => response.json())
        .then(data => {
            menuData = data;
            displayMenu(menuData);
        })
        .catch(error => console.error("Error fetching menu data:", error));

    // Function to display menu items

    function displayMenu(items) {
        menuContainer.innerHTML = "";
        items.forEach(item => {
            const menuItem = document.createElement("div")
            menuItem.classList.add("menu-item");
            menuItem.innerHTML = `
            <img scr ="${item.image}" alt = "${item.name}>
            <h3> ${item.name}</h3>
            <p> ${item.description}</p>
            <p class="price">$${item.price.toFixed(2)}</p>
            <button class = "add-to-cart" data-id= "${item.id}">Add to Cart</button`;

            menuContainer.appendChild(menuItem);
        });
    }

    //Function to update cart

    function updateCart () {
        cartContainer.innerHTML ="";
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.name} - ${item.price.toFixed(2)}`;
            cartContainer.appendChild(cartItem);
        })

        totalElement.textContent = total.toFixed(2);
    }

    //Adding items to cart
    menuContainer.addEventListener("click",(event) => {
        if(event.target.classList.contains("add-to-cart")) {
            const itemId = parseInt(event.target.getAttribute("data-id"));
            const selectedItem = menuData.find(item => item.id === itemId);
            if (selectedItem) {
                cart.push(selectedItem);
                updateCart();
            }
        }
    })

    // filtering Event listeners

    Object.keys(filterButtons).forEach(category => {
        filterButtons[category].addEventListener("click", () => {
            if (category === "all") {
                displayMenu(menuData);
            }else{
                const filteredItems = menuData.filter(item => item.category === category);
                displayMenu(filteredItems);
            }
        })
    })

    //place order
})