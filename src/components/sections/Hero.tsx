"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShockwaveScene from "@/components/3d/ShockwaveScene";
import RoomScene from "@/components/3d/RoomScene";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";

const Hero = () => {
  const { currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  // Choose the appropriate 3D scene based on theme
  const ThreeDScene = isExtrovert ? RoomScene : ShockwaveScene;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
          
          {/* Left side - Content Card */}
          <div className="order-1 lg:order-1 relative z-30">
            {/* Main Content Card - Theme Responsive with Very Light Tinted Background */}
            <motion.div 
              className={`p-8 sm:p-10 lg:p-12 shadow-none max-w-lg mx-auto lg:mx-0 backdrop-blur-lg ${
                currentTheme === 'minimalist' 
                  ? 'bg-white/30 border border-gray-200/30 rounded-2xl' 
                  : 'bg-white/40 border-4 border-black/70 rounded-2xl'
              }`}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              {/* Header Badge */}
              <motion.div 
                className={`inline-block px-4 py-2 text-sm font-medium mb-6 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-blue-100/70 text-blue-800 rounded-full backdrop-blur-sm' 
                    : 'bg-black/80 text-white rounded-full backdrop-blur-sm'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Hello, I'm
              </motion.div>

              {/* Name */}
              <motion.h1 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${
                  currentTheme === 'minimalist' ? 'minimalist-heading' : 'brutalist-heading'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#1e293b' : '#000000',
                  fontWeight: currentTheme === 'minimalist' ? '700' : '900',
                  textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                  letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: currentTheme === 'minimalist' 
                    ? "0px 0px 8px rgba(59, 130, 246, 0.3)"
                    : "3px 3px 0px rgba(0,0,0,0.2)",
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentTheme === 'minimalist' ? 'Prem R' : 'PREM R'}
              </motion.h1>
              
              {/* Title */}
              <motion.h2 
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
                  currentTheme === 'minimalist' ? 'minimalist-subheading' : 'brutalist-subheading'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#1e293b' : '#000000',
                  fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                  textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                  letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                }}
                whileHover={{ 
                  x: 5,
                  color: currentTheme === 'minimalist' ? '#3b82f6' : '#000000',
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {currentTheme === 'minimalist' ? 'Full Stack Web Developer' : 'FULL STACK WEB DEVELOPER'}
              </motion.h2>

              {/* Subtitle */}
              <motion.p 
                className={`text-lg sm:text-xl font-medium mb-6 ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#64748b' : '#000000',
                  fontWeight: currentTheme === 'minimalist' ? '500' : '900',
                  textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                  letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                }}
                whileHover={{ 
                  x: 3,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {currentTheme === 'minimalist' ? '& AI Enthusiast' : '& AI ENTHUSIAST'}
              </motion.p>

              {/* Description */}
              <motion.p 
                className={`text-base leading-relaxed mb-8 ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#475569' : '#000000',
                  fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                }}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Self-motivated 4th-year engineering student with professional experience as a Technical Writer intern at Nokia. Strong foundation in software development, AI/ML, and full-stack web technologies. Always curious, always learning — I thrive in collaborative teams where creativity meets code.
              </motion.p>

              {/* CTA Button */}
              <motion.button
                className={`transition-all duration-300 text-sm flex items-center gap-2 px-6 py-3 font-bold ${
                  currentTheme === 'minimalist'
                    ? 'bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg border-2 border-black shadow-none'
                } ${currentTheme === 'extrovert' ? 'brutalist-all uppercase' : ''}`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: currentTheme === 'minimalist' 
                    ? "0 10px 25px rgba(0,0,0,0.2)"
                    : "6px 6px 0px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  y: 0,
                  transition: { duration: 0.1 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Prem_Resume.pdf';
                  link.download = 'Prem_Resume.pdf';
                  link.click();
                }}
              >
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ 
                    y: [0, -2, 0],
                    transition: { duration: 0.5, repeat: Infinity }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                {currentTheme === 'minimalist' ? 'Download Resume' : 'DOWNLOAD RESUME'}
              </motion.button>
            </motion.div>
          </div>

          {/* Right side - 3D Scene */}
          <motion.div 
            className="h-80 sm:h-96 lg:h-[600px] order-2 lg:order-2 relative z-10"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              rotate: 1,
              transition: { duration: 0.5 }
            }}
          >
            {/* Main 3D Scene */}
            <div className="w-full h-full relative z-10">
              <ThreeDScene />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;