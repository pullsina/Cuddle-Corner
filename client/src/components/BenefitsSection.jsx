import "./BenefitsSection.css";

const benefits = [
  {
    id: 1,
    icon: "🚚",
    title: "Free delivery over 399 kr",
    description: "Fast, safe and tracked shipping.",
  },
  {
    id: 2,
    icon: "💗",
    title: "Carefully selected soft toys",
    description: "Premium quality for endless cuddles.",
  },
  {
    id: 3,
    icon: "🎁",
    title: "Perfect gifts for birthdays",
    description: "Made to make every celebration special.",
  },
];

function BenefitsSection() {
  return (
    <section className="benefits-section">
      {benefits.map((benefit) => (
        <article className="benefit-card" key={benefit.id}>
          <div className="benefit-icon">{benefit.icon}</div>

          <div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default BenefitsSection;