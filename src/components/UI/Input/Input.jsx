import classes from "./Input.module.css";
// import { useState } from "react";

const Input = ({ label, input, onAmountChange }) => {
  const amountChangeHandler = (e) => {
    // setAmount(e.target.value);
    onAmountChange(e.target.value);
  };

  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input
        id={input.id}
        {...input}
        onChange={amountChangeHandler}
        // value={amount}
      />
    </div>
  );
};

export default Input;
