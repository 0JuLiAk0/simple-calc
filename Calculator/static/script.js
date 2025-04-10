//script.js

document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const clear = document.querySelector('.clear');
    const remove = document.querySelector('.remove');
    const equals = document.querySelector('.equals');
    const previousDisplay = document.querySelector('.previousOperation');
    const currentDisplay = document.querySelector('.currentOperation');

    let currentOperation = '';
    let previousOperation = '';
    let operation = undefined;

    const calculate = () => {
        let result;
        if (!previousOperation || !currentOperation) return;

        const prev = parseFloat(previousOperation);
        const curr = parseFloat(currentOperation);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '√':
                result = Math.pow(curr, (1 / prev));
                break;
            case '%':
                result = prev / 100 * curr;
                break;
            case '^':
                result = Math.pow(prev, curr);
                break;
            case 'log':
                result = Math.log(prev) / Math.log(curr);
                break;
            default:
                return;
        }

        currentOperation = result;
        operation = undefined;
        previousOperation = '';
    };

    const updateDisplay = () => {
        currentDisplay.innerText = currentOperation;
        if (operation != null) {
            previousDisplay.innerText = previousOperation + operation;
        } else {
            previousDisplay.innerText = '';
        }
    };

    const chooseOperation = (op) => {
        if (currentOperation === '') return;

        if (previousOperation !== '') {
            calculate();
        }

        operation = op;
        previousOperation = currentOperation;
        currentOperation = '';
    };

    const appendNumber = (number) => {
        if (number === '•') {
            if (currentOperation.includes('.')) return;
            number = '.';
        }
        currentOperation = currentOperation.toString() + number.toString();
    };

    const deleteLast = () => {
        currentOperation = currentOperation.slice(0, -1);
    };

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            appendNumber(number.innerText);
            updateDisplay();
        });
    });

    remove.addEventListener('click', () => {
        deleteLast();
        updateDisplay();
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            chooseOperation(operator.innerText);
            updateDisplay();
        });
    });

    equals.addEventListener('click', () => {
        calculate();
        updateDisplay();
    });

    clear.addEventListener('click', () => {
        previousOperation = '';
        currentOperation = '';
        updateDisplay();
    });
});
