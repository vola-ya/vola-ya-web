import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import OpportunitiesSection from "./components/OpportunitiesSection";
import WhyVolaYa from "./components/WhyVolaYa";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <OpportunitiesSection />
      <WhyVolaYa />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
