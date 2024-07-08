let numpad = document.querySelector(".numpad");
numpad.addEventListener('click', (numberClick) => {
    if (numberClick.target.classList.contains('numButton')) {
        const toUpdate = numberClick.target.textContent;
        updateScreen(toUpdate);
    }
});

let operators = document.querySelector(".operators");
operators.addEventListener('click', (operatorClick) => {
    if (operatorClick.target.classList.contains('opButton')) {
        let toUpdate = operatorClick.target.textContent;
        toUpdate = ' ' + toUpdate + ' ';
        operatorPressed = toUpdate;
        updateScreen(toUpdate);
    }
});

function updateScreen(text) {
    let screen = document.querySelector(".screen");
    const currentText = screen.textContent;
    const newText = currentText + text;
    screen.textContent = newText;
}

function backSpace() {
    let screen = document.querySelector(".screen");
    const currentText = screen.textContent;
    const newText = currentText.substring(0, currentText.length - 1);
    screen.textContent = newText;
}

let topRowButton = document.querySelector(".top-row");
topRowButton.addEventListener('click', (buttonPressed) => {
    switch (buttonPressed.target.id) {
        case 'backspace':
            backSpace();
            break;

        case 'clear':
            clearScreen();
            break;

        case 'equals':
            evaluate();
            break;
    }
});

function clearScreen() {

    document.querySelector(".screen").textContent = ' ';
}

function evaluate() {
    let screen = document.querySelector(".screen");
    let expression = screen.textContent;
    expression = expression.trim();

    let [num1, num2] = expression.split(operatorPressed);

    num1 = num1.trim();
    num1 = parseInt(num1);
    num2 = num2.trim();
    num2 = parseInt(num2);

    const operator = operatorPressed.trim();
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;

        case '-':
            result = num1 - num2;
            break;

        case 'x':
            result = num1 * num2;
            break;

        case '/':
            result = num1 / num2;
            break;
    }
    screen.textContent = result;
}

let operatorPressed = null;
clearScreen();
