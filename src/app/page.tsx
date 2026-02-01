"use client";

import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import ThemeWrapper from "@/components/ui/ThemeWrapper";
import LeftNavigation from "@/components/ui/LeftNavigation";

export default function Home() {
  return (
    <ThemeWrapper>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Timeline />
        <Contact />
        <LeftNavigation />
      </main>
    </ThemeWrapper>
  );
}