"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShockwaveScene from "@/components/3d/ShockwaveScene";
import RoomScene from "@/components/3d/RoomScene";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";

const Hero = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  // Choose the appropriate 3D scene based on theme
  const ThreeDScene = isExtrovert ? RoomScene : ShockwaveScene;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-0">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left relative z-10 order-2 lg:order-1"
          >
            {/* Content Container with Tinted Glass Effect */}
            <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-md ${
              isExtrovert 
                ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                : 'bg-white/15 border border-gray-300/30 shadow-lg'
            }`}>
              <motion.div variants={fadeInUp} className="mb-6">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${theme.styles.cardClass} ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : ''
                }`} style={{ color: theme.colors.textSecondary }}>
                  👋 Hello, I'm
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 ${
                  currentTheme === 'minimalist' 
                    ? 'font-bold tracking-tight minimalist-heading' 
                    : 'brutalist-heading'
                }`}
              >
                <span style={{ color: theme.colors.textSecondary }}>Prem R</span>
                <br />
                <span style={{ color: theme.colors.text }}>Full Stack Developer</span>
                <br />
                <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : ''
                }`} style={{ color: theme.colors.textSecondary }}>
                  & AI Enthusiast
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl ${
                  currentTheme === 'minimalist' 
                    ? 'font-medium leading-relaxed minimalist-body' 
                    : 'brutalist-body brutalist-all'
                }`}
                style={{ color: theme.colors.textSecondary }}
              >
                Self-motivated 3rd-year engineering student with professional experience as a 
                Technical Writer Intern at Nokia. Strong foundation in software development, 
                AI/ML, and full-stack web technologies. Always curious, always learning — 
                I thrive in collaborative teams where creativity meets code.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" className={`group ${theme.styles.buttonClass}`} asChild>
                  <a href="/Prem_Resume.pdf" download="Prem_R_Resume.pdf">
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-64 sm:h-80 lg:h-96 order-1 lg:order-2"
          >
            <ThreeDScene />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: theme.colors.textSecondary }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;