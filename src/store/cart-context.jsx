import React from "react";

// optional to specify a default value for better intellisense
// not needed per say
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
