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
        const toUpdate = operatorClick.target.textContent;
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
            console.log("backspace pressed");
            break;
    }
});


document.querySelector(".screen").textContent = ' ';
