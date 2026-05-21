import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <button className="favorite-button" aria-label="Add to favorites">
        ♡
      </button>

      <div className="product-image">
        <span>{product.emoji}</span>
      </div>

      <p className="product-category">{product.category}</p>

      <h3>{product.name}</h3>

      <p className="product-description">{product.description}</p>

      <div className="product-card-bottom">
        <p className="product-price">{product.price} kr</p>
        <button className="add-to-cart-button">Add to cart</button>
      </div>
    </article>
  );
}

export default ProductCard;