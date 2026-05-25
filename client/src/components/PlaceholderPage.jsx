import "./PlaceholderPage.css";

function PlaceholderPage({ title, intro, details, futureIdeas }) {
  return (
    <div className="placeholder-page">
      <section className="placeholder-hero">
        <p className="placeholder-kicker">Reserved for future content</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>

      <section className="placeholder-grid">
        <article className="placeholder-card">
          <h2>Why this page exists</h2>
          <p>{details}</p>
        </article>

        <article className="placeholder-card">
          <h2>Possible next step</h2>
          <p>{futureIdeas}</p>
        </article>
      </section>
    </div>
  );
}

export default PlaceholderPage;
