import { Link, useLocation } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-page">
        <section className="confirmation-card">
          <h1>No order found</h1>
          <p>
            We could not find an order to show. Please go back to the shop and
            place an order.
          </p>
          <Link to="/products" className="confirmation-button">
            Back to products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <section className="confirmation-card">
        <p className="confirmation-kicker">Order confirmed</p>

        <h1>Thank you for your order!</h1>

        <p className="confirmation-message">
          Your cuddly friends are getting ready for their new home.
        </p>

        <div className="confirmation-details">
          <h2>Customer details</h2>
          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Payment:</strong> {order.customer.paymentMethod}
          </p>
        </div>

        <div className="confirmation-details">
          <h2>Order summary</h2>

          <div className="confirmation-items">
            {order.items.map((item) => (
              <div className="confirmation-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{item.price * item.quantity} kr</span>
              </div>
            ))}
          </div>

          <div className="confirmation-row">
            <span>Subtotal</span>
            <span>{order.subtotal} kr</span>
          </div>

          <div className="confirmation-row">
            <span>Delivery</span>
            <span>
              {order.deliveryCost === 0 ? "Free" : `${order.deliveryCost} kr`}
            </span>
          </div>

          <div className="confirmation-total">
            <span>Total</span>
            <span>{order.total} kr</span>
          </div>
        </div>

        <Link to="/products" className="confirmation-button">
          Back to shop
        </Link>
      </section>
    </div>
  );
}

export default Confirmation;