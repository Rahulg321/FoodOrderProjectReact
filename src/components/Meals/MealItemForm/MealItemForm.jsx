import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import { useState } from "react";
// import { useContext } from "react";
// import CartContext from "../../../store/cart-context";

const MealItemForm = ({ id, onAddToCart }) => {
  const [amount, setAmount] = useState(0);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (amount < 1 || amount > 5) {
      setAmountIsValid(false);
      return;
    }
    onAddToCart(amount);

    // setAmount(0);
  };

  const amountChangeHandler = (curAmount) => {
    setAmount(+curAmount);
  };

  return (
    <>
      <form action="" className={classes.form} onSubmit={formSubmitHandler}>
        <Input
          label="amount"
          input={{
            type: "number",
            min: 1,
            max: 5,
            step: 1,
            // defaultValue: 1,
            id: "amount_" + { id },
          }}
          onAmountChange={amountChangeHandler}
        />
        <button type="submit">+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
      </form>
    </>
  );
};

export default MealItemForm;
