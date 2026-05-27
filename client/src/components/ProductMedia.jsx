/* ProductMediaär en liten hjälpar komponent för att visa produktens
 bild eller fallback. Den finns för att inte ska skriva samma 
bildlogik på flera ställen.*/

import { useState } from "react";
import "./ProductMedia.css";

/*Den gör i princip detta:
om product image finns och fungerar - visa <img>
om ingen bild finns ännu, eller om bilden failar - visa product.emoji
om showHint={true}: visa texten Photo coming soon under emojin.*/

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
