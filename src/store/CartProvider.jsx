import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // concat returns a new instance and does not override the previous one
      const updatedItems = state.items.concat(action.val);
      const updatedTotalAmount =
        state.totalAmount + action.val.price * action.val.amount;

      return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", val: item });
  };

  const removeItemFromCart = (item) => {
    dispatchCartAction({ type: "REMOVE", val: item });
  };

  const cartContext = {
    items: cartState.items,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    totalAmount: cartState.totalAmount,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
