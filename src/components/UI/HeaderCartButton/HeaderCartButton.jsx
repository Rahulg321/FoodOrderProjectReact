import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useState } from "react";

const HeaderCartButton = ({ onCartClick }) => {
  const [showCart, handleShowCart] = useState(false);

  const handleCartClick = () => {
    console.log("cart button clicked show cart");
    handleShowCart(true);
    onCartClick(showCart);
  };

  return (
    <div onClick={handleCartClick}>
      <button className={classes.button}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Store</span>
        <span className={classes.badge}>3</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
