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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase('enter');
      setProgress(0);
      
      // Smooth progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1.5; // Slightly slower progress
        });
      }, 40); // Smoother updates

      const morphTimer = setTimeout(() => {
        setAnimationPhase('morph');
      }, 1000);

      const exitTimer = setTimeout(() => {
        setAnimationPhase('exit');
      }, 2500);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3500); // Slightly longer duration

      return () => {
        clearInterval(progressInterval);
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
              if (animationPhase === 'enter') {
                return 'radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)';
              } else if (animationPhase === 'morph') {
                return isMinimalist 
                  ? 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)'
                  : 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 20%, #00ff80 40%, #ff6b9d 60%, #8b5cf6 80%, #ffd93d 100%)';
              } else {
                return isMinimalist
                  ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
                  : 'linear-gradient(135deg, #ff0080 0%, #ffff00 25%, #00ff80 50%, #ff6b9d 75%, #8b5cf6 100%)';
              }
            })()
          }}
        >
          {/* Subtle Particle System */}
          {animationPhase === 'morph' && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: isMinimalist ? '#64748b' : '#ffffff',
                    opacity: 0.6
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              ))}
            </>
          )}

          {/* Central Content */}
          <div className="relative text-center">
            {/* Phase 1: Enter - Theme Announcement */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'enter' ? 1 : 0,
                scale: animationPhase === 'enter' ? 1 : 0.9,
                y: animationPhase === 'enter' ? 0 : -20
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="mb-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: isMinimalist 
                      ? 'linear-gradient(135deg, #64748b, #94a3b8)'
                      : 'linear-gradient(135deg, #ff0080, #ffff00)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white"
                    animate={{
                      scale: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              <h1 
                className="text-4xl font-light mb-3 text-white"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.05em'
                }}
              >
                Switching to
              </h1>
              <p 
                className="text-2xl font-medium text-blue-300"
                style={{ 
                  fontFamily: 'Space Grotesk, monospace'
                }}
              >
                {isMinimalist ? 'Minimalist Mode' : 'Extrovert Mode'}
              </p>
            </motion.div>

            {/* Phase 2: Morph - Transformation */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'morph' ? 1 : 0,
                scale: animationPhase === 'morph' ? 1 : 0.95
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Morphing Logo */}
              <motion.div
                className="mb-8"
                animate={{
                  rotateY: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <div 
                  className="w-20 h-20 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: isMinimalist 
                      ? 'linear-gradient(135deg, #ffffff, #f1f5f9)'
                      : 'linear-gradient(135deg, #ff0080, #ffff00, #00ff80)',
                    borderRadius: isMinimalist ? '12px' : '50%',
                    border: isMinimalist ? '1px solid #e2e8f0' : '3px solid #000000',
                    boxShadow: isMinimalist 
                      ? '0 4px 20px rgba(0,0,0,0.1)'
                      : '6px 6px 0px 0px #000000',
                    transition: 'all 0.6s ease'
                  }}
                >
                  <motion.div
                    className="text-2xl font-bold"
                    style={{
                      color: isMinimalist ? '#64748b' : '#000000'
                    }}
                    animate={{
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut"
                    }}
                  >
                    {isMinimalist ? '◯' : '◆'}
                  </motion.div>
                </div>
              </motion.div>

              {/* Transforming Text */}
              <div className="flex items-center justify-center mb-6">
                {['T', 'R', 'A', 'N', 'S', 'F', 'O', 'R', 'M'].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-3xl font-medium mx-1"
                    style={{ 
                      color: isMinimalist ? '#475569' : '#ffffff',
                      fontFamily: 'Space Grotesk, monospace'
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Subtle Loading Indicator */}
              <div className="flex items-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isMinimalist ? '#94a3b8' : 'rgba(255,255,255,0.8)'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Phase 3: Exit - Completion */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              animate={{
                opacity: animationPhase === 'exit' ? 1 : 0,
                scale: animationPhase === 'exit' ? 1 : 1.05,
                y: animationPhase === 'exit' ? 0 : 20
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="mb-6"
                animate={{
                  scale: [0.8, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <div 
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    background: isMinimalist 
                      ? 'linear-gradient(135deg, #ffffff, #f8fafc)'
                      : 'linear-gradient(135deg, #ff0080, #ffff00)',
                    borderRadius: isMinimalist ? '12px' : '50%',
                    border: isMinimalist ? '1px solid #e2e8f0' : '3px solid #000000',
                    boxShadow: isMinimalist 
                      ? '0 4px 20px rgba(0,0,0,0.1)'
                      : '6px 6px 0px 0px #000000'
                  }}
                >
                  <span 
                    className="text-2xl"
                    style={{
                      color: isMinimalist ? '#64748b' : '#000000'
                    }}
                  >
                    ✓
                  </span>
                </div>
              </motion.div>

              <h1 
                className={`text-3xl mb-3 ${
                  isMinimalist ? 'font-light' : 'font-bold'
                }`}
                style={{ 
                  color: isMinimalist ? '#1e293b' : '#ffffff',
                  fontFamily: isMinimalist ? 'Inter, sans-serif' : 'Inter, sans-serif',
                  letterSpacing: isMinimalist ? '0.02em' : '-0.01em'
                }}
              >
                {isMinimalist ? 'Minimalist Ready' : 'Extrovert Ready'}
              </h1>
              <p 
                className="text-lg opacity-80"
                style={{ 
                  color: isMinimalist ? '#64748b' : 'rgba(255,255,255,0.9)',
                  fontFamily: 'Space Grotesk, monospace'
                }}
              >
                {isMinimalist ? 'Clean • Focused • Elegant' : 'Bold • Vibrant • Dynamic'}
              </p>
            </motion.div>
          </div>

          {/* Refined Progress Bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-4">
              <motion.p
                className="text-sm font-medium"
                style={{
                  color: animationPhase === 'enter' 
                    ? 'rgba(255,255,255,0.8)'
                    : isMinimalist ? '#64748b' : 'rgba(255,255,255,0.9)',
                  fontFamily: 'Space Grotesk, monospace'
                }}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading {isMinimalist ? 'Minimalist' : 'Extrovert'} Interface...
              </motion.p>
            </div>

            {/* Elegant Progress Bar */}
            <div 
              className="w-80 h-1 mx-auto rounded-full overflow-hidden"
              style={{ 
                backgroundColor: animationPhase === 'enter'
                  ? 'rgba(255,255,255,0.2)'
                  : isMinimalist 
                    ? 'rgba(100,116,139,0.2)' 
                    : 'rgba(255,255,255,0.3)'
              }}
            >
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: animationPhase === 'enter'
                    ? 'linear-gradient(90deg, #60a5fa, #a78bfa)'
                    : isMinimalist
                      ? 'linear-gradient(90deg, #64748b, #94a3b8)'
                      : 'linear-gradient(90deg, #ff0080, #ffff00, #00ff80)'
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    filter: 'blur(2px)'
                  }}
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="mt-3 text-center text-xs font-mono"
              style={{
                color: animationPhase === 'enter'
                  ? 'rgba(255,255,255,0.6)'
                  : isMinimalist ? '#94a3b8' : 'rgba(255,255,255,0.7)'
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>

          {/* Theme-specific ambient elements */}
          {animationPhase === 'exit' && (
            <>
              {isMinimalist ? (
                // Minimalist: Subtle grid lines
                <div className="absolute inset-0 opacity-5">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`grid-${i}`}
                      className="absolute bg-slate-400"
                      style={{
                        left: `${i * 12.5}%`,
                        top: 0,
                        bottom: 0,
                        width: '1px'
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              ) : (
                // Extrovert: Floating geometric shapes
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`shape-${i}`}
                      className="absolute"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                        backgroundColor: ['#ff0080', '#ffff00', '#00ff80'][i % 3],
                        borderRadius: i % 2 === 0 ? '50%' : '0%',
                        opacity: 0.7
                      }}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1, 0], 
                        rotate: Math.random() * 360,
                        y: [0, -20, 0]
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
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketTransition;