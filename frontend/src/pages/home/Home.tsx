import Hero from "./components/hero";
import Projects from "./components/projects";
import About from "./components/about";
import Contact from "./components/contact";

import CurtainSection from "../../components/curtain-section";
import FloatingSection from "./components/floating-section";

export default function Home() {
  return (
    <>
      <FloatingSection>
        <Hero />
      </FloatingSection>
      <CurtainSection>
        <Projects />
      </CurtainSection>{" "}
      <div className="relative z-20 bg-ice">
        <About />
        <Contact />
      </div>
    </>
  );
}
