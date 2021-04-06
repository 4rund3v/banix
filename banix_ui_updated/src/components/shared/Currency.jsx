// react
import React from "react";

const Currency = ({ value, currency, currentCurrency }) => {
  return <React.Fragment>&#x20B9; {`${value.toFixed(2)}`}</React.Fragment>;
};

export default Currency;
