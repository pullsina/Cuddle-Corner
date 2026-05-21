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
    name: "Birthday Plushies",
    emoji: "🎁",
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
          <article className="category-card" key={category.id}>
            <div className="category-icon">{category.emoji}</div>
            <h3>{category.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;