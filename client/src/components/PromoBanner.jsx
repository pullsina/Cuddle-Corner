import "./PromoBanner.css";

function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-content">
        <p className="promo-label">Gift-ready plushies</p>

        <h2>Make every birthday softer</h2>

        <p>
          Choose a plush friend, add a gift note and create a memory that lasts
          longer than the cake.
        </p>

        <button className="promo-button">Explore birthday gifts</button>
      </div>

      <div className="promo-visual">
        <div className="gift-box">🎁</div>
        <div className="promo-star star-one">★</div>
        <div className="promo-star star-two">★</div>
      </div>
    </section>
  );
}

export default PromoBanner;