import React from "react";
import { FaShoppingBasket } from "react-icons/fa";

export default function BasketIcon({ basketLength, toggleBasket }) {
  return (
    <div className="basket-icon" onClick={toggleBasket}>
      <FaShoppingBasket size={30} />
      {basketLength > 0 && <span className="badge">{basketLength}</span>}
    </div>
  );
}
