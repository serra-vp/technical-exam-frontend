import React from "react";
import Key from "../../DumbComponents/Key";

const KeypadLayout = ({type, onClick}) => {
  const keys = {
    input_keys: {
      keys_array: ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "AC","+-", "%"],
      css_selector: "digit-keys"
    },
    operator_keys: {
      keys_array: ["/", "x", "-", "+", "="],
      css_selector: "operator-keys"
    }
  };

  return keys[type].keys_array.map( (row, index) => {

    const css_selector = 
      ["AC","+-", "%"].includes(row) 
        ? 'function-keys' 
        : `${keys[type].css_selector}${(row === "0") ? ' key-0' : ''}`;

    const key_value = (row === "+-") ? "±" : row;

    return(
      <Key key={`${type}-${index}`} onClick={() => onClick(row)} value={key_value} className={css_selector}/>
    );
  });
};

const Keypad = ({onClick}) => {

  return (
    <div className="calculator-keypad">
      <div className="input-keys">
        <KeypadLayout type={"input_keys"} onClick={onClick}/>
      </div>
      <div className="operator-keys">
        <KeypadLayout type={"operator_keys"} onClick={onClick}/>
      </div>
    </div>  
  );
};

export default Keypad;
