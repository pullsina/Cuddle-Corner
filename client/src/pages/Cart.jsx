import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <section className="empty-cart">
          <h1>Your cart is empty</h1>
          <p>Looks like you have not added any plush friends yet.</p>
          <Link to="/products" className="cart-link-button">
            Browse products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-header">
        <p className="cart-kicker">Your order</p>
        <h1>Your cart</h1>
        <p>Review your cuddly friends before checkout.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <span>{item.emoji}</span>
              </div>

              <div className="cart-item-info">
                <p className="cart-item-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.price} kr</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <p className="cart-item-total">{item.price * item.quantity} kr</p>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{cartTotal} kr</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{cartTotal >= 399 ? "Free" : "49 kr"}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{cartTotal >= 399 ? cartTotal : cartTotal + 49} kr</span>
          </div>

          <Link to="/checkout" className="checkout-button">
            Go to checkout
          </Link>
        </aside>
      </section>
    </div>
  );
}

export default Cart;