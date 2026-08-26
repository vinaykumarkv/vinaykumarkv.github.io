import Hero from "../src/components/Hero";
import About from "../src/components/About";
import Career from "../src/components/Career";
import Projects from "../src/components/Projects";
import Education from "../src/components/Education";
import Footer from "../src/components/Footer";
import ChatBot from "../src/components/ChatBot";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Career />
      <Projects />
      <Education />
      <Footer />
      <ChatBot />
    </main>
  );
}
