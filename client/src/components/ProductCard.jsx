import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductMedia from "./ProductMedia";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link className="product-card-main" to={`/products/${product.id}`}>
        <ProductMedia
          product={product}
          className="product-image"
          imageClassName="product-image-file"
          fallbackClassName="product-image-fallback"
        />

        <p className="product-category">{product.category}</p>

        <h3>{product.name}</h3>

        <p className="product-description">{product.description}</p>
      </Link>

      <div className="product-card-bottom">
        <div className="product-card-meta">
          <p className="product-price">{product.price} kr</p>
          <Link className="product-details-link" to={`/products/${product.id}`}>
            View details
          </Link>
        </div>

        <button
          className="add-to-cart-button"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
