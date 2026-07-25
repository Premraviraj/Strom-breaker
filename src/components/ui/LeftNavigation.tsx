"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code2, Briefcase, Mail } from "lucide-react";

const sections = [
  { id: "hero", icon: User, label: "Profile" },
  { id: "timeline", icon: Briefcase, label: "Journey" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: Code2, label: "Work" },
  { id: "aakrit", icon: Code2, label: "Aakrit" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const LeftNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="relative group flex items-center"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? "#ff3b6b" : "#e2e8f0",
              }}
              className="w-3 h-3 rounded-full transition-colors duration-300 shadow-sm"
            />

            {/* Tooltip */}
            <div className={`absolute left-8 px-3 py-1 bg-white text-[#062314] text-xs font-bold rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 pointer-events-none
              ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}
            `}>
              {section.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default LeftNavigation;