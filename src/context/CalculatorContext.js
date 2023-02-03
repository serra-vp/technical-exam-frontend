import React from "react";

const CalculatorContext = React.createContext();

const CalculatorProvider = (props) => {

  const [ data, setData ] = React.useState({
    value: null,
    displayValue: 0,
    operator: null,
    waitingForOperand: true,
  });

  return (
    <CalculatorContext.Provider
    value={{
      data, setData
    }}
    {...props}
    />
);
}

function useCalculatorProvider() {
  const context = React.useContext(CalculatorContext);
  if (!context) throw new Error("useCalculatorProvider must be used within an CalculatorProvider");
  return context;
}

export { CalculatorProvider, useCalculatorProvider };