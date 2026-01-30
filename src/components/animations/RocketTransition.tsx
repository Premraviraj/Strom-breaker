"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

interface RocketTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const RocketTransition = ({ isVisible, onComplete }: RocketTransitionProps) => {
  const { theme, currentTheme } = useTheme();
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'morph' | 'exit'>('enter');

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase('enter');
      
      const morphTimer = setTimeout(() => {
        setAnimationPhase('morph');
      }, 1200);

      const exitTimer = setTimeout(() => {
        setAnimationPhase('exit');
      }, 3000);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4500);

      return () => {
        clearTimeout(morphTimer);
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete]);

  const isMinimalist = currentTheme === 'minimalist';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ 
            background: (() => {
              // Show the new theme's background immediately
              const shouldBeColorful = !isMinimalist;
              
              if (animationPhase === 'morph') {
                return isMinimalist 
                  ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e5e5e5 100%)'
                  : 'linear-gradient(135deg, #ff0080 0%, #ffff00 50%, #00ff80 100%)';
              } else {
                return shouldBeColorful
                  ? 'linear-gradient(135deg, #ff0080 0%, #ffff00 50%, #00ff80 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
              }
            })()
          }}
        >
          {/* Morphing Typography */}
          <div className="relative text-center">
            {/* Current Theme Text */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'enter' ? 1 : 0,
                scale: animationPhase === 'enter' ? 1 : 0.8,
                y: animationPhase === 'enter' ? 0 : -50
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 
                className={`text-6xl mb-4 ${
                  isMinimalist ? 'font-light tracking-wider' : 'font-black uppercase'
                }`}
                style={{ 
                  color: !isMinimalist ? '#ffffff' : '#000000',
                  fontFamily: isMinimalist ? 'Inter, sans-serif' : 'Inter, sans-serif',
                  letterSpacing: isMinimalist ? '0.1em' : '-0.02em',
                  textShadow: isMinimalist ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {isMinimalist ? 'Minimalist' : 'Extrovert'}
              </h1>
              <p 
                className={`text-lg ${
                  isMinimalist ? 'font-normal' : 'font-bold'
                }`}
                style={{ 
                  color: !isMinimalist ? '#ffffff' : '#666666',
                  fontFamily: 'Space Grotesk, monospace'
                }}
              >
                {isMinimalist ? 'Clean • Simple • Focused' : 'Bold • Vibrant • Dynamic'}
              </p>
            </motion.div>

            {/* Morphing Animation with Loading Elements */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'morph' ? 1 : 0,
                scale: animationPhase === 'morph' ? 1 : 0.9
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Morphing Letters */}
              <div className="flex items-center justify-center mb-8">
                {['T', 'R', 'A', 'N', 'S', 'F', 'O', 'R', 'M'].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-5xl font-medium"
                    style={{ 
                      color: currentTheme === 'minimalist' ? '#000000' : '#ffffff',
                      fontFamily: 'Space Grotesk, monospace'
                    }}
                    animate={{
                      rotateY: [0, 180, 360],
                      scale: [1, 1.2, 1],
                      color: currentTheme === 'minimalist' 
                        ? ['#000000', '#666666', '#000000']
                        : ['#ffffff', '#ff0080', '#ffffff']
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Loading Dots */}
              <div className="flex items-center justify-center space-x-3 mb-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: currentTheme === 'minimalist' ? '#666666' : '#ffffff'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Loading Text */}
              <motion.p
                className="text-lg font-medium mb-8"
                style={{
                  color: currentTheme === 'minimalist' ? '#666666' : '#ffffff',
                  fontFamily: 'Space Grotesk, monospace'
                }}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading {currentTheme === 'minimalist' ? 'Minimalist' : 'Extrovert'} Components...
              </motion.p>

              {/* Morphing Geometric Elements */}
              <div className="flex space-x-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3"
                    style={{
                      backgroundColor: currentTheme === 'minimalist' ? '#cccccc' : '#ff0080',
                      borderRadius: currentTheme === 'minimalist' ? '50%' : '0%'
                    }}
                    animate={{
                      rotate: [0, 180, 360],
                      borderRadius: currentTheme === 'minimalist' 
                        ? ['0%', '25%', '50%']
                        : ['50%', '25%', '0%'],
                      backgroundColor: currentTheme === 'minimalist'
                        ? ['#ff0080', '#ffff00', '#cccccc']
                        : ['#cccccc', '#666666', '#ff0080']
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Target Theme Text */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'exit' ? 1 : 0,
                scale: animationPhase === 'exit' ? 1 : 1.1,
                y: animationPhase === 'exit' ? 0 : 50
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 
                className={`text-6xl mb-4 ${
                  currentTheme === 'minimalist' ? 'font-light tracking-wider' : 'font-black uppercase'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#000000' : '#ffffff',
                  fontFamily: currentTheme === 'minimalist' ? 'Inter, sans-serif' : 'Inter, sans-serif',
                  letterSpacing: currentTheme === 'minimalist' ? '0.1em' : '-0.02em',
                  textShadow: currentTheme === 'minimalist' ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {currentTheme === 'minimalist' ? 'Minimalist' : 'Extrovert'}
              </h1>
              <p 
                className={`text-lg ${
                  currentTheme === 'minimalist' ? 'font-normal' : 'font-bold'
                }`}
                style={{ 
                  color: currentTheme === 'minimalist' ? '#666666' : '#ffffff',
                  fontFamily: 'Space Grotesk, monospace'
                }}
              >
                {currentTheme === 'minimalist' ? 'Clean • Simple • Focused' : 'Bold • Vibrant • Dynamic'}
              </p>
            </motion.div>
          </div>

          {/* Minimal Floating Elements */}
          {animationPhase === 'morph' && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`float-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    backgroundColor: currentTheme === 'minimalist' ? '#cccccc' : '#ffffff'
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              ))}
            </>
          )}

          {/* Subtle Grid Lines for Minimalist */}
          {currentTheme === 'minimalist' && animationPhase === 'exit' && (
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`grid-v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gray-300"
                  style={{ left: `${i * 10}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`grid-h-${i}`}
                  className="absolute left-0 right-0 h-px bg-gray-300"
                  style={{ top: `${i * 16.66}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              ))}
            </div>
          )}

          {/* Bold Geometric Shapes for Extrovert */}
          {currentTheme === 'extrovert' && animationPhase === 'exit' && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`shape-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    width: `${Math.random() * 40 + 20}px`,
                    height: `${Math.random() * 40 + 20}px`,
                    backgroundColor: ['#ff0080', '#ffff00', '#00ff80'][i % 3],
                    transform: `rotate(${Math.random() * 45}deg)`
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: 1, 
                    rotate: Math.random() * 360,
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              ))}
            </>
          )}

          {/* Enhanced Progress Indicator */}
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Progress Label */}
            <motion.p
              className="text-sm font-medium mb-4"
              style={{
                color: currentTheme === 'minimalist' ? '#666666' : '#ffffff',
                fontFamily: 'Space Grotesk, monospace'
              }}
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Initializing {currentTheme === 'minimalist' ? 'Clean' : 'Bold'} Interface...
            </motion.p>

            {/* Progress Bar Container */}
            <div 
              className="w-64 h-2 mx-auto rounded-full overflow-hidden shadow-inner"
              style={{ 
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(0,0,0,0.1)' 
                  : 'rgba(255,255,255,0.2)',
                boxShadow: currentTheme === 'minimalist'
                  ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  : 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: currentTheme === 'minimalist'
                    ? 'linear-gradient(90deg, #000000, #666666)'
                    : 'linear-gradient(90deg, #ff0080, #ffff00, #00ff80)'
                }}
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            {/* Percentage Counter */}
            <motion.div
              className="mt-3 text-xs font-mono"
              style={{
                color: currentTheme === 'minimalist' ? '#999999' : 'rgba(255,255,255,0.8)'
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {animationPhase === 'enter' && '25%'}
                {animationPhase === 'morph' && '75%'}
                {animationPhase === 'exit' && '100%'}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketTransition;