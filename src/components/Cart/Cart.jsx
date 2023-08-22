import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

export default function Cart({ onHideCart }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderClickHandler = () => {
    setShowCheckout(true);
  };

  const checkoutFormHandler = () => {
    setShowCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // console.log(userData);
    await fetch(
      "https://react-http-cb681-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: ctx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmittingContent = <p>Submitting your data to the backend</p>;
  const submittedModalContent = (
    <>
      <p>Data has now been submitted</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  const modalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <CheckoutForm
          onConfirm={submitOrderHandler}
          onCancel={checkoutFormHandler}
        />
      )}
      {!showCheckout && modalActions}
    </>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && !didSubmit && isSubmittingContent}
      {!isSubmitting && didSubmit && submittedModalContent}
    </Modal>
  );
}
