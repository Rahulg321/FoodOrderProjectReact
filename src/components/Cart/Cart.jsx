import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

export default function Cart({ onHideCart }) {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
    // ctx.addItem(item);
  };

  const cartItems = ctx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        // since we are passing parameters to our functions from the prop
        // itself we need to use an annonymous function for it
        onRemove={() => cartItemRemoveHandler(item.id)}
        onAdd={() => cartItemAddHandler(item)}
      />
    );
  });

  return (
    <Modal onHideCart={onHideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
