import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductMedia from "../components/ProductMedia";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:3001/products/${id}`);

        if (!response.ok) {
          throw new Error("Could not fetch this product.");
        }

        const data = await response.json();
        const firstImage =
          [data.image, ...(data.gallery ?? [])].find(Boolean) ?? "";

        setProduct(data);
        setSelectedImage(firstImage);
      } catch (fetchError) {
        setError(fetchError.message);
        setSelectedImage("");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <section className="product-detail-empty">
          <h1>Product not found</h1>
          <p>{error || "We could not find the plushie you were looking for."}</p>
          <Link to="/products" className="detail-back-button">
            Back to products
          </Link>
        </section>
      </div>
    );
  }

  const features = product.features ?? [];
  const galleryImages = [...new Set([product.image, ...(product.gallery ?? [])])].filter(
    Boolean
  );
  const activeImage = selectedImage || galleryImages[0] || "";

  return (
    <div className="product-detail-page">
      <Link to="/products" className="detail-back-link">
        Back to products
      </Link>

      <section className="product-detail-hero">
        <div className="product-detail-media">
          <ProductMedia
            product={{ ...product, image: activeImage }}
            className="product-detail-visual"
            imageClassName="product-detail-image"
            fallbackClassName="product-detail-fallback"
            showHint
          />

          {galleryImages.length > 1 && (
            <div className="detail-gallery" aria-label="Product image gallery">
              {galleryImages.map((imagePath, index) => (
                <button
                  key={imagePath}
                  className={`detail-gallery-button ${
                    activeImage === imagePath ? "active" : ""
                  }`.trim()}
                  type="button"
                  onClick={() => setSelectedImage(imagePath)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImage === imagePath}
                >
                  <img
                    src={imagePath}
                    alt={`${product.name} view ${index + 1}`}
                    className="detail-gallery-image"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-content">
          <p className="detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">
            {product.description || "A sweet plush friend ready for cuddles."}
          </p>

          <div className="detail-meta-row">
            <span className="detail-stock-badge">
              {product.stockStatus || "Coming soon"}
            </span>
            <span className="detail-age">
              {product.ageRecommendation || "More details later"}
            </span>
          </div>

          <p className="detail-price">{product.price} kr</p>

          <button
            className="detail-add-to-cart"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </section>

      <section className="product-detail-grid">
        <article className="product-detail-card">
          <h2>About this plushie</h2>
          <p>{product.longDescription || product.description}</p>
        </article>

        <article className="product-detail-card">
          <h2>Product details</h2>

          <dl className="detail-specs">
            <div className="detail-spec-row">
              <dt>Size</dt>
              <dd>{product.size || "Coming soon"}</dd>
            </div>

            <div className="detail-spec-row">
              <dt>Material</dt>
              <dd>{product.material || "Coming soon"}</dd>
            </div>

            <div className="detail-spec-row">
              <dt>Care</dt>
              <dd>{product.careInstructions || "Coming soon"}</dd>
            </div>

            <div className="detail-spec-row">
              <dt>Stock</dt>
              <dd>{product.stockStatus || "Coming soon"}</dd>
            </div>
          </dl>
        </article>
      </section>

      {features.length > 0 && (
        <section className="product-detail-card detail-features">
          <h2>Why you will love it</h2>

          <ul className="detail-feature-list">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
