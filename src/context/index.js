import React from 'react';
import { CalculatorProvider } from './CalculatorContext';

const ContextProvider = (props) => {
  console.log(props)
    return ( 
      <CalculatorProvider>
        {props.children}
      </CalculatorProvider>
    );
}
 
export default ContextProvider;