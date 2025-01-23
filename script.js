const tipBtns = document.querySelectorAll(".tip-btn");
const billInput = document.getElementById("bill-input");
const numberInput = document.getElementById("number-input");
const tipValue = document.getElementById("tip-value");
const totalValue = document.getElementById("total-value");
const tipCustom = document.getElementById("tip-custom");

tipBtns.forEach(element => {
    element.addEventListener("click", handleBtnClick);
});

billInput.addEventListener("input", handleBillInput);
numberInput.addEventListener("input", handleNumberInput);

function handleBtnClick(e) {
    console.log(e.target.textContent);
}

function handleBillInput(e) {
    console.log(e.target.value);
}

function handleNumberInput(e) {
    console.log(e.target.value);
}