import classes from "./CheckoutForm.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim().length === 0;
};

const isFiveChars = (value) => {
  return value.trim().length === 5;
};

export default function CheckoutForm({ onCancel, onConfirm }) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    address: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const nameValid = !isEmpty(enteredName);
    const cityValid = !isEmpty(enteredCity);
    const addressValid = !isEmpty(enteredAddress);
    const postalCodeValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: nameValid,
      city: cityValid,
      address: addressValid,
      postalCode: postalCodeValid,
    });

    const formIsValid =
      nameValid && cityValid && addressValid && postalCodeValid;

    if (!formIsValid) {
      return;
    }

    // submit the form

    onConfirm({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter a valid name...</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.address && classes.invalid
        }`}
      >
        <label htmlFor="address">Your Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p>Enter a valid street address..</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.postalCode && classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Enter a valid postal Code...</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">Your City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter a valid city name...</p>}
      </div>
      <div className={classes.actions}>
        <button type="submit">Confirm</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
