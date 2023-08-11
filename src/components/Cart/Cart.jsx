import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useState } from "react";

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Sushi", amount: 2, price: 12.99 },
  ].map((item) => {
    return <li key={item.id}>{item.name}</li>;
  });
  return (
    <Modal>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.26</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}
