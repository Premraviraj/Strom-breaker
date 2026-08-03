"use client";

import { motion } from "framer-motion";
import SkillsCarousel from "../ui/SkillsCarousel";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const frontendSkills = [
  { name: "React", level: 90, color: "bg-[#0038FF]", textColor: "text-white" },
  { name: "Next.js", level: 85, color: "bg-[#FFE800]", textColor: "text-[#0038FF]" },
  { name: "TypeScript", level: 85, color: "bg-[#062314]", textColor: "text-white" },
  { name: "Tailwind CSS", level: 95, color: "bg-white", textColor: "text-[#062314]" },
  { name: "HTML/CSS", level: 95, color: "bg-[#FF3B30]", textColor: "text-white" },
];

const backendSkills = [
  { name: "Node.js", level: 85, color: "bg-[#0038FF]", textColor: "text-white" },
  { name: "Express", level: 80, color: "bg-white", textColor: "text-[#062314]" },
  { name: "MongoDB", level: 80, color: "bg-[#FFE800]", textColor: "text-[#0038FF]" },
  { name: "PostgreSQL", level: 75, color: "bg-[#062314]", textColor: "text-white" },
  { name: "Python", level: 90, color: "bg-[#FF3B30]", textColor: "text-white" },
];

const aiSkills = [
  { name: "PyTorch", level: 80, color: "bg-[#FFE800]", textColor: "text-[#0038FF]" },
  { name: "TensorFlow", level: 75, color: "bg-[#0038FF]", textColor: "text-white" },
  { name: "OpenCV", level: 85, color: "bg-[#062314]", textColor: "text-white" },
  { name: "NLP", level: 80, color: "bg-white", textColor: "text-[#062314]" },
];

const Skills = () => {
  return (
    <section id="skills" className="w-full relative z-10 py-10">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-huge text-[#062314] mb-4">My Arsenal</h2>
            <div className="h-2 w-24 bg-[#ff3b6b] rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-[#062314]/70 max-w-2xl mx-auto">
              A colorful collection of technologies I use to bring ideas to life.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-col gap-12 overflow-hidden py-10">
          <SkillsCarousel items={frontendSkills} direction="left" speed="normal" />
          <SkillsCarousel items={backendSkills} direction="right" speed="slow" />
          <SkillsCarousel items={aiSkills} direction="left" speed="normal" />
        </div>
      </div>
    </section>
  );
};

export default Skills;