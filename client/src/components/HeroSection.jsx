import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-badge">Limited offer · 20% off birthday plushies</p>

        <h1>Birthday cuddles made extra special</h1>

        <p className="hero-description">
          Discover soft plush friends ready to bring smiles, hugs and a little
          magic to every celebration.
        </p>

        <div className="hero-actions">
          <button className="primary-button">Shop birthday plushies</button>
          <button className="secondary-button">View all plushies</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="discount-badge">
          <strong>20% off</strong>
          <span>all birthday plushies</span>
        </div>

        <div className="hero-toy-placeholder">🧸</div>

        <div className="hero-slide-copy">
          <h2>A bear hug for the birthday star</h2>
          <p>Soft, sweet and ready to celebrate.</p>
        </div>

        <div className="slider-dots" aria-label="Hero slider indicators">
          <span className="active-dot"></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;