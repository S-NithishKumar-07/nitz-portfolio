"use client";
import dynamic from "next/dynamic";

import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const ThroughTheLens = dynamic(() => import("@/components/sections/ThroughTheLens"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <ScrollProgressBar />
      <LoadingScreen />
      <CustomCursor />

      {/* Subtle vertical grid overlay for dark cinematic theme */}
      <div className="grid-bg" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <main style={{ position: "relative", zIndex: 1, backgroundColor: "var(--bg-0)" }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* <ThroughTheLens /> */}
        <Contact />
      </main>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          display: grid; grid-template-columns: repeat(7, 1fr); opacity: 0.05;
        }
        .grid-bg span {
          border-right: 1px solid var(--off-white);
        }
        .grid-bg span:first-child { border-left: 1px solid var(--off-white); }
      `}} />
    </>
  );
}
