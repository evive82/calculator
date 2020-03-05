const inputDisp = document.getElementById(`main-display`);
const opDisplay = document.getElementById(`top-display`);
const buttons = document.querySelectorAll(`button`);
let operation = '';
let prevNum = '';

function input(key) {
  if (inputDisp.classList.contains('operated')) {
    inputDisp.classList.remove('operated');
    inputDisp.innerHTML = 0;
  }
  let inputText = inputDisp.textContent;
  if (inputText.length < 10) {
    if (inputDisp.innerHTML == 0) inputDisp.innerHTML = '';
    inputDisp.innerHTML += Number(key);
  }
}

function clear() {
  inputDisp.classList.add('operated');
  inputDisp.innerHTML = 0;
  opDisplay.innerHTML = '';
  operation = '';
  prevNum = '';
}

function backspace() {
  let oldInput = inputDisp.innerHTML;
  let newInput = oldInput.slice(0, -1);
  if (newInput === '') newInput = 0;
  inputDisp.innerHTML = newInput; 
}

function pressOp(opKey, num) {
  /*
  if (isNaN(operation.slice(-1))) {
    operation = operation.replace(/.$/, oper);
    opDisplay.innerHTML = operation;
  } else {
  }
  */
  const oper = opKey.replace('/', '÷').replace('s', '√');
  console.log(`about to operate: ${prevNum} ${oper} ${num}`)
  const newNum = (prevNum === '') ? num : operate(oper, prevNum, num);
  operation += ` ${num} ${oper}`;
  opDisplay.innerHTML = operation;
  inputDisp.classList.add('operated');
  inputDisp.innerHTML = newNum;
  prevNum = newNum;
}

function pressEqual(num) {
  let finalNum;
  if (!inputDisp.classList.contains('operated')) {
    let oper = operation.slice(-1);
    finalNum = operate(oper, prevNum, num)
    clear();
  } else {
    finalNum = inputDisp.innerHTML;
    clear();
  }
  prevNum = '';
  inputDisp.innerHTML = finalNum;
}

function operate(oper, num1, num2) {
  switch(oper) {
    case '+':
      return num1 + num2;
    case '-':
      console.log('returning' + (num1 - num2))
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '÷':
      return num1 / num2;
    case '%':
      return num1 * (num2 / 100);
    case '^':
      return num1 ** num2;
    case '√':
      return Math.sqrt(num1);
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const button = document.querySelector(`button[data-key="${key}"]`);
  button.click();
})

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clicked = e.target;
    const key = clicked.getAttribute('data-key');
    if (!isNaN(key)) {
      input(key);
    }
    else if (key === 'Backspace') {
      backspace();
    }
    else if (key === 'Escape') {
      clear();
    }
    else if (key === 'Enter') {
      if (
        operation.length > 0 &&
        isNaN(operation.slice(-1)) &&
        inputDisp.innerText.length > 0
      ) {
        pressEqual(Number(inputDisp.innerText));
      }
    } else {
      if (inputDisp.innerText.length > 0) {
        console.log(`pressing opkey, key: ${key}, number: ${Number(inputDisp.innerText)}`)
        pressOp(key, Number(inputDisp.innerText));
      }
    }
  });
});