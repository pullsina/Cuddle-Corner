import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error("Could not fetch featured products.");
        }

        const data = await response.json();
        const featured = data.filter((product) => product.isFeatured);

        setFeaturedProducts(featured);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="featured-products">
        <p>Loading featured products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-products">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="featured-products">
      <div className="section-heading">
        <h2>All-time Favorites</h2>
        <p>
          Our most loved plush friends, picked for birthdays, gifts and everyday
          cuddles.
        </p>
      </div>

      <div className="featured-products-grid">
        {featuredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;