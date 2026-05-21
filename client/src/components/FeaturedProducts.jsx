import ProductCard from "./ProductCard";
import { products } from "../data/products";
import "./FeaturedProducts.css";


function FeaturedProducts() {
    const featuredProducts = products.filter((product) => product.isFeatured);
    
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