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

}

const calculator = document.querySelector("#calculator");
calculator.addEventListener("click", (event) => {
    const target = event.target;
    const className = target.className.replace(" text", "").replace("text", "");

    if ((displayInput === "Undefined" || displayInput === Infinity) && className !== "") {
        displayInput = "";
        num1 = "";
    }

    const num1Exists = num1 !== "";
    const num2Exists = num2 !== "";
    const operatorExists = operator !== "";

    switch(className) {
        case "digit":
            displayInput += target.textContent;
            if (!operatorExists) {
                num1 = parseFloat(displayInput);
                break;
            }
            const num2Text = displayInput.substring(displayInput.indexOf(operator) + 1);
            num2 = parseFloat(num2Text);
            break;
        case "operator":
            if (operatorExists && !num1Exists) {
                break;
            }
            if (!operatorExists) {
                if (!num1Exists) {
                    num1 == 0;
                    displayInput = "0";

                }
                const text = target.textContent;
                if (text === "x") {
                    operator = "*";
                } else {
                    operator = text;
                }
                displayInput += text;
                break;
            }
            break;
        case "calculate":
            if (!num2Exists) {
                num2 == 0;
            }
            const result = operate(num1, num2, operator);
            num2 = operator = "";
            num1 = displayInput = result;
            break;
        case "clear":
            displayInput = "";
            break;
    }
    if (displayInput.length > 10) {
        display.textContent = displayInput.substring(displayInput.length - 10);
        return;
    }
    display.textContent = displayInput;
})