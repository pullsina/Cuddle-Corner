import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./HeroSection.css";

const birthdaySlides = [
  {
    id: "3",
    name: "Milo Birthday Bear",
    category: "Bears",
    description: "A soft bear with a party hat and a heart full of hugs.",
    price: 249,
    emoji: "🧸",
    image: "/images/products/milo-birthday-bear-main.png",
    imageAlt: "Milo Birthday Bear plush toy with party hat",
    heroImage: "/images/hero/milo-birthday-bear-cutout.webp",
    slideTitle: "A bear hug for the birthday star",
    slideDescription: "Soft, sweet and ready to celebrate.",
  },
  {
    id: "2",
    name: "Luna Party Bunny",
    category: "Bunnies",
    description: "A cuddly bunny for wishes, giggles and cake.",
    price: 199,
    emoji: "🐰",
    image: "/images/products/luna-party-bunny-main.png",
    imageAlt: "Luna Party Bunny plush toy with party hat",
    heroImage: "/images/hero/luna-party-bunny-cutout.webp",
    slideTitle: "Hop into birthday magic",
    slideDescription: "A cuddly bunny for wishes, giggles and cake.",
  },
  {
    id: "1",
    name: "Leo Celebration Lion",
    category: "Lions",
    description: "A gentle lion with a big heart and birthday spirit.",
    price: 279,
    emoji: "🦁",
    image: "/images/products/leo-celebration-lion-main.png",
    imageAlt: "Leo Celebration Lion plush toy with party hat",
    heroImage: "/images/hero/leo-celebration-lion-cutout.webp",
    slideTitle: "The party animal we all deserve",
    slideDescription: "A gentle lion with a big heart and birthday spirit.",
  },
];

function HeroSection() {
  const { addToCart } = useCart();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isSlideVisible, setIsSlideVisible] = useState(true);
  const slideSwapTimeoutRef = useRef(null);
  const slideRevealFrameRef = useRef(null);
  const activeSlide = birthdaySlides[activeSlideIndex];

  const clearSlideTransition = useCallback(() => {
    if (slideSwapTimeoutRef.current) {
      window.clearTimeout(slideSwapTimeoutRef.current);
      slideSwapTimeoutRef.current = null;
    }

    if (slideRevealFrameRef.current) {
      window.cancelAnimationFrame(slideRevealFrameRef.current);
      slideRevealFrameRef.current = null;
    }
  }, []);

  const changeSlide = useCallback((nextIndex) => {
    if (nextIndex === activeSlideIndex) {
      return;
    }

    clearSlideTransition();
    setIsSlideVisible(false);

    slideSwapTimeoutRef.current = window.setTimeout(() => {
      setActiveSlideIndex(nextIndex);
      slideSwapTimeoutRef.current = null;

      slideRevealFrameRef.current = window.requestAnimationFrame(() => {
        slideRevealFrameRef.current = window.requestAnimationFrame(() => {
          setIsSlideVisible(true);
          slideRevealFrameRef.current = null;
        });
      });
    }, 220);
  }, [activeSlideIndex, clearSlideTransition]);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      changeSlide((activeSlideIndex + 1) % birthdaySlides.length);
    }, 6800);

    return () => window.clearInterval(slideTimer);
  }, [activeSlideIndex, changeSlide]);

  useEffect(() => clearSlideTransition, [clearSlideTransition]);

  return (
    <section className="hero-section">
      <div className="hero-carousel-panel">
        <div className="hero-carousel-shell">
          <div className="hero-carousel-controls" aria-label="Birthday plushie slides">
            {birthdaySlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-dot ${index === activeSlideIndex ? "active" : ""}`.trim()}
                onClick={() => changeSlide(index)}
                aria-label={`Show ${slide.name}`}
                aria-pressed={index === activeSlideIndex}
              />
            ))}
          </div>

          <div className="hero-discount-flower">
            <strong>20% off</strong>
            <span>all birthday plushies</span>
          </div>

          <div
            className={`hero-slide-layout ${isSlideVisible ? "is-visible" : "is-hidden"}`.trim()}
            key={activeSlide.id}
          >
            <div className="hero-slide-figure-column">
              <Link
                className="hero-slide-image-link"
                to={`/products/${activeSlide.id}`}
                aria-label={`View ${activeSlide.name}`}
              >
                <img
                  src={activeSlide.heroImage}
                  alt={activeSlide.imageAlt}
                  className="hero-slide-image"
                />
              </Link>

              <button
                className="hero-add-button"
                type="button"
                onClick={() => addToCart(activeSlide)}
              >
                Add to cart
              </button>
            </div>

            <div className="hero-slide-copy">
              <h2>{activeSlide.slideTitle}</h2>
              <p>{activeSlide.slideDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-static-panel">
        <p className="hero-kicker">Birthday collection</p>
        <h1>Birthday cuddles made extra special</h1>
        <p className="hero-description">
          Discover soft plush friends ready to bring smiles, hugs and a little
          magic to every celebration.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/products?search=birthday">
            Shop birthday plushies
          </Link>
          <Link className="secondary-button" to="/products">
            View all plushies
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
