"use client";
import dynamic from "next/dynamic";

// UI (lightweight — load immediately)
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/ui/Navbar";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

// Heavy UI — lazy loaded, client-only
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const FloatingWidgets = dynamic(() => import("@/components/ui/FloatingWidgets"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/ui/ChatBot"), { ssr: false });

// Sections — lazy loaded for faster initial paint
import Hero from "@/components/sections/Hero";
import BrandMarquee from "@/components/sections/BrandMarquee";
const About        = dynamic(() => import("@/components/sections/About"));
const Skills       = dynamic(() => import("@/components/sections/Skills"));
const Experience   = dynamic(() => import("@/components/sections/Experience"));
const Projects     = dynamic(() => import("@/components/sections/Projects"));
const CreativeWorks= dynamic(() => import("@/components/sections/CreativeWorks"));
const PhotoStrip   = dynamic(() => import("@/components/sections/PhotoStrip"));
const Blog         = dynamic(() => import("@/components/sections/Blog"));
const Resume       = dynamic(() => import("@/components/sections/Resume"));
const Contact      = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <ScrollProgressBar />
      <LoadingScreen />
      <CustomCursor />
      <FloatingWidgets />
      <Navbar />

      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <CreativeWorks /> */}
        <PhotoStrip />
        {/* <Blog /> */}
        <Resume />
        <Contact />
      </main>

      <ChatBot />
    </>
  );
}


