export default function BasketItem({ item, increaseQuantity, decreaseQuantity, removeFromBasket }) {
    return (
      <>

        <tr>
          <td>{item.title}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>{item.quantity}</td>
          <td>${(item.price * item.quantity).toFixed(2)}</td>
        </tr>

        <tr className="basket-actions-row">
          <td colSpan="4">
            <div className="basket-actions">
              <button className="increase-btn" onClick={() => increaseQuantity(item.id)}>+</button>
              <button className="decrease-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
              <button className="remove-btn" onClick={() => removeFromBasket(item.id)}>x</button>
            </div>
          </td>
        </tr>
      </>
    );
  }
  
  