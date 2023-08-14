import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

export default function Cart({ onHideCart }) {
  const ctx = useContext(CartContext);

  
  const cartItems = ctx.items.map((item) => {
    return <li key={item.id}>{item.name}</li>;
  });
  return (
    <Modal onHideCart={onHideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ctx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}
