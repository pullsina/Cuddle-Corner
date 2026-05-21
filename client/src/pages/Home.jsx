import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import BenefitsSection from "../components/BenefitsSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <BenefitsSection />
    </div>
  );
}

export default Home;