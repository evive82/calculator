const inputDisp = document.getElementById(`main-display`);
const buttons = document.querySelectorAll(`button`);
let operation = '';
let prevNum = '';

function input(key) {
  if (inputDisp.classList.contains('operated')) {
    inputDisp.classList.remove('operated');
    inputDisp.innerHTML = 0;
  }
  let inputText = inputDisp.textContent;

  if (inputText.length < 10 && !isNaN(key)) {
    if (inputDisp.innerHTML == 0 && !inputText.includes('.')) {
      inputDisp.innerHTML = '';
    }
    inputDisp.innerHTML += Number(key);
  }
  else if (inputText.length < 10 && key == '.' && !inputText.includes('.')) {
    inputDisp.innerHTML += key;
  }
}

function clear() {
  inputDisp.classList.add('operated');
  inputDisp.innerHTML = 0;
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
  const oldOp = operation[operation.length - 1];
  let newNum = (prevNum === '') ? num : operate(oldOp, prevNum, num);
  operation = `${newNum} ${opKey}`;
  inputDisp.classList.add('operated');
  if (newNum == Infinity) {
    newNum = 'Um... no';
    clear();
  }
  if (newNum.toString().length > 10) {
    newNum = fixNumLength(newNum)
  }
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
  if (finalNum == Infinity) {
    finalNum = 'Um... no';
    clear();
  }
  if (finalNum.toString().length > 10) {
    finalNum = fixNumLength(finalNum)
  }
  inputDisp.innerHTML = finalNum;
}

function operate(oper, num1, num2) {
  switch(oper) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
}

function fixNumLength(num) {
  let fixed = Number(num).toPrecision(10);
  return fixed;
}

document.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    e.preventDefault();
  }
  const key = e.key;
  const button = document.querySelector(`button[data-key="${key}"]`);
  button.click();
})

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clicked = e.target;
    const key = clicked.getAttribute('data-key');
    if (inputDisp.innerText === 'Um... no') {
      clear();
    }
    if (!isNaN(key) || key === '.') {
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
    }
    else if (key === '\\') {
      if (inputDisp.innerText > 0) {
        let num = inputDisp.innerText;
        inputDisp.innerHTML = `-${num}`;
      }
      else if (inputDisp.innerText < 0) {
        let num = inputDisp.innerText.replace('-', '');
        inputDisp.innerHTML = num;
      }
    } else {
      if (inputDisp.innerText.length > 0) {
        pressOp(key, Number(inputDisp.innerText));
      }
    }
  });
});