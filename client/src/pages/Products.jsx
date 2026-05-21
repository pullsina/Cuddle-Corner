import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "./Products.css";

const categories = [
  "All",
  "Bears",
  "Bunnies",
  "Lions",
  "Ocean Friends",
  "Fantasy Plushies",
  "Wild Friends",
];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="products-page">
      <section className="products-hero">
        <p className="products-kicker">All plushies</p>
        <h1>Find your new cuddly friend</h1>
        <p>
          Explore soft plush toys for birthdays, gifts and everyday cuddles.
        </p>
      </section>

      <section className="products-section">
        <div className="products-header">
          <div>
            <h2>Products</h2>
            <p>{filteredProducts.length} plush friends available</p>
          </div>
        </div>

        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active-filter" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;