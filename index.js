let num1 = "";
let num2 = "";
let operator = "";

const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
let displayInput = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a === 0 && b === 0) {
        return "Undefined";
    }
    return a / b;
}

function operate(num1, num2, operator) {
    const a = Number(num1);
    const b = Number(num2);

    switch(operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
    }
}

function round(num) {
    if (num === "Undefined") {
        return num;
    }
    const text = "" + num;
    const roundedText = "" + Math.round(num);

    let roundedNum = num;

    if (roundedText.length > 10) {
        roundedNum = (num.toPrecision(4));
        return roundedNum;
    }

    if (text.length > 10) {
        const tensMultiplier = Math.pow(10, 8 - roundedText.length);
        roundedNum = Math.round(num * tensMultiplier) / tensMultiplier;
    }
    return roundedNum;
}

function appendDigit(digit) {
    const num1Exists = num1 !== "";
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";

    if (digit === "." && (!num1Exists || (operatorExists && !num2Exists))) {
        displayInput += "0";
    }

    if (digit === "." && num1.includes(".") && (!operatorExists)) {
        return;
    }

    if (digit === "." && num2.includes(".")) {
        return;
    }

    if (!num1Exists && digit !== ".") {
        displayInput = "";
    }

    displayInput += digit;
    if (!operatorExists) {
        num1 = displayInput;
        return;
    }
    let operatorSymbol = operator;
    if (operator === "*") {
        operatorSymbol = "x";
    }
    
    const num2Text = displayInput.substring(displayInput.lastIndexOf(operatorSymbol) + 1);
    num2 = num2Text;
}

function appendOperator(op) {
    const num1Exists = num1 !== "";
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";

    if (op === "*") {
        op = "x";
    }

    if (operatorExists && num2Exists) {
        const result = round(operate(num1, num2, operator));
        num1 = result;
        num2 = "";

        if (isNaN(num1) || num1 === Infinity || num1 === -Infinity) {
            displayInput = "" + result;
            return;
        }

        if (op === "x") {
            operator = "*";
        } else {
            operator = op;
        }

        return;
    }
    if (operatorExists && num1Exists) {
        return;
    }

    if (op === "x") {
        operator = "*";
    } else {
        operator = op;
    }

    if (num1 === "-") {
        operator = "";
        return;
    }
            
    if (!num1Exists) {
        if (displayInput !== "") {
            num1 = displayInput;
        } else if (op === "-") {
            operator = "";
            num1 = "-";
        } else {
            num1 = 0;
            displayInput = "0";
        }
    }

    displayInput += op;
}

function calculateAction() {
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";

    if (!operatorExists) {
        return;
            }
    if (!num2Exists) {
        num2 = 0;
    }
    const result = round(operate(num1, num2, operator));
    num1 = num2 = operator = "";
    displayInput = "" + result;
}

function clear() {
    displayInput = "";
    num1 = num2 = operator = "";
}

function deleteChar() {
    const num1Exists = num1 !== "";
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";

    if (displayInput === "") {
        return;
    }

    if (!num1Exists) {
        displayInput = "";
        return;
    }

    displayInput = displayInput.slice(0, -1);

    if (operatorExists && !num2Exists) {
        operator = "";
        return;
    }

    if (num2Exists) {
        if (("" + num2).length === 1) {
            num2 = "";
        } else {
            num2 = ("" + num2).slice(0, -1);
        }
        return;
    }
            
    if (("" + num1).length === 1) {
        num1 = "";
    }

    num1 = ("" + num1).slice(0, -1);
}

function updateDisplay() {
    if (displayInput.length > 10) {
        display.textContent = displayInput.substring(displayInput.length - 10);
        return;
    }
    display.textContent = displayInput;
}

calculator.addEventListener("click", (event) => {
    const target = event.target;
    const className = target.className.replace(" text", "").replace("text", "");

    if ((displayInput === "Undefined" || displayInput === "Infinity" || displayInput === "-Infinity") && className !== "") {
        clear();
    }

    // console.log("Num1: " + num1);
    // console.log("Num2: " + num2);
    // console.log("Operator: " + operator);
    
    const text = target.textContent;

    switch(className) {
        case "digit":
            appendDigit(text);
            break;
        case "operator":
            appendOperator(text);
            break;
        case "calculate":
            calculateAction();
            break;
        case "clear":
            clear();
            break;
        case "delete":
            deleteChar();
            break;
    }
    
    updateDisplay();
})

document.addEventListener("keydown", (event) => {
    if (displayInput === "Undefined" || displayInput === "Infinity" || displayInput === "-Infinity") {
        clear();
    }

    // console.log("Num1: " + num1);
    // console.log("Num2: " + num2);
    // console.log("Operator: " + operator);

    const key = event.key;

    if ("1234567890.".includes(key)) {
        appendDigit(key);
    }

    if ("+-*/x".includes(key)) {
        appendOperator(key);
    }

    if (key === "Backspace") {
        deleteChar();
    }

    if (key === "Enter") {
        calculateAction();
    }

    updateDisplay();
})