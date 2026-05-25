import { Link } from "react-router-dom";
import "./CategorySection.css";

const categories = [
  {
    id: 1,
    name: "Bears",
    emoji: "🧸",
  },
  {
    id: 2,
    name: "Bunnies",
    emoji: "🐰",
  },
  {
    id: 3,
    name: "Lions",
    emoji: "🦁",
  },
  {
    id: 4,
    name: "Ocean Friends",
    emoji: "🐳",
  },
  {
    id: 5,
    name: "Fantasy Plushies",
    emoji: "🦄",
  },
];

function CategorySection() {
  return (
    <section className="category-section">
      <div className="section-heading">
        <h2>Shop by category</h2>
        <p>Find the perfect soft friend for every little personality.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            className="category-card"
            key={category.id}
            to={`/products?category=${encodeURIComponent(category.name)}`}
          >
            <div className="category-icon">{category.emoji}</div>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
