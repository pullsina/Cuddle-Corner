import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import accountIcon from "../assets/icons/account-icon.svg";
import cartIcon from "../assets/icons/header-cart-icon.svg";
import deliveryIcon from "../assets/icons/delivery-icon.svg";
import heartIcon from "../assets/icons/heart-icon.svg";
import searchIcon from "../assets/icons/search-icon.svg";
import "./Header.css";

const primaryLinks = [
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
];

const secondaryLinks = [
  { to: "/favorites", label: "Favorites", icon: heartIcon },
  { to: "/account", label: "My Account", icon: accountIcon },
  { to: "/cart", label: "My Cart", icon: cartIcon },
];

function Header() {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentSearchTerm =
    location.pathname === "/products"
      ? new URLSearchParams(location.search).get("search") ?? ""
      : "";
  const searchFieldKey =
    location.pathname === "/products" ? location.search || "products" : location.pathname;

  function toggleMenu() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawSearchTerm = formData.get("search");
    const trimmedSearchTerm =
      typeof rawSearchTerm === "string" ? rawSearchTerm.trim() : "";
    const nextSearchParams =
      location.pathname === "/products"
        ? new URLSearchParams(location.search)
        : new URLSearchParams();

    if (trimmedSearchTerm) {
      nextSearchParams.set("search", trimmedSearchTerm);
    } else {
      nextSearchParams.delete("search");
    }

    const nextQuery = nextSearchParams.toString();
    navigate(nextQuery ? `/products?${nextQuery}` : "/products");
    closeMenu();
  }

  function handleSearchKeyDown(event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <p className="header-top-item">
          <img
            src={deliveryIcon}
            alt=""
            aria-hidden="true"
            className="header-top-icon"
          />
          <span>Free delivery over 399 kr</span>
        </p>

        <p className="header-top-item">
          <img
            src={heartIcon}
            alt=""
            aria-hidden="true"
            className="header-top-icon"
          />
          <span>Carefully selected soft toys</span>
        </p>
      </div>

      <div className="header-main">
        <NavLink
          to="/"
          end
          className="desktop-brand-bear"
          aria-label="Go to Cuddle Corner home page"
          onClick={closeMenu}
        >
          <img src="/images/brand/bear-only.svg" alt="" className="brand-bear" />
        </NavLink>

        <NavLink
          to="/"
          end
          className="mobile-brand-link"
          aria-label="Go to Cuddly Corner home page"
          onClick={closeMenu}
        >
          <img
            src="/images/logos/cuddle-corner-logo-transparent.png"
            alt="Cuddle Corner logo"
            className="mobile-brand-logo"
          />
        </NavLink>

        <div className="header-mobile-actions">
          <NavLink
            to="/cart"
            className="nav-icon-link mobile-cart-link"
            onClick={closeMenu}
          >
            <img
              src={cartIcon}
              alt=""
              aria-hidden="true"
              className="nav-link-icon"
            />
            <span className="mobile-cart-label">Cart</span>
            <span className="cart-count">{cartCount}</span>
          </NavLink>

          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`.trim()}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
          >
            <span className="menu-toggle-text">Menu</span>
            <span className="menu-toggle-bars" aria-hidden="true">
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </span>
          </button>
        </div>

        <nav
          id="site-navigation"
          className={`navbar ${isMenuOpen ? "menu-open" : ""}`.trim()}
          aria-label="Primary navigation"
        >
          <div className="navbar-primary">
            <NavLink
              to="/"
              end
              className="desktop-wordmark-link"
              aria-label="Go to Cuddly Corner home page"
              onClick={closeMenu}
            >
              <span className="desktop-wordmark-text">Cuddle Corner</span>
            </NavLink>

            <div className="nav-links">
              {primaryLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <form
            key={searchFieldKey}
            className="header-search-form"
            role="search"
            aria-label="Search products"
            onSubmit={handleSearchSubmit}
          >
            <button
              type="submit"
              className="header-search-button"
              aria-label="Search products"
            >
              <img
                src={searchIcon}
                alt=""
                aria-hidden="true"
                className="header-search-icon"
              />
            </button>

            <input
              type="search"
              name="search"
              className="header-search-input"
              placeholder="Search plushies"
              defaultValue={currentSearchTerm}
              onKeyDown={handleSearchKeyDown}
            />
          </form>

          <div className="nav-actions">
            {secondaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={link.icon ? "nav-link-with-icon" : undefined}
              >
                {link.icon && (
                  <img
                    src={link.icon}
                    alt=""
                    aria-hidden="true"
                    className="nav-link-icon"
                  />
                )}
                {link.label}
                {link.to === "/cart" && <span className="cart-count">{cartCount}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
