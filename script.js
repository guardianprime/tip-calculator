const tipBtns = document.querySelectorAll(".tip-btn");
const billInput = document.getElementById("bill-input");
const numberInput = document.getElementById("number-input");
const tipValue = document.getElementById("tip-value");
const totalValue = document.getElementById("total-value");
const tipCustomInput = document.getElementById("tip-custom");
const resetBtn = document.getElementById("reset-btn");
const errorMessage = document.getElementById("error-message");

tipBtns.forEach(element => {
    element.addEventListener("click", handleBtnClick);
});

// Debounce function to limit the rate of function execution
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Add event listeners with debounced handlers
billInput.addEventListener("input", debounce(handleBillInput, 300));
numberInput.addEventListener("input", debounce(handleNumberInput, 300));
tipCustomInput.addEventListener("input", debounce(handleTipCustom, 300));
resetBtn.addEventListener("click", reset);

let numberOfPersons = 0;
let bill = 0;
let tipPercentage = 0;
let tipCustom = 0;

function handleBtnClick(e) {
    tipBtns.forEach(element => {
        element.classList.remove("active");
    });
    e.target.classList.add("active");
    tipPercentage = parseFloat(e.target.textContent) / 100;
    tipCustom = 0; // Reset custom tip
    calculateAndDisplayResults();
}

function handleBillInput(e) {
    bill = parseFloat(e.target.value);
    calculateAndDisplayResults();
}

function handleNumberInput(e) {
    numberOfPersons = parseInt(e.target.value);
    if (numberOfPersons === 0 && billInput.value !== "") {
        errorMessage.classList.remove("hide");
        numberInput.style.outline = "3px solid red";
    } else {
        errorMessage.classList.add("hide");
        numberInput.style.outline = "none";
    }
    calculateAndDisplayResults();
}

function handleTipCustom(e) {
    tipCustom = parseFloat(e.target.value) / 100;
    tipBtns.forEach(element => element.classList.remove("active"))
    tipPercentage = 0; // Reset selected tip percentage
    calculateAndDisplayResults();
}

function calculateAndDisplayResults() {
    if (numberOfPersons > 0 && bill > 0) {
        const tip = bill * (tipCustom || tipPercentage);
        const tipPerPerson = tip / numberOfPersons;
        const totalPerPerson = (bill + tip) / numberOfPersons;
        tipValue.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalValue.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
        tipValue.textContent = "$0.00";
        totalValue.textContent = "$0.00";
    }
}


function reset() {
    if (!billInput.value || !numberInput.value) return;
    billInput.value = "";
    numberInput.value = "";
    tipCustomInput.value = "";
    tipBtns.forEach(element => element.classList.remove("active"));
    tipValue.textContent = "$0.00";
    totalValue.textContent = "$0.00";
    errorMessage.classList.add("hide");
    numberInput.style.outline = "none";
    bill = 0;
    numberOfPersons = 0;
    tipPercentage = 0;
    tipCustom = 0;
}