"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code2, Briefcase, Mail, Layers, Rocket } from "lucide-react";

const sections = [
  { id: "hero",       icon: User,      label: "Profile",  color: "#0038FF" }, // Blue
  { id: "skills",     icon: Code2,     label: "Arsenal",  color: "#FF3B30" }, // Red
  { id: "timeline",   icon: Briefcase, label: "Journey",  color: "#10b981" }, // Emerald
  { id: "experience", icon: Layers,    label: "Work",     color: "#8b5cf6" }, // Purple
  { id: "projects",   icon: Code2,     label: "Projects", color: "#eab308" }, // Gold
  { id: "aakrit",     icon: Rocket,    label: "Aakrit",   color: "#f97316" }, // Orange
  { id: "contact",    icon: Mail,      label: "Contact",  color: "#062314" }, // Dark Green
];

const LeftNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center">
      {/* Sleek Floating Glass Capsule */}
      <div className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-xl border border-[#062314]/5 p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hovered === section.id;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isActive ? section.color : isHovered ? `${section.color}1A` : "transparent",
                color: isActive ? "#ffffff" : isHovered ? section.color : "#062314",
                opacity: isActive || isHovered ? 1 : 0.45
              }}
              aria-label={section.label}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />

              {/* Minimal Tooltip */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-[calc(100%+14px)] px-3 py-1.5 bg-[#062314] text-white text-[10px] font-black tracking-[0.15em] uppercase rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
                  >
                    {section.label}
                    {/* Tiny triangle arrow pointing left */}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[4px] border-t-transparent border-b-transparent border-r-[#062314]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LeftNavigation;