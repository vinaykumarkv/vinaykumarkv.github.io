import Hero from "../src/components/Hero";
import About from "../src/components/About";
import VATSA from "../src/components/VATSA";
import Career from "../src/components/Career";
import LearnWithVinay from "../src/components/LearnWithVinay";
import Education from "../src/components/Education";
import Footer from "../src/components/Footer";
import ChatBot from "../src/components/ChatBot";

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
