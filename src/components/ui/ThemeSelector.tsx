"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, Minimize2, Maximize2, Zap, Star } from "lucide-react";

interface ThemeSelectorProps {
  onThemeSelect: (theme: 'minimalist' | 'extrovert') => void;
}

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  const [hoveredTheme, setHoveredTheme] = useState<'minimalist' | 'extrovert' | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleThemeSelect = (theme: 'minimalist' | 'extrovert') => {
    localStorage.setItem('portfolio-theme-selected', 'true');
    localStorage.setItem('portfolio-theme', theme);
    onThemeSelect(theme);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4"
      style={{
        background: 'radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%)'
      }}
    >
      {/* Simplified Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles - Reduced for mobile */}
        {particles.slice(0, 15).map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: `hsl(${Math.random() * 360}, 60%, 60%)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}

        {/* Simplified Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Compact Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-center mb-4 sm:mb-6"
        >
          {/* Smaller Icon Container */}
          <motion.div
            className="relative inline-block mb-3 sm:mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #6366f1, #ec4899, #10b981, #f59e0b, #6366f1)',
                filter: 'blur(10px)',
                opacity: 0.5
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl rounded-full p-3 sm:p-4 border border-white/20 shadow-lg"
              animate={{ 
                rotate: [0, 3, -3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="text-white">Experience</span>
          </motion.h1>
          
          <motion.p 
            className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Select the theme that resonates with your personality.
            <span className="text-blue-400 font-medium"> Each choice creates a unique journey.</span>
          </motion.p>
        </motion.div>

        {/* Compact Theme Cards - Taller and Narrower */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-4xl mx-auto">
          {/* Minimalist Theme - Compact */}
          <motion.div
            initial={{ x: -100, opacity: 0, rotateY: -15 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 15 }}
            className="relative group perspective-1000"
          >
            <motion.button
              onClick={() => handleThemeSelect('minimalist')}
              onHoverStart={() => setHoveredTheme('minimalist')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="w-full focus:outline-none cursor-pointer"
              whileHover={{ 
                scale: 1.03,
                rotateY: 5,
                z: 30
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Compact Card Container */}
              <div className="relative transform-gpu transition-all duration-500 group-hover:shadow-xl">
                {/* Subtle Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
                    filter: 'blur(8px)'
                  }}
                />
                
                {/* Main Card - Smaller */}
                <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-200/50 backdrop-blur-xl overflow-hidden shadow-lg">
                  {/* Subtle Pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(0,0,0,0.15) 1px, transparent 0)',
                      backgroundSize: '30px 30px'
                    }}
                  />
                  
                  {/* Compact Content */}
                  <div className="relative p-4 sm:p-6 h-40 sm:h-48">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      </motion.div>
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                      </div>
                    </div>
                    
                    {/* Preview Elements */}
                    <div className="space-y-3">
                      <motion.div 
                        className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg w-3/4"
                        whileHover={{ scale: 1.01 }}
                      />
                      <motion.div 
                        className="h-2.5 bg-gradient-to-r from-gray-400 to-gray-500 rounded w-full"
                        whileHover={{ scale: 1.01 }}
                      />
                      <motion.div 
                        className="h-2.5 bg-gradient-to-r from-gray-400 to-gray-500 rounded w-2/3"
                        whileHover={{ scale: 1.01 }}
                      />
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-8 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 shadow-sm"
                            whileHover={{ 
                              scale: 1.05,
                              rotate: i % 2 === 0 ? 2 : -2
                            }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredTheme === 'minimalist' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent flex items-end justify-center pb-4"
                      >
                        <motion.div
                          initial={{ y: 15, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-semibold shadow-lg border border-white/50 text-sm"
                        >
                          <span className="flex items-center space-x-2">
                            <Star className="w-3 h-3" />
                            <span>Select Minimalist</span>
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Compact Theme Info */}
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Minimalist Me
                  </span>
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 leading-relaxed">
                  Clean, elegant, and focused. Perfect for a professional experience.
                </p>
                <div className="flex justify-center space-x-2 flex-wrap gap-y-1">
                  {['Clean', 'Professional', 'Elegant'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-gray-300 rounded-lg text-xs border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Extrovert Theme - Compact */}
          <motion.div
            initial={{ x: 100, opacity: 0, rotateY: 15 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 15 }}
            className="relative group perspective-1000"
          >
            <motion.button
              onClick={() => handleThemeSelect('extrovert')}
              onHoverStart={() => setHoveredTheme('extrovert')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="w-full focus:outline-none cursor-pointer"
              whileHover={{ 
                scale: 1.03,
                rotateY: -5,
                z: 30
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Compact Card Container */}
              <div className="relative transform-gpu transition-all duration-500 group-hover:shadow-xl">
                {/* Colorful Glow Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.4), rgba(251, 191, 36, 0.4), rgba(16, 185, 129, 0.4))',
                    filter: 'blur(8px)'
                  }}
                />
                
                {/* Main Card - Neo-Brutalist but Smaller */}
                <div className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-green-50 rounded-xl border-3 border-black backdrop-blur-xl overflow-hidden shadow-lg">
                  {/* Bold Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-3 left-3 w-4 h-4 bg-black transform rotate-45" />
                    <div className="absolute top-8 right-4 w-3 h-3 bg-black rounded-full" />
                    <div className="absolute bottom-8 left-4 w-2 h-6 bg-black transform rotate-12" />
                    <div className="absolute bottom-3 right-3 w-5 h-2 bg-black transform rotate-45" />
                  </div>
                  
                  {/* Compact Content */}
                  <div className="relative p-4 sm:p-6 h-40 sm:h-48">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </motion.div>
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-400 border-2 border-black"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-black"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-black"></div>
                      </div>
                    </div>
                    
                    {/* Bold Preview Elements */}
                    <div className="space-y-3">
                      <motion.div 
                        className="h-4 bg-black rounded-lg w-3/4 transform -rotate-1 shadow-[2px_2px_0px_0px_#000000]"
                        whileHover={{ scale: 1.01, rotate: 1 }}
                      />
                      <motion.div 
                        className="h-2.5 bg-gray-700 rounded w-full transform rotate-1 shadow-[1px_1px_0px_0px_#000000]"
                        whileHover={{ scale: 1.01, rotate: -1 }}
                      />
                      <motion.div 
                        className="h-2.5 bg-gray-700 rounded w-2/3 shadow-[1px_1px_0px_0px_#000000]"
                        whileHover={{ scale: 1.01 }}
                      />
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {[
                          { bg: 'bg-pink-300', rotate: 'rotate-2' },
                          { bg: 'bg-yellow-300', rotate: '-rotate-1' },
                          { bg: 'bg-green-300', rotate: 'rotate-1' }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            className={`h-8 sm:h-10 ${item.bg} rounded-lg border-3 border-black transform ${item.rotate} shadow-[3px_3px_0px_0px_#000000]`}
                            whileHover={{ 
                              scale: 1.05,
                              rotate: i % 2 === 0 ? 5 : -5,
                              y: -2
                            }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredTheme === 'extrovert' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent flex items-end justify-center pb-4"
                      >
                        <motion.div
                          initial={{ y: 15, opacity: 0, scale: 0.9, rotate: -3 }}
                          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold border-3 border-black shadow-[3px_3px_0px_0px_#000000] transform -rotate-1 text-sm"
                        >
                          <span className="flex items-center space-x-2">
                            <Zap className="w-3 h-3" />
                            <span>Select Extrovert</span>
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Compact Theme Info */}
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                    Extrovert Me
                  </span>
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 leading-relaxed">
                  Bold, colorful, and energetic. Express your vibrant personality.
                </p>
                <div className="flex justify-center space-x-2 flex-wrap gap-y-1">
                  {[
                    { text: 'Bold', color: 'from-pink-500 to-pink-600' },
                    { text: 'Creative', color: 'from-yellow-500 to-yellow-600' },
                    { text: 'Vibrant', color: 'from-green-500 to-green-600' }
                  ].map((tag, i) => (
                    <motion.span
                      key={tag.text}
                      className={`px-3 py-1.5 bg-gradient-to-r ${tag.color} text-white rounded-lg text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000000]`}
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: i % 2 === 0 ? 2 : -2,
                        y: -1
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      {tag.text}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Compact Footer */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-gray-300 text-xs sm:text-sm font-medium">
              You can switch themes anytime using the toggle
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeSelector;