import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
 
const HeaderCartButton = ({ onClick }) => {
  const ctx = useContext(CartContext);

  // curValue starts with an initial value of 0
  // an item will have an initial amount
  const totalCartItems = ctx.items.reduce((curValue, item) => {
    return curValue + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Store</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
