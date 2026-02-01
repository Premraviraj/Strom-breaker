"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Sparkles, Zap, Palette } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeType } from "../../lib/themes";

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, theme, isTransitioning, showThemeSelector } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isExtrovert = currentTheme === 'extrovert';

  // Smooth spring animations
  const springConfig = { stiffness: 300, damping: 30 };
  const hoverScale = useSpring(1, springConfig);
  const sliderX = useSpring(isExtrovert ? 44 : 4, springConfig);

  useEffect(() => {
    hoverScale.set(isHovered ? 1.02 : 1);
  }, [isHovered, hoverScale]);

  useEffect(() => {
    sliderX.set(isExtrovert ? 44 : 4);
  }, [isExtrovert, sliderX]);

  const handleThemeToggle = () => {
    if (!isTransitioning) {
      const newTheme: ThemeType = currentTheme === 'minimalist' ? 'extrovert' : 'minimalist';
      setTheme(newTheme);
    }
  };

  return (
    <>
      {!showThemeSelector && (
        <div className="fixed bottom-32 sm:bottom-36 right-4 sm:right-8 z-50" ref={containerRef}>
          {/* Main Container */}
          <motion.div
            className="relative"
            style={{ scale: hoverScale }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: isExtrovert 
                  ? 'radial-gradient(circle, rgba(255,0,128,0.4), rgba(255,255,0,0.2), transparent)'
                  : 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)',
                scale: 1.5,
              }}
              animate={{
                opacity: isHovered ? 0.8 : 0.4,
                scale: isHovered ? 1.8 : 1.5,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Switch Container */}
            <motion.button
              onClick={handleThemeToggle}
              disabled={isTransitioning}
              className="relative overflow-hidden cursor-pointer focus:outline-none"
              style={{
                width: '88px',
                height: '48px',
                borderRadius: '24px',
                background: isExtrovert 
                  ? 'linear-gradient(135deg, #ff0080 0%, #ffff00 100%)' 
                  : 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
                border: isExtrovert 
                  ? '3px solid rgba(0,0,0,0.15)' 
                  : '2px solid rgba(255,255,255,0.1)',
                boxShadow: isExtrovert
                  ? '0 8px 32px rgba(255,0,128,0.3), 0 2px 8px rgba(0,0,0,0.2)'
                  : '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: isExtrovert
                    ? 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)'
                    : 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)',
                  borderRadius: '24px',
                }}
                animate={{
                  opacity: isHovered ? 0.3 : 0.1,
                }}
              />

              {/* Slider Track */}
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{
                  background: isExtrovert 
                    ? 'rgba(255,255,255,0.15)' 
                    : 'rgba(255,255,255,0.05)',
                }}
              />

              {/* Side Indicators */}
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                {/* Left Indicator - Minimalist */}
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  animate={{
                    opacity: !isExtrovert ? 0.9 : 0.3,
                    scale: !isExtrovert ? 1.1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: !isExtrovert 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'transparent',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: isExtrovert ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)' 
                    }}
                    animate={{
                      scale: !isExtrovert ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: !isExtrovert ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Right Indicator - Extrovert */}
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  animate={{
                    opacity: isExtrovert ? 0.9 : 0.3,
                    scale: isExtrovert ? 1.1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: isExtrovert 
                      ? 'rgba(0,0,0,0.2)' 
                      : 'transparent',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: isExtrovert ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)' 
                    }}
                    animate={{
                      scale: isExtrovert ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isExtrovert ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Slider Thumb */}
              <motion.div
                className="absolute top-1 flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  x: sliderX,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: isExtrovert
                    ? '0 6px 20px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)'
                    : '0 6px 20px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(0,0,0,0.1)',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Icon Container */}
                <motion.div
                  className="relative"
                  animate={{
                    rotate: isTransitioning ? [0, 360] : 0,
                    scale: isTransitioning ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 1.2, ease: "easeInOut" },
                    scale: { 
                      duration: 0.8, 
                      repeat: isTransitioning ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isExtrovert ? (
                      <motion.div
                        key="extrovert"
                        initial={{ scale: 0, rotate: -90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                      >
                        <Zap 
                          className="w-6 h-6" 
                          style={{ color: '#ff0080' }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="minimalist"
                        initial={{ scale: 0, rotate: -90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                      >
                        <Sparkles 
                          className="w-6 h-6" 
                          style={{ color: '#666666' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Thumb Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isExtrovert 
                      ? 'radial-gradient(circle, rgba(255,0,128,0.3), transparent)'
                      : 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Transition Overlay */}
              <AnimatePresence>
                {isTransitioning && (
                  <motion.div
                    className="absolute inset-0 rounded-full backdrop-blur-sm flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-6 h-6 border-2 border-transparent rounded-full"
                      style={{
                        borderTopColor: isExtrovert ? '#ff0080' : '#ffffff',
                        borderRightColor: isExtrovert ? '#ffff00' : '#ffffff',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced Tooltip */}
            <AnimatePresence>
              {isHovered && !isTransitioning && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-16 right-0 px-4 py-3 rounded-2xl backdrop-blur-xl"
                  style={{
                    background: isExtrovert 
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(0,0,0,0.9)',
                    border: `1px solid ${isExtrovert ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`,
                    boxShadow: isExtrovert
                      ? '0 20px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)'
                      : '0 20px 40px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
                    minWidth: '140px',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 rounded-xl"
                      style={{
                        background: isExtrovert 
                          ? 'linear-gradient(135deg, #ff0080, #ffff00)'
                          : 'linear-gradient(135deg, #333333, #555555)',
                      }}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Palette className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <div 
                        className="text-sm font-semibold"
                        style={{ color: isExtrovert ? '#000000' : '#ffffff' }}
                      >
                        {theme.name}
                      </div>
                      <div 
                        className="text-xs opacity-70"
                        style={{ color: isExtrovert ? '#000000' : '#ffffff' }}
                      >
                        Click to switch
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip Arrow */}
                  <div 
                    className="absolute top-full right-6 w-0 h-0"
                    style={{
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `6px solid ${isExtrovert ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.9)'}`,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{
                background: isExtrovert ? '#00ff80' : '#ffffff',
                boxShadow: isExtrovert 
                  ? '0 0 8px rgba(0,255,128,0.6)'
                  : '0 0 8px rgba(255,255,255,0.6)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ThemeSwitcher;