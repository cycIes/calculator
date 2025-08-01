let num1 = "";
let num2 = "";
let operator = "";

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
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}

const display = document.querySelector("#display");
let displayInput = "";

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
        const tensMultiplier = Math.pow(10, 8);
        roundedNum = Math.round(num * tensMultiplier) / tensMultiplier;
    }
    return roundedNum;
}

const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", (event) => {
    const target = event.target;
    const className = target.className.replace(" text", "").replace("text", "");

    if ((displayInput === "Undefined" || displayInput === "Infinity" || displayInput === "-Infinity") && className !== "") {
        displayInput = "";
        num1 = "";
        operator = "";
    }

    console.log("Num1: " + num1);
    console.log("Num2: " + num2);
    console.log("Operator: " + operator);

    const num1Exists = num1 !== "";
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";
    
    const text = target.textContent;

    switch(className) {
        case "digit":
            if (target.textContent === "." && (!num1Exists || (operatorExists && !num2Exists))) {
                displayInput += "0";
            }

            if (text === "." && displayInput.includes(".") && (!operatorExists || num2Exists)) {
                break;
            }

            if (!num1Exists && target.textContent !== ".") {
                displayInput = "";
            }

            displayInput += text;
            if (!operatorExists) {
                num1 = parseFloat(displayInput);
                break;
            }
            let operatorSymbol = operator;
            if (operator === "*") {
                operatorSymbol = "x";
            }
            const num2Text = displayInput.substring(displayInput.lastIndexOf(operatorSymbol) + 1);
            num2 = parseFloat(num2Text);
            break;
        case "operator":
            if (operatorExists && num2Exists) {
                const result = operate(num1, num2, operator);
                num1 = parseFloat(result);
                num2 = "";
                if (isNaN(num1) || num1 === Infinity || num1 === -Infinity) {
                    displayInput = "" + result;
                    break;
                }
                if (text === "x") {
                    operator = "*";
                } else {
                operator = text;
                }
                displayInput = num1 + text;
                break;
            }
            if (operatorExists && num1Exists) {
                break;
            }
            if (text === "x") {
                operator = "*";
            } else {
                operator = text;
            }

            if (num1 === "-") {
                operator = "";
                break;
            }
            
            if (!num1Exists) {
                if (displayInput !== "") {
                    num1 = parseFloat(displayInput);
                } else if (text === "-") {
                    operator = "";
                    num1 = "-";
                    // break;
                } else {
                    num1 = 0;
                    displayInput = "0";
                }
            }

            displayInput += text;
            break;
        case "calculate":
            if (!operatorExists) {
                break;
            }
            if (!num2Exists) {
                num2 = 0;
            }
            const result = round(operate(num1, num2, operator));
            num1 = num2 = operator = "";
            displayInput = "" + result;
            break;
        case "clear":
            displayInput = "";
            num1 = num2 = operator = "";
            break;
    }
    if (displayInput.length > 10) {
        display.textContent = displayInput.substring(displayInput.length - 10);
        return;
    }
    display.textContent = displayInput;
})