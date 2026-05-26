import { useState } from "react";
import "./ProductMedia.css";

function ProductMedia({
  product,
  className = "",
  imageClassName = "",
  fallbackClassName = "",
  showHint = false,
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const hasImage = Boolean(product.image) && !hasImageError;

  return (
    <div className={className}>
      {hasImage ? (
        <img
          src={product.image}
          alt={product.imageAlt || product.name}
          className={imageClassName}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className={`product-media-fallback ${fallbackClassName}`.trim()}>
          <span className="product-media-emoji">{product.emoji}</span>
          {showHint && <p className="product-media-hint">Photo coming soon</p>}
        </div>
      )}
    </div>
  );
}

export default ProductMedia;
