// ======================================================
// Q1 - DATA & VARIABLES
// ======================================================

// Product data for the application.
// Each product has a name, category, price and stock status.
const products = [
    {
        name: "Wireless Headphones",
        category: "Electronics",
        price: 45,
        inStock: true
    },
    {
        name: "Laptop",
        category: "Computers",
        price: 850,
        inStock: true
    },
    {
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 75,
        inStock: true
    },
    {
        name: "Wireless Mouse",
        category: "Accessories",
        price: 25,
        inStock: true
    },
    {
        name: "Computer Monitor",
        category: "Computers",
        price: 250,
        inStock: false
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 650,
        inStock: true
    },
    {
        name: "Laptop Backpack",
        category: "Accessories",
        price: 60,
        inStock: true
    },
    {
        name: "Webcam",
        category: "Electronics",
        price: 80,
        inStock: false
    },
    {
        name: "Tablet",
        category: "Electronics",
        price: 300,
        inStock: true
    },
    {
        name: "USB-C Hub",
        category: "Accessories",
        price: 40,
        inStock: true
    }
];


// These variables store the current state of the filters.
// They use let because their values will change.
let currentSearchTerm = "";
let selectedCategory = "all";
let currentSortOrder = "default";

// Used for the advanced debounce feature.
let debounceTimer;

// Used to count how many times filtering has been performed.
let searchCount = 0;


// ======================================================
// GET HTML ELEMENTS
// ======================================================

// Get the search input from the HTML page.
const searchInput = document.getElementById("searchInput");

// Get the category dropdown.
const categoryFilter = document.getElementById("categoryFilter");

// Get the minimum price input.
const minPriceInput = document.getElementById("minPrice");

// Get the maximum price input.
const maxPriceInput = document.getElementById("maxPrice");

// Get the sorting dropdown.
const sortOrder = document.getElementById("sortOrder");

// Get the product grid where cards will be displayed.
const productGrid = document.getElementById("productGrid");

// Get the result count paragraph.
const resultCount = document.getElementById("resultCount");

// Get the no-results message.
const emptyState = document.getElementById("emptyState");


// ======================================================
// Q2 - LOOPS AND PRODUCT RENDERING
// ======================================================

// Displays the products inside the product grid.
function renderProducts(list) {

    // Clear the old cards before displaying the new results.
    productGrid.innerHTML = "";

    // Loop through every product in the supplied list.
    list.forEach(function(product) {

        // Create a new article element for the product card.
        const card = document.createElement("article");

        // Give the article the product-card CSS class.
        card.className = "product-card";

        // Add the product information to the card.
        card.innerHTML = `
            <h3>${product.name}</h3>

            <p class="product-category">
                ${product.category}
            </p>

            <p class="product-price">
                $${product.price.toFixed(2)}
            </p>

            <p class="stock">
                ${product.inStock ? "In stock" : "Out of stock"}
            </p>
        `;

        // Add the completed card to the product grid.
        productGrid.appendChild(card);
    });
}


// ======================================================
// Q3 - SEARCH FILTER
// ======================================================

// Filters products according to the search term.
function filterBySearch(term) {

    return products.filter(function(product) {

        // Convert both values to lowercase so the search
        // is not affected by capital letters.
        return product.name
            .toLowerCase()
            .includes(term.toLowerCase());
    });
}


// ======================================================
// Q3 - CATEGORY FILTER
// ======================================================

// Filters products using the selected category.
function filterByCategory(category) {

    // If "all" is selected, return every product.
    if (category === "all") {
        return products;
    }

    // Otherwise return only products from that category.
    return products.filter(function(product) {
        return product.category === category;
    });
}


// ======================================================
// Q3 - PRICE FILTER
// ======================================================

// Filters products between the minimum and maximum price.
function filterByPrice(min, max) {

    return products.filter(function(product) {

        // If the minimum input is empty, any price is allowed.
        // Otherwise the product must be greater than or equal to it.
        const aboveMinimum =
            min === "" || product.price >= Number(min);

        // If the maximum input is empty, any price is allowed.
        // Otherwise the product must be less than or equal to it.
        const belowMaximum =
            max === "" || product.price <= Number(max);

        // Both conditions must be true.
        return aboveMinimum && belowMaximum;
    });
}


// ======================================================
// Q3 - SORTING
// ======================================================

// Sorts a copy of the list.
// The original products array is not changed.
function sortProducts(list, order) {

    // Create a copy of the array before sorting it.
    const sortedList = [...list];

    // Sort from cheapest to most expensive.
    if (order === "price-low") {

        sortedList.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    // Sort from most expensive to cheapest.
    if (order === "price-high") {

        sortedList.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    // Sort product names alphabetically.
    if (order === "name-az") {

        sortedList.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    // Sort product names in reverse alphabetical order.
    if (order === "name-za") {

        sortedList.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });
    }

    return sortedList;
}


// ======================================================
// Q4a - SCOPE FIX
// ======================================================

// This function updates the global searchCount variable.
// The original broken version used "let searchCount"
// inside the function, which created a new local variable.
// We remove "let" so the existing global variable is updated.
function trackSearchCount() {

    searchCount = searchCount + 1;

    console.log("Searches run:", searchCount);
}


// ======================================================
// Q4b - SYNTAX FIX
// ======================================================

// Creates a readable message based on the number of results.
// The original broken version was missing the closing ")" after count.
function getResultSummary(count) {

    return count +
        " product" +
        (count === 1 ? "" : "s") +
        " found";
}


// ======================================================
// Q3 - MAIN FILTER FUNCTION
// ======================================================

// Applies all of the current filters and sorting options.
function applyFilters() {

    // Read the current search value.
    currentSearchTerm = searchInput.value.trim();

    // Read the selected category.
    selectedCategory = categoryFilter.value;

    // Read the selected sort option.
    currentSortOrder = sortOrder.value;

    // Read the minimum and maximum price values.
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;


    // Q4:
    // Count every time the filtering process runs.
    trackSearchCount();


    // Start with the original product array.
    // Each filter creates a new array rather than changing
    // the original products array.
    let filteredProducts = products

        // First filter: search term.
        .filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(currentSearchTerm.toLowerCase());
        })

        // Second filter: category.
        .filter(function(product) {

            return selectedCategory === "all" ||
                   product.category === selectedCategory;
        })

        // Third filter: price range.
        .filter(function(product) {

            const aboveMinimum =
                minPrice === "" ||
                product.price >= Number(minPrice);

            const belowMaximum =
                maxPrice === "" ||
                product.price <= Number(maxPrice);

            return aboveMinimum && belowMaximum;
        });


    // Sort the filtered results.
    // sortProducts creates a copy so the original data stays safe.
    filteredProducts = sortProducts(
        filteredProducts,
        currentSortOrder
    );


    // Update the number of results shown on the page.
    resultCount.textContent =
        getResultSummary(filteredProducts.length);


    // Display the filtered products.
    renderProducts(filteredProducts);


    // Show the empty state if there are no matching products.
    if (filteredProducts.length === 0) {

        emptyState.classList.remove("hidden");

    } else {

        emptyState.classList.add("hidden");
    }


    // Log the result summary to the browser console.
    console.log(
        getResultSummary(filteredProducts.length)
    );
}


// ======================================================
// Q5 + Q7 - SEARCH EVENT
// ======================================================

// The input event fires whenever the user types.
// A debounce timer waits 300ms after the user stops typing
// before applying the search.
searchInput.addEventListener("input", () => {

    // Cancel the previous timer if the user is still typing.
    clearTimeout(debounceTimer);

    // Start a new timer.
    debounceTimer = setTimeout(() => {

        // Run the filtering after 300 milliseconds.
        applyFilters();

    }, 300);
});


// ======================================================
// Q5 - CATEGORY EVENT
// ======================================================

// Re-filter the products whenever the category changes.
categoryFilter.addEventListener("change", () => {

    applyFilters();
});


// ======================================================
// Q5 - MINIMUM PRICE EVENT
// ======================================================

// Re-filter whenever the minimum price changes.
minPriceInput.addEventListener("input", () => {

    applyFilters();
});


// ======================================================
// Q5 - MAXIMUM PRICE EVENT
// ======================================================

// Re-filter whenever the maximum price changes.
maxPriceInput.addEventListener("input", () => {

    applyFilters();
});


// ======================================================
// Q5 - SORT EVENT
// ======================================================

// Re-sort the products whenever the sort option changes.
sortOrder.addEventListener("change", () => {

    applyFilters();
});


// ======================================================
// INITIAL PAGE LOAD
// ======================================================

// Run the filter function when the page first loads.
// This displays all products immediately.
applyFilters();