import React from 'react';

const Display = (props) => {

  const { value } = props;

  const formattedValue = parseFloat(value).toLocaleString('en-US', {
    useGrouping: true,
    maximumFractionDigits: 6
  });

  return (
    <div {...props} className="calculator-display">
      {formattedValue}
    </div>
  );
}

export default Display;