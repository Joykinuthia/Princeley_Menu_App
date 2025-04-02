document.addEventListener("DOMContentLoaded",() => {
    const menuContainer = document.getElementById("menu-items");
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const orderButton = document.getElementById("order-btn");
    const filterButton = {
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
        
    }

})