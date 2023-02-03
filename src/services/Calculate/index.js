export const handleCalculate = (prevVal, currentVal, operator) => {
   console.log({prevVal, currentVal, operator})
  switch (operator) {
     case "/":
        return prevVal / currentVal;
     case "+":
        return prevVal + currentVal;
     case "-":
        return prevVal - currentVal;
     case "*":
        return prevVal * currentVal;
     default:
        return currentVal;
  }
};