import React from "react";

//import Components
import Display from "../DumbComponents/Display";
import Keypad from "./Keypad";

//import Contexts
import { useCalculatorProvider } from "../../context/CalculatorContext";

//utils
import { handleCalculate } from "../../services/Calculate";

const Main = () => {
  const { data, setData } = useCalculatorProvider(); //deconstruct context

  const insertDigits = (value) => {
    if (data.waitingForOperand) {
      if (data.operator === "=") {
        setData((prevState) => ({
          ...prevState,
          displayValue: value,
          operator: null,
          waitingForOperand: true,
        }));
      } else {
        setData((prevState) => ({
          ...prevState,
          displayValue:
            data.displayValue === "0" ? value : parseFloat(data.displayValue) + parseFloat(value),
          waitingForOperand: true,
        }));
      }
    } else {
      setData((prevState) => ({
        ...prevState,
        displayValue: value,
        waitingForOperand: true,
      }));
    }
  };

  const clearData = () => {
    setData({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: true,
    });
  };

  const handleOperator = (operator) => {
    console.log(data.value);

    if (operator !== "=") {
      if (data.value) {
        const currentVal = parseFloat(data.displayValue);
        const prevVal = parseFloat(data.value);
        const newValue = handleCalculate(prevVal, currentVal, data.operator);
        console.log(prevVal, currentVal, data.operator)

        setData((prevState) => ({
          ...prevState,
          value: newValue,
          operator: operator,
          displayValue: String(newValue),
        }));

      } else {

        setData((prevState) => ({
          ...prevState,
          value: data.displayValue,
          operator: operator,
          waitingForOperand: false,
        }));

      }
    } else {

      const inputVal = parseFloat(data.displayValue);

      if (!data.value) {

        setData((prevState) => ({
          ...prevState,
          value: inputVal,
        }));

      } else {
        
        const currentVal = parseFloat(data.displayValue);
        const prevVal = parseFloat(data.value);
        // const newValue = handleCalculate[operator](prevVal, currentVal);
        const newValue = handleCalculate(prevVal, currentVal, data.operator);

        setData((prevState) => ({
          ...prevState,
          value: newValue,
          operator: operator,
          displayValue: String(newValue),
        }));
        
      }
    }
  };

  const handleInputPercent = () => {
    const { displayValue } = data;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    setData((prevState) => ({
      ...prevState,
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    }));
  };

  const handleInvert = () => {
    setData((prevState) => ({
      ...prevState,
      displayValue: parseFloat(data.displayValue) * -1,
    }));
  };

  const handleInputDot = () => {
    const { displayValue } = data;
    if (!/\./.test(displayValue)) {
      setData((prevState) => ({
        ...prevState,
        displayValue: displayValue + ".",
      }));
    }
  };

  const handleOnKeyPress = React.useCallback(
    (event) => {
      let { key, keyCode } = event;

      if (key === "Enter") {
        key = "=";
      } else if (
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105)
      ) {
        key = key.toString();
      }

      handleChange(key);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const handleChange = (key_param) => {
    if (/\d/.test(key_param)) {
      insertDigits(key_param);
    } else {
      switch (key_param) {
        case "AC":
          clearData();
          break;
        case "+-":
          handleInvert();
          break;
        case "%":
          handleInputPercent();
          break;
        case ".":
          handleInputDot();
          break;
        case "Backspace":
          clearData();
          break;
        case "/":
        case "x":
        case "-":
        case "+":
        case "=":
          handleOperator(key_param);
          break;
        default:
          break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleOnKeyPress);
    return () => {
      window.removeEventListener("keydown", handleOnKeyPress);
    };
  }, [handleOnKeyPress]);

  return (
    <div id="main-container">
      <div id="app">
        <div className="calculator">
          <Display value={data.displayValue} />
          <Keypad onClick={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Main;
