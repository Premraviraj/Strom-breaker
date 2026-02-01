"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, Minimize2, Maximize2 } from "lucide-react";

interface ThemeSelectorProps {
  onThemeSelect: (theme: 'minimalist' | 'extrovert') => void;
}

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  const [hoveredTheme, setHoveredTheme] = useState<'minimalist' | 'extrovert' | null>(null);

  const handleThemeSelect = (theme: 'minimalist' | 'extrovert') => {
    // Store the selection in localStorage to remember user's choice
    localStorage.setItem('portfolio-theme-selected', 'true');
    localStorage.setItem('portfolio-theme', theme);
    onThemeSelect(theme);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Palette className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Choose Your Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the theme that resonates with your style. You can always change it later.
          </p>
        </motion.div>

        {/* Theme Options */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Minimalist Theme */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <motion.button
              onClick={() => handleThemeSelect('minimalist')}
              onHoverStart={() => setHoveredTheme('minimalist')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="w-full group focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Preview Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-white border border-gray-200 shadow-2xl">
                {/* Preview Content */}
                <div className="p-8 h-80">
                  <div className="flex items-center justify-between mb-6">
                    <Minimize2 className="w-8 h-8 text-gray-600" />
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded w-full"></div>
                    <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                    
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="h-16 bg-gray-200 rounded-lg border border-gray-300"></div>
                      <div className="h-16 bg-white rounded-lg border-2 border-gray-800 shadow-md"></div>
                      <div className="h-16 bg-gray-100 rounded-lg border border-gray-300"></div>
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
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-6"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg"
                      >
                        Select Minimalist
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Minimalist Me</h3>
                <p className="text-gray-300">
                  Clean, elegant, and focused. Perfect for a professional and sophisticated look.
                </p>
                <div className="flex justify-center mt-4 space-x-2">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Clean</span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Professional</span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Elegant</span>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Extrovert Theme */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <motion.button
              onClick={() => handleThemeSelect('extrovert')}
              onHoverStart={() => setHoveredTheme('extrovert')}
              onHoverEnd={() => setHoveredTheme(null)}
              className="w-full group focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Preview Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 via-pink-50 to-green-100 border-4 border-black shadow-2xl">
                {/* Preview Content */}
                <div className="p-8 h-80">
                  <div className="flex items-center justify-between mb-6">
                    <Maximize2 className="w-8 h-8 text-black" />
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-pink-400 border-2 border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-black"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 bg-black rounded w-3/4 transform -rotate-1"></div>
                    <div className="h-4 bg-gray-600 rounded w-full transform rotate-1"></div>
                    <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                    
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="h-16 bg-pink-300 rounded-lg border-4 border-black transform rotate-2 shadow-[4px_4px_0px_0px_#000000]"></div>
                      <div className="h-16 bg-yellow-300 rounded-lg border-4 border-black transform -rotate-1 shadow-[4px_4px_0px_0px_#000000]"></div>
                      <div className="h-16 bg-green-300 rounded-lg border-4 border-black transform rotate-1 shadow-[4px_4px_0px_0px_#000000]"></div>
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
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-6"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold border-4 border-black shadow-[4px_4px_0px_0px_#000000] transform -rotate-1"
                      >
                        Select Extrovert
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Extrovert Me</h3>
                <p className="text-gray-300">
                  Bold, colorful, and energetic. Express your creative and vibrant personality.
                </p>
                <div className="flex justify-center mt-4 space-x-2">
                  <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-bold">Bold</span>
                  <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm font-bold">Creative</span>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">Vibrant</span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">You can switch themes anytime using the toggle in the bottom right</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeSelector;