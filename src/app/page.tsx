import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/Contact/ContactForm";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ContactForm />
    </main>
  );
}
