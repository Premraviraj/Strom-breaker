"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Sparkles, Zap, Palette } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeType } from "../../lib/themes";

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, theme, isTransitioning } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isExtrovert = currentTheme === 'extrovert';

  // Smooth spring animations
  const springConfig = { stiffness: 300, damping: 30 };
  const hoverScale = useSpring(1, springConfig);
  const sliderX = useSpring(isExtrovert ? 40 : 4, springConfig);

  useEffect(() => {
    hoverScale.set(isHovered ? 1.02 : 1);
  }, [isHovered, hoverScale]);

  useEffect(() => {
    sliderX.set(isExtrovert ? 40 : 4);
  }, [isExtrovert, sliderX]);

  const handleThemeToggle = () => {
    if (!isTransitioning) {
      const newTheme: ThemeType = currentTheme === 'minimalist' ? 'extrovert' : 'minimalist';
      setTheme(newTheme);
    }
  };

  return (
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
            width: '80px',
            height: '44px',
            borderRadius: '22px',
            background: isExtrovert 
              ? 'linear-gradient(135deg, #ff0080 0%, #ffff00 100%)' 
              : 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
            border: isExtrovert 
              ? '2px solid rgba(0,0,0,0.2)' 
              : '1px solid rgba(255,255,255,0.1)',
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
                ? 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                : 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
              borderRadius: '22px',
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
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(255,255,255,0.05)',
            }}
          />

          {/* Slider Thumb */}
          <motion.div
            className="absolute top-1 flex items-center justify-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '18px',
              x: sliderX,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: isExtrovert
                ? '0 4px 16px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)'
                : '0 4px 16px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)',
              border: '1px solid rgba(0,0,0,0.1)',
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
                      className="w-5 h-5" 
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
                      className="w-5 h-5" 
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

          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <motion.div
              className="flex items-center gap-1"
              animate={{
                opacity: !isExtrovert ? 1 : 0.4,
                scale: !isExtrovert ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-1 h-1 rounded-full" style={{ 
                background: isExtrovert ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)' 
              }} />
              <span 
                className="text-xs font-medium tracking-wide"
                style={{ color: isExtrovert ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)' }}
              >
                MIN
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1"
              animate={{
                opacity: isExtrovert ? 1 : 0.4,
                scale: isExtrovert ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            >
              <span 
                className="text-xs font-medium tracking-wide"
                style={{ color: isExtrovert ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.4)' }}
              >
                EXT
              </span>
              <div className="w-1 h-1 rounded-full" style={{ 
                background: isExtrovert ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)' 
              }} />
            </motion.div>
          </div>

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
  );
};

export default ThemeSwitcher;