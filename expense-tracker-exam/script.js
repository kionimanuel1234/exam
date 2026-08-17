//QN1.
// Store all expenses in an array
const expenses = [
    {
        description: "Lunch",
        category: "Food",
        amount: 500,
        date: "2026-08-10"
    },
    {
        description: "Bus fare",
        category: "Transport",
        amount: 200,
        date: "2026-08-11"
    },
    {
        description: "Internet",
        category: "Bills",
        amount: 1500,
        date: "2026-08-12"
    },
    {
        description: "Groceries",
        category: "Food",
        amount: 2500,
        date: "2026-08-13"
    },
    {
        description: "Movie",
        category: "Entertainment",
        amount: 800,
        date: "2026-08-14"
    }
];

// Monthly budget does not change
const monthlyBudget = 10000;

// These values will change as expenses are added or deleted
let runningTotal = 0;
let remainingBalance = monthlyBudget;

//QN2
// Display all expenses on the page
function renderExpenses() {

    const expenseList = document.getElementById("expenseList");

    // Clear the old list before creating it again
    expenseList.innerHTML = "";

    // Loop through every expense in the array
    expenses.forEach(function(expense, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${expense.description}</strong>
                <br>
                ${expense.category} - ${expense.date}
                <br>
                ${formatCurrency(expense.amount)}
            </div>

            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });
}

//QN3
// Add a new expense to the array
function addExpense() {

    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    const newExpense = {
        description: description,
        category: category,
        amount: amount,
        date: date
    };

    expenses.push(newExpense);

    // Show a summary of the new expense
    console.log(getExpenseSummary(expenses.length - 1));

    renderExpenses(// Display expenses and filter them by category
function renderExpenses() {

    const expenseList = document.getElementById("expenseList");
    const filter = document.getElementById("categoryFilter").value;

    expenseList.innerHTML = "";

    expenses.forEach(function(expense, index) {

        // Skip expenses that do not match the selected category
        if (filter !== "All" && expense.category !== filter) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${expense.description}</strong>
                <br>
                ${expense.category} - ${expense.date}
                <br>
                ${formatCurrency(expense.amount)}
            </div>

            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });
});
// Change the displayed expenses when the category changes
document.getElementById("categoryFilter").addEventListener("change", function() {

    renderExpenses();

});
    calculateRemaining();

    document.getElementById("expenseForm").reset();
}


// Delete an expense using its position in the array
function deleteExpense(index) {

    expenses.splice(index, 1);

    trackDeleteCount();

    renderExpenses();
    calculateRemaining();
}


// Calculate the total amount spent
function calculateTotal() {

    // Reduce adds all the expense amounts together
    runningTotal = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    document.getElementById("total").textContent =
        formatCurrency(runningTotal);

    return runningTotal;
}


// Calculate the money left from the budget
function calculateRemaining() {

    const total = calculateTotal();

    remainingBalance = monthlyBudget - total;

    const balance = document.getElementById("balance");

    balance.textContent = formatCurrency(remainingBalance);

    return remainingBalance;
    // Calculate the money left from the budget
function calculateRemaining() {

    const total = calculateTotal();

    remainingBalance = monthlyBudget - total;

    const balance = document.getElementById("balance");

    balance.textContent = formatCurrency(remainingBalance);

    // QN6. Add or remove the warning class depending on the budget
    if (remainingBalance < 0) {
        balance.classList.add("over-budget");
    } else {
        balance.classList.remove("over-budget");
    }

    return remainingBalance;
}
}


// Format numbers as Kenyan currency
function formatCurrency(amount) {

    return "KSh " + amount.toFixed(2);
}

// Listen for the form being submitted
document.getElementById("expenseForm").addEventListener("submit", function(event) {

    event.preventDefault();

    addExpense();
});
// Store all expenses in an array
const expenses = [
    {
        description: "Lunch",
        category: "Food",
        amount: 500,
        date: "2026-08-10"
    },
    {
        description: "Bus fare",
        category: "Transport",
        amount: 200,
        date: "2026-08-11"
    },
    {
        description: "Internet",
        category: "Bills",
        amount: 1500,
        date: "2026-08-12"
    },
    {
        description: "Groceries",
        category: "Food",
        amount: 2500,
        date: "2026-08-13"
    },
    {
        description: "Movie",
        category: "Entertainment",
        amount: 800,
        date: "2026-08-14"
    }
];

// Monthly budget
const monthlyBudget = 10000;

// Values that will change
let runningTotal = 0;
let remainingBalance = monthlyBudget;

// Used to count deleted expenses
let deleteCount = 0;


// Display all expenses
function renderExpenses() {

    const expenseList = document.getElementById("expenseList");
    const filter = document.getElementById("categoryFilter").value;

    expenseList.innerHTML = "";

    // Loop through the expenses
    expenses.forEach(function(expense, index) {

        // Filter expenses by category
        if (filter !== "All" && expense.category !== filter) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${expense.description}</strong>
                <br>
                ${expense.category} - ${expense.date}
                <br>
                ${formatCurrency(expense.amount)}
            </div>

            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });
}


// Add a new expense
function addExpense() {

    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = Number(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    const newExpense = {
        description: description,
        category: category,
        amount: amount,
        date: date
    };

    expenses.push(newExpense);

    // Show the new expense summary in the console
    console.log(getExpenseSummary(expenses.length - 1));

    renderExpenses();
    calculateRemaining();

    document.getElementById("expenseForm").reset();
}


// Delete an expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    trackDeleteCount();

    renderExpenses();
    calculateRemaining();
}


// Calculate total spending
function calculateTotal() {

    // Reduce adds all expense amounts together
    runningTotal = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    document.getElementById("total").textContent =
        formatCurrency(runningTotal);

    return runningTotal;
}


// Calculate remaining budget
function calculateRemaining() {

    const total = calculateTotal();

    remainingBalance = monthlyBudget - total;

    const balance = document.getElementById("balance");

    balance.textContent = formatCurrency(remainingBalance);

    // Show warning when the budget is exceeded
    if (remainingBalance < 0) {
        balance.classList.add("over-budget");
    } else {
        balance.classList.remove("over-budget");
    }

    return remainingBalance;
}


// Format money as currency
function formatCurrency(amount) {

    return "KSh " + amount.toFixed(2);
}


// Fix for the scope problem
function trackDeleteCount() {

    deleteCount = deleteCount + 1;

    console.log("Expenses deleted:", deleteCount);
}


// Fix for the missing parenthesis
function getExpenseSummary(index) {

    return expenses[index].description +
        " - " +
        formatCurrency(expenses[index].amount);
}


// Form event listener
document.getElementById("expenseForm").addEventListener("submit", function(event) {

    event.preventDefault();

    addExpense();
});
// Change the displayed expenses when the category changes
document.getElementById("categoryFilter").addEventListener("change", function() {

    renderExpenses();

});

// Category filter event listener
document.getElementById("categoryFilter").addEventListener("change", function() {

    renderExpenses();

});

//QN4a

// Fix: deleteCount must be outside the function so the value can be changed each time
let deleteCount = 0;


// Count how many expenses have been deleted
function trackDeleteCount() {

    deleteCount = deleteCount + 1;

    console.log("Expenses deleted:", deleteCount);
}

//qn4b

// Fix: the closing parenthesis was missing from the function parameter
function getExpenseSummary(index) {

    return expenses[index].description +
        " - " +
        formatCurrency(expenses[index].amount);
}

