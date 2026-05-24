import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const deliveryCost = cartTotal >= 399 ? 0 : 49;
  const finalTotal = cartTotal + deliveryCost;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Choose a payment method.";
    }

    return newErrors;
  }

async function handleSubmit(event) {
  event.preventDefault();

  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  const order = {
    customer: formData,
    items: cartItems,
    subtotal: cartTotal,
    deliveryCost,
    total: finalTotal,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Could not save order.");
    }

    const savedOrder = await response.json();

    clearCart();

    navigate("/confirmation", {
      state: { order: savedOrder },
    });
  } catch (error) {
    console.error(error);
    setErrors({
      submit: "Something went wrong. Please try again.",
    });
  }
}

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <section className="empty-checkout">
          <h1>Your cart is empty</h1>
          <p>Add some plush friends before going to checkout.</p>
          <Link to="/products" className="checkout-link-button">
            Browse products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-header">
        <p className="checkout-kicker">Checkout</p>
        <h1>Complete your order</h1>
        <p>Fill in your details and choose a payment method.</p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Customer details</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+46..."
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <span className="payment-label">Payment method</span>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={formData.paymentMethod === "Card"}
                  onChange={handleChange}
                />
                Card
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Swish"
                  checked={formData.paymentMethod === "Swish"}
                  onChange={handleChange}
                />
                Swish
              </label>
            </div>

            {errors.paymentMethod && (
              <p className="form-error">{errors.paymentMethod}</p>
            )}
          </div>

          {errors.submit && <p className="form-error">{errors.submit}</p>}

          <button className="place-order-button" type="submit">
            Place order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>

          <div className="checkout-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{item.price * item.quantity} kr</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{cartTotal} kr</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryCost === 0 ? "Free" : `${deliveryCost} kr`}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{finalTotal} kr</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Checkout;