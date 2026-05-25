import { NavLink } from "react-router-dom";
import "./Header.css";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-icon">🧸</div>
          <span className="brand-name">Cuddly Corner</span>
        </div>

        <div className="header-info">
          <span>🚚 Free delivery over 399 kr</span>
          <span>💗 Carefully selected soft toys</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/account">My Account</NavLink>
        </div>

        <div className="nav-actions">
          <NavLink to="/cart" className="nav-icon-link cart-link">
            🛒 Cart
            <span className="cart-count">{cartCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
