import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.val.price * action.val.amount;
      // const updatedItems = state.items.concat(action.val);

      // if the item already exists it will find its index
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.val.id;
      });

      let updatedItems;

      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.val.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // concat returns a new instance and does not override the previous one
        updatedItems = state.items.concat(action.val);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case "REMOVE":
      const cartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      const curItem = state.items[cartItemIndex];

      const newTotalAmount = state.totalAmount - curItem.price;

      let newItems;
      if (curItem.amount === 1) {
        // we are removing the item in this one
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        // we are updating the amount in this one
        const updatedNewItem = { ...curItem, amount: curItem.amount - 1 };
        newItems = [...state.items];
        newItems[cartItemIndex] = updatedNewItem;
      }

      return { items: newItems, totalAmount: newTotalAmount };
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

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
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
