import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({ name, description, price, id }) => {
  //   const price = `$${price.toFixed(2)}`;
  const ctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    // we are making a new object with all the necessary details
    const newItem = {
      id,
      name,
      amount,
      price,
    };
    ctx.addItem(newItem);
  };

  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{name}</h3>
          <div className={classes.description}>{description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </div>
      </li>
    </>
  );
};

export default MealItem;
