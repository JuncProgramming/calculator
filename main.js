const calculator = document.getElementById('calculator')
const display = document.getElementById('display')
const errorMessage = 'Error: division by 0'

let expression = ''

function onInput(event) {
  const target = event.target;
  const value = target.dataset.value;
  if (!value) return;

  if (value === '=') {
    if (expression.trim() === '') return;
    try {
      const newExpression = eval(expression);
      if (Number.isFinite(newExpression)) {
        expression = newExpression
      } else {
        expression = 'Error: division by 0'
      }
    } catch (err) {
        expression = ''
      }
    }
  else if (value === 'clear') {
    expression = '';
  }
  else if (value === 'backspace') {
    expression === errorMessage ? expression = '' : expression = expression.toString().slice(0, -1);
  }
  else {
    expression += value;
  }

  display.textContent = expression;
}

let clickX, clickY;
let previousX, previousY
let isDragging = false

function onMouseDown(event) {
   clickX = event.clientX
   clickY = event.clientY
   previousX = calculator.getBoundingClientRect().left
   previousY = calculator.getBoundingClientRect().top
   isDragging = true
}

function onMouseMove(event) {
   if(isDragging) {
      calculator.style.left = (event.clientX - clickX + previousX) + 'px'
      calculator.style.top = (event.clientY - clickY + previousY) + 'px'
   }
}

function onMouseUp() {
   isDragging = false
}


calculator.addEventListener('click', onInput) 
calculator.addEventListener('mousedown', onMouseDown)
document.addEventListener('mousemove', onMouseMove)
calculator.addEventListener('mouseup', onMouseUp)