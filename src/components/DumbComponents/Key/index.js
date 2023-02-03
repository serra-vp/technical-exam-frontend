import React from 'react'

const Key = (props) => {
  const { onClick, className, value } = props;
  return <button onClick={onClick} className={`calculator-key ${className}`}>{value}</button>;
}

export default Key;