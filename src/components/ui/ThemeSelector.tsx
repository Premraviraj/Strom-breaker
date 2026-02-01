"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2, Maximize2 } from "lucide-react";
import LionAnimation from "../3d/LionAnimation";

interface ThemeSelectorProps {
  onThemeSelect: (theme: 'minimalist' | 'extrovert') => void;
}

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  const [hoveredTheme, setHoveredTheme] = useState<'minimalist' | 'extrovert' | null>(null);

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%)'
      }}
    >
      {/* Lion Animation - Top Half */}
      <div className="flex-1 w-full relative">
        <LionAnimation className="w-full h-full" />
        
        {/* Lion Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
        >
          <div className="bg-black/70 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
            <p className="text-white text-sm font-medium">
              🖱️ Press and drag to create wind • The lion will react to your movements
            </p>
          </div>
        </motion.div>
      </div>

      {/* Theme Selection - Bottom Half */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4">
        {/* Theme Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          
          {/* Minimalist Theme Button */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <motion.button
              onClick={() => handleThemeSelect('minimalist')}
              onHoverStart={() => setHoveredTheme('minimalist')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 w-48 h-32 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minimize2 className="w-8 h-8 text-white mb-3" />
              <span className="text-white font-semibold text-lg">Minimalist</span>
              <span className="text-gray-300 text-xs mt-1">Clean & Simple</span>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTheme === 'minimalist' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap border border-white/20"
                >
                  Click to choose clean, minimal design
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Extrovert Theme Button */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <motion.button
              onClick={() => handleThemeSelect('extrovert')}
              onHoverStart={() => setHoveredTheme('extrovert')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="relative bg-gradient-to-br from-pink-500/20 via-yellow-500/20 to-green-500/20 backdrop-blur-md border-2 border-white/40 rounded-2xl p-6 w-48 h-32 flex flex-col items-center justify-center transition-all duration-300 hover:from-pink-500/30 hover:via-yellow-500/30 hover:to-green-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transform -rotate-1"
              whileHover={{ scale: 1.05, y: -5, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 className="w-8 h-8 text-white mb-3" />
              <span className="text-white font-bold text-lg">Extrovert</span>
              <span className="text-gray-200 text-xs mt-1">Bold & Colorful</span>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTheme === 'extrovert' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap border border-white/20"
                >
                  Click to choose vibrant, bold design
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Instructions Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center max-w-md"
        >
          <h3 className="text-white text-xl font-bold mb-2">Choose Your Style</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Select a theme that matches your personality. You can always change it later in the portfolio.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeSelector;