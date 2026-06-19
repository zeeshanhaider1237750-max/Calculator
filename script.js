const btns = document.querySelectorAll(".button");
const displays = document.getElementById("display");
const operator = document.querySelectorAll('#add, #subtract, #multiply, #divide');
const num = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
const AC = document.querySelector('#AC');
const del = document.querySelector('#del');
const percent = document.querySelector('#percent');
const decimal = document.querySelector('#decimal-point');
const equal = document.querySelector('#equal')

let num1, num2;
let currentValue = "";
let previousValue = "";
let currentOperator = "";
let displaySymbol = "";
let shouldDisplayResult = false;

let findGCD = (a, b) => {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

let compute = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if(operator == "+"){
        return  num1 + num2;
    }
    else if(operator == "-"){
        return  num1 - num2;
    }
    else if(operator == "x"){
        return  num1 * num2;
    }
    else if(operator == "÷"){
        if(num2 === 0 && operator == "÷"){
            return "Snarky Error";
        }
       else{ 
        return  num1 / num2;
       }
    }
    updateDisplay();
}

let updateDisplay = (text) => {
    if(text=="Syntax Error"){
        displays.textContent = "Syntax Error";
        return;
    }
    displays.textContent = text || (previousValue+" "+currentOperator+" "+currentValue);
   }

let handleDigit = (digit) => {
    if(shouldDisplayResult == true){
    currentOperator = "";
    currentValue = "";
    previousValue = "";
    shouldDisplayResult = false;
    }
    currentValue += digit;
    updateDisplay();
}

let handleOperator =(nextOperator, nextOperatorSymbol) => {
     
       
    if(currentValue !=="" && currentOperator !=="" && previousValue !== ""){
        let result = compute(previousValue, currentOperator, currentValue);
        if(result == "Snarky Error"){
            currentValue = "";
            currentOperator = "";
            previousValue = "";
            updateDisplay("Snarky Error");
            return
        }
         if(result % 1 !== 0){
    result = Math.round(result*10000)/10000;
   }
        previousValue = String(result);
        currentValue = "";
        currentOperator = nextOperatorSymbol;
    }
    else if(currentValue !== ""){
    previousValue = currentValue;
    currentValue = "";
    currentOperator = nextOperatorSymbol;
    }
    else{
       currentOperator = nextOperatorSymbol
       }
       updateDisplay();
} 
let handleEquals = () => {
     if(currentValue.includes('.') && currentOperator == "" && previousValue == ""){
    currentValue = String(Math.round(parseFloat(currentValue) *10000)/10000);
    updateDisplay(currentValue);
    shouldDisplayResult = true;
    return
   }
    let addCount = [...currentOperator].filter(char => char === "+").length;
    let minusCount = [...currentOperator].filter(char => char === "-").length;
    let errorCount = [...currentOperator].filter(char =>char === "x" ||  char === "÷").length;
    let calcOperator = "";
    if((currentOperator.includes("x") || currentOperator.includes("÷")) && currentOperator.length>1){
     previousValue = "";
     currentOperator = "";
     currentValue = "";
     updateDisplay("Syntax Error");
     return;
    }
    if(currentOperator === "x"){
        calcOperator = "x";
    }
    else if(currentOperator === "÷"){
        calcOperator = "÷";
    }
    else if(minusCount % 2 === 0){
        calcOperator = "+";
    }
    else{
        calcOperator = "-";
    }
    
    let result = compute(previousValue, calcOperator, currentValue);
    if(currentOperator == ""){
    return
   }
    else if(currentValue== ""){
    currentValue = previousValue;
   }
   if(result == "Snarky Error"){
    currentValue = "";
    currentOperator = "";
    previousValue = "";
    updateDisplay("Snarky Error");
    return
   }
    if(result % 1 !== 0){
    result = Math.round(result*10000)/10000;
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
      shouldDisplayResult = true;
   }
 }
   let = clearAll = () => {
    currentValue = '';
    previousValue = '';
    currentOperator = '';
    updateDisplay(0);
    shouldDisplayResult = true;
 }

   let deleteDigit = () => {
  if(currentValue.length > 0){
    currentValue = currentValue.slice(0, -1);
  }
  else if(currentOperator.length > 0){
    currentOperator = currentOperator.slice(0, -1);
  }
  else if(previousValue.length > 0){
    previousValue = previousValue.slice(0, -1);
  }
  updateDisplay();
 }

   let handleDecimal = () => {
    if(!currentValue.includes(".")){
        currentValue += ".";
        updateDisplay();
    }
 }
 let percentageCalc = () => {
    if(currentValue ==""){
    currentValue = previousValue;
    previousValue = "";
   }
   currentValue = currentValue/100;
   currentValue = String(currentValue);
   updateDisplay();
 }
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
else if(button===percent){
    percentageCalc();
}
    });
});
window.addEventListener('keydown', (e) => {
   if(e.key === "0"){
    handleDigit("0");
}
else if(e.key === "1"){
    handleDigit("1");
}
else if(e.key === "2"){
    handleDigit("2");
}
else if(e.key === "3"){
    handleDigit("3");
}
else if(e.key === "4"){
    handleDigit("4");
}
else if(e.key === "5"){
    handleDigit("5");
}
else if(e.key === "6"){
    handleDigit("6");
}
else if(e.key === "7"){
    handleDigit("7");
}
else if(e.key === "8"){
    handleDigit("8");
}
else if(e.key === "9"){
    handleDigit("9");
}
 else if(e.key === "+"){
  handleOperator("add", "+");
}
else if(e.key === "-"){
    handleOperator("subtract", "-");
}
else if(e.key === "*"){
    handleOperator("multiply", "x");
}
else if(e.key === "/"){
    handleOperator("divide", "÷");
}
else if(e.key === "Enter"){
   handleEquals();
}
else if(e.key === "Backspace"){
    deleteDigit();
 }
 else if(e.key === "Delete"){
    clearAll();
 }
 else if(e.key === "."){
    handleDecimal();
 }
 else if(e.key === "%"){
    percentageCalc();
 }
 })

