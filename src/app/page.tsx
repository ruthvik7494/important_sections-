import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/Contact/ContactForm";
import CategoryCarousel from "@/components/CategoryCarousel";
import SuperFlowSection from "@/components/SuperFlowSection";
import MaterialYouSlider from "@/components/MaterialYouSlider";
import CompactCategorySlider from "@/components/CompactCategorySlider";
import PanoramaSlider from "@/components/PanoramaSlider";
import PerspectiveSlider from "@/components/PerspectiveSlider";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CategoryCarousel />
      <SuperFlowSection />
      <MaterialYouSlider />
      <CompactCategorySlider />
      <PanoramaSlider />
      <PerspectiveSlider />
      <ContactForm />
    </main>
  );
}
