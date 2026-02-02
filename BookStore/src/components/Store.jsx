import { useState } from "react";
import productsData from "../data/products";
import ProductList from "./ProductList";
import Basket from "../components/Basket";
import BasketIcon from "../components/BasketIcon";

export default function Store() {
  const [basket, setBasket] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const moveToCart = product => {
    const existingItem = basket.find(item => item.id === product.id);
    if (existingItem) {
      setBasket(
        basket.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = id => {
    setBasket(
      basket.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = id => {
    setBasket(
      basket.map(item =>
        item.id !== id ? item : { ...item, quantity: Math.max(1, item.quantity - 1) }
      )
    );
  };

  const removeFromBasket = id => setBasket(basket.filter(item => item.id !== id));

  const toggleBasket = () => setIsBasketOpen(!isBasketOpen);

  return (
    <div className="store">
      <header className="header">
        <BasketIcon basketLength={basket.length} toggleBasket={toggleBasket} />
        <h1>Shop</h1>
      </header>

      <ProductList products={productsData} moveToCart={moveToCart} />

      {isBasketOpen && (
        <div className="basket-popup">
          <Basket
            basket={basket}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromBasket={removeFromBasket}
            toggleBasket={toggleBasket}
          />
        </div>
      )}
    </div>
  );
}
