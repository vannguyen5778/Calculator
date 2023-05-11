const currentDisplayNumber = document.getElementById('currentDisplayValue');
const previousDisplayNumber = document.getElementById('previousDisplayValue');
const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const btns = document.querySelectorAll('button');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.allclear');
const deleteOne = document.getElementById('clear');
const remainder = document.querySelector('.remainder');
const audio = new Audio("click.mp3");
let operator = '';
let currentNum = '';
let previousNum = '';


clear.addEventListener("click", clearAll);

btns.forEach((btn) => {
    btn.onclick = () => audio.play();
})
   
deleteOne.addEventListener("click", handleDelete);

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  })
})

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.value);
  })
})
decimal.addEventListener("click", addDecimal);

equals.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    operate();
  }
}) 


function handleNumber(number) {
  // if (previousNum !== "" && currentNum !== "" && operator !== "") {
  //   previousNum = "";
  //   currentDisplayNumber.textContent = currentNum;
  // }
  if (currentNum.length <= 14) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    checkOperator(op);
  } else if (currentNum === "") {
    checkOperator(op);
  } else {
    operate();
    operator = op;
    previousDisplayNumber.textContent = `${previousNum} ${operator}`;
    currentDisplayNumber.textContent = '';
  }
}

function checkOperator(text) {
  operator = text;
  previousDisplayNumber.textContent = `${previousNum} ${operator}`;
  currentNum = '';
  currentDisplayNumber.textContent = '';
}
 
function operate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    switch (operator) {
      case '+':
        previousNum += currentNum;
        break;
      case '-':
        previousNum -= currentNum;
        break;
      case 'x':
        previousNum *= currentNum;
        break;
      case '%':
        previousNum %= currentNum;
        break;
      case '/':
        if (currentNum <= 0) {
          previousNum = 'Error';
          displayResults();
          return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundResult(previousNum);
    previousNum = previousNum.toString();
    displayResults();
  }

function displayResults() {
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function roundResult(number) {
  return Math.round(number * 10000000) / 10000000
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}

function clearAll() {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplayNumber.textContent = '0';
  previousDisplayNumber.textContent = '';
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) currentDisplayNumber += e.key;
  if (e.key === '.') addDecimal();
  if (e.key === '=' || e.key === 'Enter') operate();
  if (e.key === 'Backspace') handleDelete();
  if (e.key === 'Escape') clearAll();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    handleOperator(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function switchColor(){
  let element = document.body;
  element.classList.toggle("dark");
}