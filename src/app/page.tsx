"use client";

import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Aakrit from "@/components/sections/Aakrit";
import Contact from "@/components/sections/Contact";
import LeftNavigation from "../components/ui/LeftNavigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-[#0038FF] selection:text-white">
      {/* Top navbar */}
      <Navigation />

      {/* Left sidebar — only rendered on xl+ via its own CSS */}
      <LeftNavigation />

      {/* Page content — padded left on xl to make room for the sidebar */}
      <div className="xl:pl-16">

        {/* Hero — full viewport */}
        <Hero />

        {/* Content sections — consistent horizontal padding & vertical gaps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 md:gap-32 pb-0">
          <Skills />
          <Timeline />
          <Experience />
          <Projects />
        </div>

        {/* Full-bleed sections */}
        <Aakrit />
        <Contact />
      </div>
    </main>
  );
}