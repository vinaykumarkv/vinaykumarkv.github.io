import Hero from "@/components/Hero";
import About from "@/components/About";
import VATSA from "@/components/VATSA";
import Career from "@/components/Career";
import LearnWithVinay from "@/components/LearnWithVinay";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <VATSA />
      <Career />
      <LearnWithVinay />
      <Education />
      <Footer />
      <ChatBot />
    </main>
  );
}
