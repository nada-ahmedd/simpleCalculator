const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let displayValue = '0';
let expression = ''; 
const updateDisplay = () => display.textContent = displayValue;
const clearDisplay = () => {
    displayValue = '0';
    expression = '';
    updateDisplay();
};
const deleteLastChar = () => {
    expression = expression.slice(0, -1);
    displayValue = expression || '0';
    updateDisplay();
};
const calculateResult = () => {
    if (isValidExpression(expression) && !isLastCharacterOperator(expression)) {
        displayValue = eval(expression).toString();
        expression = displayValue;
    } else {
        displayValue = 'Error';
        expression = '';
    }
    updateDisplay();
};
const appendToExpression = (value) => {
    if (isNaN(value) && isLastCharacterOperator(expression)) {
        expression = expression.slice(0, -1) + value;
    } else if (!isNaN(value) || expression !== '') {
        expression += value;
    }
    displayValue = expression;
    updateDisplay();
};
const isValidExpression = (expr) => /^[\d+\-*/.()]+$/.test(expr);
const isLastCharacterOperator = (expr) => /[+\-*/.]$/.test(expr);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value === 'clear') clearDisplay();
        else if (value === 'delete') deleteLastChar();
        else if (value === 'equals') calculateResult();
        else appendToExpression(value);
    });
});
