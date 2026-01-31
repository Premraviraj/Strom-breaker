"use client";

import { motion } from "framer-motion";
import { Code, Brain, Palette, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";
import SkillsCarousel from "../ui/SkillsCarousel";

const Skills = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            {/* Header Container with Tinted Glass */}
            <div className={`inline-block p-4 sm:p-6 rounded-2xl backdrop-blur-md ${
              isExtrovert 
                ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                : 'bg-white/15 border border-gray-300/30 shadow-lg'
            }`}>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl mb-4 ${
                currentTheme === 'minimalist' 
                  ? 'font-bold tracking-tight minimalist-heading' 
                  : 'brutalist-heading'
              }`} style={{ color: theme.colors.text }}>
                Technical <span style={{ color: theme.colors.textSecondary }}>Stack</span>
              </h2>
              <p className={`max-w-2xl mx-auto ${
                currentTheme === 'extrovert' ? 'brutalist-all' : ''
              }`} style={{ color: theme.colors.textSecondary }}>
                Core technologies and frameworks I work with to build modern applications
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <p className={`text-sm ${
              currentTheme === 'extrovert' ? 'brutalist-all' : ''
            }`} style={{ color: theme.colors.textSecondary }}>
              Hover to pause • Linear 3D showcase
            </p>
          </motion.div>

          {/* 3D Skills Carousel */}
          <motion.div variants={fadeInUp} className="mb-16">
            <SkillsCarousel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;