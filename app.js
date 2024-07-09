let numpad = document.querySelector(".numpad");
numpad.addEventListener('click', (numberClick) => {
    if (numberClick.target.classList.contains('realButton')) {
        const toUpdate = numberClick.target.textContent;

        if (num1Entered == false)
            num1Entered = true;
        else if (num1Entered == true && operatorPressed != null && num2Entered == false)
         {   
            updateScreen(" ");
            num2Entered = true;
         }
        updateScreen(toUpdate);
    }
});

let operators = document.querySelector(".operators");
operators.addEventListener('click', (operatorClick) => {
    if (operatorClick.target.classList.contains('opButton')) {
        if (num1Entered == false) {
            dialog("First Enter a Number");
            return null;
        }
        //if the user is entering two operators consecutively, the second one will overwrite the first operator
        if (num1Entered == true && operatorPressed != null && num2Entered == false) {
            backSpace();
        }
        //if user has entered a second operator after a valid expression, then the expression is evaluated first
        if (num1Entered == true && operatorPressed != null && num2Entered == true) {
            evaluate();
        }
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

//this function removes the last character from the screen, and has some checks to reset the flags of characters being removed
function backSpace() {
    let screen = document.querySelector(".screen");
    let currentText = screen.textContent;
    currentText = currentText.trim();

    const removedChar = currentText.charAt(currentText.length - 1);
    //if the removed character is a special character, i.e. an operator, then operatorPressed must be reset to null
    if (removedChar < '0' || removedChar > '9')
        operatorPressed = null;

    let newText = currentText.substring(0, currentText.length - 1);
    newText = newText.trim();

    // if newText is empty that means first number has been completely erased
    if (newText == '')
        num1Entered = false;

    //if the last character after the backspace operation is a special character, then the second number was erased
    const lastChar = newText.charAt(newText.length - 1);
    if (lastChar < '0' || lastChar > '9')
        num2Entered = false;


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
    document.querySelector(".old-expression").textContent = ' ';
    document.querySelector(".screen").textContent = ' ';
    document.querySelector(".dialog-box").textContent = ' ';
    num1Entered = false;
    num2Entered = false;
    operatorPressed = null;
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

        case '×':
            result = num1 * num2;
            break;

        case '÷':
            if (num2 == 0) {
                dialog("Divion by Zero is Not Allowed");
                return null;
            }
            result = num1 / num2;
            break;
    }
    const oldExpression = num1 + operatorPressed + num2 + " =";
    const oldExpBox = document.querySelector(".old-expression");

    //checking if the result has exponent terms (we cant deal with that)
    if (result.toString().indexOf('e') > -1) {
        oldExpBox.textContent = oldExpression + " " + result;
        dialog("Result is too big/small for more use");

        document.querySelector(".screen").textContent = ' ';
        num1Entered = false;
        num2Entered = false;
        operatorPressed = null;
    }
    else {
        oldExpBox.textContent = oldExpression;
        screen.textContent = result;
        operatorPressed = null;
        num2Entered = false;
        dialog('');
    }
}

function dialog(message) {
    let dialogBox = document.querySelector(".dialog-box");
    dialogBox.textContent = message;
}

let operatorPressed = null;
let num1Entered = false;
let num2Entered = false;
clearScreen();

document.querySelector("#backspace").textContent = "<";
document.querySelector(".old-expression").textContent = "Calculator";