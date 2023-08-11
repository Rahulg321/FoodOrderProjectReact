import React from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {showModal && <Cart />}
      <Header onCartClicked={handleModalDisplay} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
