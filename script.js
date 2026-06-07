const btns = document.querySelectorAll(".button");
const displays = document.getElementById("display");
const operator = document.querySelectorAll('#add, #subtract, #multiply, #divide');
const num = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
const AC = document.querySelector('#AC');
const del = document.querySelector('#del');
const percent = document.querySelector('#percent');
const decimal = document.querySelector('#decimal-point');
const sd = document.querySelector('#S-D');
const signChange = document.querySelector('#sign-change');
const equal = document.querySelector('#equal')

let num1, num2;
let currentValue = "";
let previousValue = "";
let currentOperator = "";
let displaySymbol = "";
let calcOperator = "";
3
let compute = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if(operator == "add"){
        return  num1 + num2;
    }
    else if(operator == "subtract"){
        return  num1 - num2;
    }
    else if(operator == "multiply"){
        return  num1 * num2;
    }
    else if(operator == "divide"){
        return  num1 / num2;
    }
}

let updateDisplay = (text) => {
    if(text=="Syntax Error"){
        displays.textContent = "Syntax Error";
        return;
    }
    displays.textContent = text || (previousValue+" "+currentOperator+" "+currentValue);
   }

let handleDigit = (digit) => {
    currentValue += digit;
    updateDisplay();
}

let handleOperator =(nextOperator, nextOperatorSymbol) => {
  if(currentValue !== ""){
    previousValue = currentValue;
    currentValue = "";
    currentOperator = nextOperatorSymbol;
    updateDisplay();
    }
    else{
       currentOperator += nextOperatorSymbol
       }
       updateDisplay();
    }



let handleEquals = () => {
    let addCount = [...currentOperator].filter(char => char === "+").length;
    let minusCount = [...currentOperator].filter(char => char === "-").length;
    let errorCount = [...currentOperator].filter(char =>char === "x" ||  char === "÷").length;
   
    }
 let result = compute(previousValue, currentOperator, currentValue);
 if(currentOperator == ""){
    return
 }
 else if(currentValue== ""){
    currentValue = previousValue;
 }
 if(isNaN(result)){
    currentOperator = "";
    previousValue = "";
    currentValue = "";
    updateDisplay("Syntax Error");
 }
 else{
 currentOperator = "";
 previousValue = String(result);
 currentValue = "";
 updateDisplay(result);
}
}
let = clearAll = () => {
    currentValue = '';
    previousValue = '';
    currentOperator = '';
    updateDisplay(0);
}

let deleteDigit = () => {
    if(currentValue == ""){
        currentValue ="";
        currentOperator = "";
        currentValue = previousValue.slice(0,-1);
        previousValue ="";
        updateDisplay();
    }
    else{currentValue = currentValue.slice(0, -1);
    updateDisplay(currentValue);
}
}
let handleDecimal = () => {
    if(!currentValue.includes(".")){
        currentValue += ".";
        updateDisplay();
    }
}
 percent.addEventListener('click', () => {
   if(currentValue ==""){
    currentValue = previousValue;
    previousValue = "";
   }
   currentValue = currentValue/100;
   currentValue = String(currentValue);
   updateDisplay();
   
 })

btns.forEach((button) => {
    button.addEventListener('click', () =>{
        if([...num].includes(button)){
    handleDigit(button.textContent);
}
else if([...operator].includes(button)){
    handleOperator(button.id, button.textContent);
}
else if(button===equal){
    handleEquals();
}
else if(button===AC){
    clearAll();
}
else if(button===del){
    deleteDigit();
}
else if(button===decimal){
     handleDecimal();
}
    });
});
