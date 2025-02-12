let billAmountTxtObj = document.getElementById("billAmountTxt");
let tipPercentageTxtObj = document.getElementById("tipPercentageTxt");
let tipAmountTxtObj = document.getElementById("tipAmountTxt");
let totalAmountTxtObj = document.getElementById("totalAmountTxt");
let amountTextObj = document.getElementById("amountText");
let percentageTextObj = document.getElementById("percentageText");
let calculateButtonObj = document.getElementById("calculateButton");
let tipAmount;

calculateButtonObj.addEventListener("click", () => {
    calculateTip();
    updateTxt();
})

function calculateTip() {
    tipAmount = Number(amountTextObj.value) * Number(percentageTextObj.value) / 100;
}

function updateTxt() {
    billAmountTxtObj.innerHTML = `$ ${amountTextObj.value}.00`;
    tipAmountTxtObj.innerHTML = `$ ${tipAmount}.00`;
    tipPercentageTxtObj.innerHTML = `% ${percentageTextObj.value}`;
    totalAmountTxtObj.innerHTML = `$ ${Number(amountTextObj.value) + tipAmount}.00`;
}