// Selecting elements
const expenseNameInput = document.getElementById("expenseName");
const expenseCostInput = document.getElementById("expenseCost");
const addButton = document.getElementById("add-btn");
const expenseList = document.querySelector("ul");
const toggleButton = document.getElementById("toggle-dark");

// Initialize expenses array
let expenses = [];

// Load saved expenses on page load
window.addEventListener("load", function () {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = savedExpenses;
    expenses.forEach(exp => {
        addExpenseToList(exp.name, exp.cost);
    });
    updateTotal();
});

// Add expense on button click
addButton.addEventListener("click", function () {
    const name = expenseNameInput.value;
    const cost = Number(expenseCostInput.value);

    if (name !== "" && cost > 0) {
        const expense = { name, cost };
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        addExpenseToList(name, cost);
        updateTotal();

        expenseNameInput.value = "";
        expenseCostInput.value = "";
    }
});

// Function to add expense to the list
function addExpenseToList(name, cost) {
    const li = document.createElement("li");
    li.textContent = `${name} - ₹${cost} `;

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "delete.png"; // your trash icon file name
    deleteBtn.alt = "Delete";
    deleteBtn.style.width = "24px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";

    // Delete expense on icon click
    deleteBtn.addEventListener("click", function () {
        li.remove();
        expenses = expenses.filter(exp => !(exp.name === name && exp.cost === cost));
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateTotal();
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
}

// Update total expenses
function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.cost, 0);
    document.getElementById("total").textContent = total;
}

// Toggle dark mode
toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});