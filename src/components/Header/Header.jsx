import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "../UI/HeaderCartButton/HeaderCartButton";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Header = ({ onShowCart }) => {
  const ctx = useContext(CartContext);
  
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
