import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error("Could not fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const availableCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const selectedCategory = searchParams.get("category") ?? "All";
  const activeCategory = availableCategories.includes(selectedCategory)
    ? selectedCategory
    : "All";
  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const normalizedSearchQuery = searchQuery.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      normalizedSearchQuery === "" ||
      [
        product.name,
        product.category,
        product.shortDescription,
        product.longDescription,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearchQuery));

    return matchesCategory && matchesSearch;
  });

  function handleCategorySelect(category) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextSearchParams.delete("category");
    } else {
      nextSearchParams.set("category", category);
    }

    setSearchParams(nextSearchParams);
  }

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
          {availableCategories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active-filter" : ""}
              onClick={() => handleCategorySelect(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <p>No products match your current filters.</p>
        )}
      </section>
    </div>
  );
}

export default Products;
