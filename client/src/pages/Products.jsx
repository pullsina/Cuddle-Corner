import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
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
  /*products börjar som tom array
när fetch är klar sparar vi APIdatan i products*/
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /*När komponenten laddas första gången:
hämta produkter från json-server*/
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error("Could not fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="products-page">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <p>{error}</p>
      </div>
    );
  }

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