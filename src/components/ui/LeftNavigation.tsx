"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code2, Briefcase, Mail, Rocket, Layers } from "lucide-react";

const sections = [
  { id: "hero",       icon: User,     label: "Profile",    color: "#0038FF" },
  { id: "skills",     icon: Code2,    label: "Arsenal",    color: "#FF3B30" },
  { id: "timeline",   icon: Briefcase,label: "Journey",    color: "#FFE800" },
  { id: "experience", icon: Layers,   label: "Work",       color: "#0038FF" },
  { id: "projects",   icon: Code2,    label: "Projects",   color: "#FF3B30" },
  { id: "aakrit",     icon: Rocket,   label: "Aakrit",     color: "#f97316" },
  { id: "contact",    icon: Mail,     label: "Contact",    color: "#062314" },
];

const LeftNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      if (window.scrollY < 80) { setActiveSection("hero"); return; }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex   = sections.findIndex(s => s.id === activeSection);
  const activeColor   = sections[activeIndex]?.color ?? "#0038FF";

  return (
    /* Hidden on mobile and tablet — only shows on xl+ */
    <div className="fixed left-0 top-0 bottom-0 z-40 hidden xl:flex flex-col items-center justify-center pointer-events-none">

      {/* The sidebar rail itself */}
      <div
        className="relative flex flex-col items-center gap-0 pointer-events-auto"
        style={{ width: 64 }}
      >
        {/* Vertical track line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: "rgba(6,35,20,0.07)" }}
        />

        {/* Animated progress fill */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full origin-top"
          style={{ background: activeColor }}
          animate={{ height: `${((activeIndex + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {sections.map((section, i) => {
          const isActive  = activeSection === section.id;
          const isHovered = hovered === section.id;
          const Icon      = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center justify-center z-10"
              style={{ width: 64, height: 64 }}
              aria-label={section.label}
            >
              {/* Dot */}
              <motion.div
                className="relative flex items-center justify-center rounded-full transition-shadow"
                animate={{
                  width:  isActive ? 36 : isHovered ? 30 : 10,
                  height: isActive ? 36 : isHovered ? 30 : 10,
                  backgroundColor: isActive || isHovered ? section.color : "rgba(6,35,20,0.12)",
                  boxShadow: isActive
                    ? `0 0 0 4px ${section.color}22, 0 4px 16px ${section.color}40`
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Icon size={isActive ? 16 : 14} color="white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Tooltip label */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-full ml-3 px-3 py-1.5 rounded-xl text-xs font-black tracking-wide whitespace-nowrap pointer-events-none shadow-lg"
                    style={{
                      backgroundColor: section.color,
                      color: section.color === "#FFE800" ? "#062314" : "#fff",
                    }}
                  >
                    {section.label}
                    {/* Arrow */}
                    <span
                      className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-t-transparent border-b-transparent"
                      style={{ borderRightColor: section.color }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Section index mark */}
              {!isActive && !isHovered && (
                <span
                  className="absolute -right-1 text-[8px] font-black opacity-20"
                  style={{ color: "#062314", top: "50%", transform: "translateY(-50%)" }}
                >
                  0{i + 1}
                </span>
              )}
            </button>
          );
        })}

        {/* Bottom — initials badge */}
        <div
          className="mt-6 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md"
          style={{ backgroundColor: "#062314" }}
        >
          PR
        </div>
      </div>
    </div>
  );
};

export default LeftNavigation;