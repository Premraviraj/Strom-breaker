"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Trophy, BookOpen, Briefcase, Code, Sparkles, ChevronDown, CheckCircle } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const timelineItems = [
  {
    year: "Pre-2022",
    title: "The Origin Story",
    org: "Before College",
    description: "A curious kid who loved taking things apart to see how they worked — and occasionally putting them back together. Built first simple programs out of pure curiosity.",
    highlights: ["Self-taught programming basics", "Passionate about how technology works", "Built first programs out of curiosity", "Avid reader of tech blogs"],
    icon: Sparkles,
    bgColor: "#0038FF",
    accentColor: "#FFE800",
  },
  {
    year: "Dec 2022",
    title: "Started B.Tech CSE & AI",
    org: "SVCE, Sriperumbudur",
    description: "Began formal engineering journey in Computer Science and Artificial Intelligence, mastering logic and core programming concepts.",
    highlights: ["Specialisation in AI/ML", "Core CS fundamentals mastered", "First team coding projects", "Built first web applications"],
    icon: GraduationCap,
    bgColor: "#FF3B30",
    accentColor: "#ffffff",
  },
  {
    year: "Feb 2024",
    title: "Smart India Hackathon — Top 30",
    org: "National Competition",
    description: "Developed AI-powered traffic management solution using YOLOv8, CNN, and LSTM, competing against 1000+ teams nationwide. Top 3% nationally.",
    highlights: ["Competed against 1000+ teams", "YOLOv8-based real-time vehicle detection", "CNN for traffic pattern recognition", "LSTM for traffic flow prediction"],
    icon: Trophy,
    bgColor: "#FFE800",
    accentColor: "#0038FF",
  },
  {
    year: "Mar 2024",
    title: "UAV Disaster System Research",
    org: "BEL-IETE Symposium",
    description: "Published research paper on UAVs for disaster identification and alerting systems, integrating AI and IoT aerial vehicle systems.",
    highlights: ["Published at BEL Academy of Excellence", "AI-powered disaster detection", "Integration of IoT sensors with UAV", "Presented at National Symposium"],
    icon: BookOpen,
    bgColor: "#062314",
    accentColor: "#FFE800",
  },
  {
    year: "Feb 2025",
    title: "EcoTravel Platform",
    org: "Sustainable Tourism",
    description: "Built full-stack web application with blockchain technology, custom EcoTokens cryptocurrency rewards, and carbon footprint tracking for eco-friendly travel.",
    highlights: ["Custom EcoTokens cryptocurrency", "Real-time CO2 emissions calculator", "Blockchain Web3 integration", "3D avatar system & gamification"],
    icon: Code,
    bgColor: "#FF3B30",
    accentColor: "#ffffff",
  },
  {
    year: "Oct 2025 – Jul 2026",
    title: "Technical Writer Intern",
    org: "Nokia",
    description: "Created comprehensive API documentation for telecom software products and collaborated with global engineering teams across 3 countries.",
    highlights: ["API docs for 5+ software products", "Cross-team collaboration (3 countries)", "Reduced support tickets by 30%", "New doc standards adopted company-wide"],
    icon: Briefcase,
    bgColor: "#0038FF",
    accentColor: "#FFE800",
  }
];

const Timeline = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="timeline" className="w-full relative z-10 py-10">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <FadeInWhenVisible>
          <div className="mb-20">
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-[#062314] tracking-tighter leading-none">Journey.</h2>
            <div className="h-2 w-32 bg-[#FF3B30] mt-4"></div>
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-col gap-4">
          {timelineItems.map((item, index) => {
            const isOpen = expanded === index;
            const Icon = item.icon;
            return (
              <FadeInWhenVisible key={item.title} delay={index * 0.08}>
                <motion.div
                  layout
                  className="overflow-hidden cursor-pointer"
                  style={{ backgroundColor: item.bgColor }}
                  onClick={() => setExpanded(isOpen ? null : index)}
                >
                  {/* Header Row */}
                  <div className="flex items-center gap-6 p-6 md:p-8">
                    {/* Year badge */}
                    <div
                      className="hidden md:flex items-center justify-center min-w-[120px] h-14 text-lg font-black tracking-wider"
                      style={{ color: item.accentColor }}
                    >
                      {item.year}
                    </div>

                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-14 h-14 flex-shrink-0"
                      style={{ backgroundColor: item.accentColor, color: item.bgColor }}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Title block */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold md:hidden mb-1" style={{ color: item.accentColor }}>
                        {item.year}
                      </p>
                      <h3
                        className="text-2xl md:text-3xl font-black leading-tight tracking-tight"
                        style={{ color: item.accentColor }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-base font-semibold mt-1 opacity-70" style={{ color: item.accentColor }}>
                        {item.org}
                      </p>
                    </div>

                    {/* Expand chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                      style={{ color: item.accentColor }}
                    >
                      <ChevronDown size={32} />
                    </motion.div>
                  </div>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div
                          className="px-6 pb-8 md:px-8 md:pb-10 border-t-2 pt-6 md:pt-8 grid md:grid-cols-2 gap-8 md:gap-12"
                          style={{ borderColor: `${item.accentColor}30` }}
                        >
                          <div>
                            <p
                              className="text-xl md:text-2xl font-medium leading-relaxed"
                              style={{ color: item.accentColor, opacity: 0.9 }}
                            >
                              {item.description}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: item.accentColor, opacity: 0.5 }}>
                              Highlights
                            </p>
                            <ul className="flex flex-col gap-3">
                              {item.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-3">
                                  <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: item.accentColor }} />
                                  <span className="text-base font-medium" style={{ color: item.accentColor, opacity: 0.85 }}>
                                    {h}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;