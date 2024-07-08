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


document.querySelector(".screen").textContent = ' ';