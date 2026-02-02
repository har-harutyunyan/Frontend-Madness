import BasketItem from "./BasketItem";

export default function Basket({ basket, increaseQuantity, decreaseQuantity, removeFromBasket }) {
  return (
    <div>
      {basket.length === 0 ? (
        <p className="empty-basket">No purchases yet</p>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {basket.map(item => (
            <BasketItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromBasket={removeFromBasket}
            />
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

