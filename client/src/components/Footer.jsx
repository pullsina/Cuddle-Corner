import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">🧸</span>
            <span className="footer-logo-text">Cuddly Corner</span>
          </div>

          <p>Soft plush friends for birthdays, gifts and everyday cuddles.</p>

          <div className="footer-quick-links">
            <Link to="/about">About Us</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/account">My Account</Link>
          </div>
        </div>

        <div className="footer-column">
          <h3>Products</h3>
          <Link to="/products">All Plushies</Link>
          <Link to="/products">Bears</Link>
          <Link to="/products">Bunnies</Link>
          <Link to="/products">Lions</Link>
          <Link to="/products">Ocean Friends</Link>
        </div>

        <div className="footer-column">
          <h3>Favorites</h3>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/products">Gift Ideas</Link>
        </div>

        <div className="footer-column">
          <h3>Cart</h3>
          <Link to="/cart">View Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>hello@cuddlycorner.se</p>
          <p>+46 70 123 45 67</p>
          <p>Malmo, Sweden</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cuddly Corner. All rights reserved.</p>
        <p>Privacy Policy · Terms & Conditions · Shipping & Returns</p>
      </div>
    </footer>
  );
}

export default Footer;
