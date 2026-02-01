"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  MapPin, 
  Mail,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

const ScrollNavigation = () => {
  const { currentTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  const isExtrovert = currentTheme === 'extrovert';

  // All navigation items with descriptive labels
  const allNavItems: NavigationItem[] = [
    { id: "home", label: "Welcome", icon: Home, href: "#home" },
    { id: "about", label: "About Me", icon: User, href: "#about" },
    { id: "experience", label: "Work Experience", icon: Briefcase, href: "#experience" },
    { id: "skills", label: "Technical Skills", icon: Code, href: "#skills" },
    { id: "timeline", label: "My Journey", icon: MapPin, href: "#timeline" },
    { id: "contact", label: "Get In Touch", icon: Mail, href: "#contact" },
  ];

  // Show all navigation items when not in first section
  const getContextualNavItems = (currentSection: string): NavigationItem[] => {
    // Don't show navigation when in first section
    if (currentSection === "home") {
      return [];
    }
    
    // Show ALL sections when in any other section
    return allNavItems;
  };

  // Handle scroll detection and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show navigation when not in first section
      const shouldShow = activeSection !== "home";
      if (shouldShow && !isVisible) {
        setIsVisible(true);
        // Show intro for new users
        setTimeout(() => {
          setShowIntro(true);
          // Auto-hide intro after 4 seconds
          setTimeout(() => setShowIntro(false), 4000);
        }, 500);
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
        setShowIntro(false);
      }
      
      // Detect scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
        setLastScrollY(currentScrollY);
      }

      // Detect active section with improved logic
      const sections = allNavItems.map(item => item.id);
      let currentSection = "home";

      // Special case for bottom of page
      if (currentScrollY + windowHeight >= documentHeight - 100) {
        currentSection = "contact";
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionTop = rect.top + currentScrollY;
            
            if (currentScrollY >= sectionTop - windowHeight * 0.3) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const contextualItems = getContextualNavItems(activeSection);

  return (
    <AnimatePresence>
      {isVisible && contextualItems.length > 0 && (
        <>
          {/* Helpful Introduction Overlay */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed bottom-32 sm:bottom-36 left-1/2 transform -translate-x-1/2 z-50 max-w-sm mx-4"
              >
                <div
                  className={`p-4 rounded-2xl backdrop-blur-xl text-center ${
                    isExtrovert ? 'brutalist-all' : ''
                  }`}
                  style={{
                    background: isExtrovert 
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(0,0,0,0.9)',
                    border: isExtrovert 
                      ? '3px solid #000000'
                      : '1px solid rgba(255,255,255,0.3)',
                    boxShadow: isExtrovert
                      ? '6px 6px 0px 0px #000000'
                      : '0 12px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-2"
                  >
                    <MapPin 
                      className="w-6 h-6 mx-auto"
                      style={{ color: isExtrovert ? '#ff0080' : '#ffffff' }}
                    />
                  </motion.div>
                  <h3 
                    className={`text-sm font-bold mb-2 ${
                      isExtrovert ? 'brutalist-all' : ''
                    }`}
                    style={{ color: isExtrovert ? '#000000' : '#ffffff' }}
                  >
                    🧭 Navigation Guide
                  </h3>
                  <p 
                    className={`text-xs leading-relaxed ${
                      isExtrovert ? 'brutalist-all' : ''
                    }`}
                    style={{ color: isExtrovert ? '#000000' : '#ffffff', opacity: 0.8 }}
                  >
                    Click any icon to jump to that section. The highlighted icon shows where you are now. 
                    Hover for section names!
                  </p>
                  <button
                    onClick={() => setShowIntro(false)}
                    className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                      isExtrovert ? 'brutalist-all' : ''
                    }`}
                    style={{
                      background: isExtrovert ? '#ffff00' : '#333333',
                      color: '#000000',
                      border: isExtrovert ? '2px solid #000000' : 'none',
                    }}
                  >
                    Got it! ✨
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Navigation */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="fixed bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-40 max-w-[90vw]"
          >
            {/* Navigation Container */}
            <motion.div
              className={`flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl max-w-none ${
                isExtrovert ? 'brutalist-all' : ''
              }`}
              style={{
                background: isExtrovert 
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(0,0,0,0.8)',
                border: isExtrovert 
                  ? '3px solid #000000'
                  : '1px solid rgba(255,255,255,0.2)',
                boxShadow: isExtrovert
                  ? '6px 6px 0px 0px #000000'
                  : '0 8px 32px rgba(0,0,0,0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Scroll Direction Indicator */}
              <motion.div
                className="flex items-center justify-center w-10 h-8 rounded-full relative group"
                style={{
                  background: isExtrovert 
                    ? scrollDirection === "up" ? '#00ff80' : '#ff0080'
                    : scrollDirection === "up" ? '#ffffff' : '#666666',
                  color: isExtrovert ? '#000000' : '#000000',
                }}
                animate={{
                  rotate: scrollDirection === "up" ? 0 : 180,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 0.3 },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <ChevronUp className="w-4 h-4" />
                
                {/* Scroll Direction Tooltip */}
                <motion.div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none ${
                    isExtrovert ? 'brutalist-all' : ''
                  }`}
                  style={{
                    background: isExtrovert ? '#ffffff' : 'rgba(0,0,0,0.8)',
                    color: isExtrovert ? '#000000' : '#ffffff',
                    border: isExtrovert ? '2px solid #000000' : 'none',
                    boxShadow: isExtrovert 
                      ? '2px 2px 0px 0px #000000'
                      : '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {scrollDirection === "up" ? "Scrolling Up ⬆️" : "Scrolling Down ⬇️"}
                </motion.div>
              </motion.div>

              {/* Navigation Items */}
              <div className="flex items-center gap-1 overflow-x-auto">
                <AnimatePresence>
                  {contextualItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.id === activeSection;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.href)}
                        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                          isExtrovert ? 'brutalist-all' : ''
                        }`}
                        style={{
                          width: isActive ? '48px' : '40px',
                          height: isActive ? '48px' : '40px',
                          background: isActive 
                            ? isExtrovert 
                              ? '#ffff00'
                              : '#ffffff'
                            : 'transparent',
                          color: isActive 
                            ? '#000000'
                            : isExtrovert 
                              ? '#000000'
                              : '#ffffff',
                          border: isActive && isExtrovert 
                            ? '2px solid #000000'
                            : 'none',
                          boxShadow: isActive && isExtrovert
                            ? '3px 3px 0px 0px #000000'
                            : 'none',
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: isExtrovert 
                            ? isActive ? '#ffff00' : '#f0f0f0'
                            : isActive ? '#ffffff' : 'rgba(255,255,255,0.1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      >
                        <Icon 
                          className={`${isActive ? 'w-5 h-5' : 'w-4 h-4'}`}
                          style={{
                            strokeWidth: isExtrovert ? 2.5 : 2,
                          }}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                            style={{
                              background: isExtrovert ? '#ff0080' : '#ffffff',
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}

                        {/* Direction indicators for non-active items */}
                        {!isActive && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                            style={{
                              background: isExtrovert 
                                ? '#00ff80'
                                : '#666666',
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          >
                            <div className="w-1 h-1 rounded-full bg-black" />
                          </motion.div>
                        )}

                        {/* Enhanced Tooltip with Status */}
                        <motion.div
                          className={`absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none ${
                            isExtrovert ? 'brutalist-all' : ''
                          }`}
                          style={{
                            background: isExtrovert 
                              ? '#ffffff'
                              : 'rgba(0,0,0,0.9)',
                            color: isExtrovert ? '#000000' : '#ffffff',
                            border: isExtrovert ? '2px solid #000000' : 'none',
                            boxShadow: isExtrovert 
                              ? '3px 3px 0px 0px #000000'
                              : '0 6px 20px rgba(0,0,0,0.4)',
                            minWidth: '120px',
                            textAlign: 'center'
                          }}
                          initial={{ opacity: 0, y: 5, scale: 0.8 }}
                          whileHover={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="font-bold">
                            {item.label}
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {isActive 
                              ? "📍 You are here" 
                              : "🔗 Click to visit"
                            }
                          </div>
                          <div 
                            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: '6px solid transparent',
                              borderRight: '6px solid transparent',
                              borderTop: isExtrovert 
                                ? '6px solid #000000'
                                : '6px solid rgba(0,0,0,0.9)',
                            }}
                          />
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Section Counter */}
              <motion.div
                className={`flex items-center justify-center w-10 h-8 rounded-full text-xs font-bold relative group ${
                  isExtrovert ? 'brutalist-all' : ''
                }`}
                style={{
                  background: isExtrovert ? '#ff0080' : '#333333',
                  color: '#ffffff',
                  border: isExtrovert ? '2px solid #000000' : 'none',
                }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {allNavItems.findIndex(item => item.id === activeSection) + 1}/{allNavItems.length}
                
                {/* Section Counter Tooltip */}
                <motion.div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none ${
                    isExtrovert ? 'brutalist-all' : ''
                  }`}
                  style={{
                    background: isExtrovert ? '#ffffff' : 'rgba(0,0,0,0.8)',
                    color: isExtrovert ? '#000000' : '#ffffff',
                    border: isExtrovert ? '2px solid #000000' : 'none',
                    boxShadow: isExtrovert 
                      ? '2px 2px 0px 0px #000000'
                      : '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Section {allNavItems.findIndex(item => item.id === activeSection) + 1} of {allNavItems.length} 📍
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div
              className="absolute -bottom-3 left-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Progress Track */}
              <div
                className="h-1 rounded-full overflow-hidden relative"
                style={{
                  background: isExtrovert 
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(255,255,255,0.2)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isExtrovert 
                      ? 'linear-gradient(90deg, #ff0080, #ffff00, #00ff80)'
                      : 'linear-gradient(90deg, #ffffff, #666666)',
                  }}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((allNavItems.findIndex(item => item.id === activeSection) + 1) / allNavItems.length) * 100}%`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Labels */}
              <div className="flex justify-between mt-1 px-1">
                <span 
                  className={`text-xs font-medium ${isExtrovert ? 'brutalist-all' : ''}`}
                  style={{ 
                    color: isExtrovert ? '#000000' : '#ffffff',
                    opacity: 0.6
                  }}
                >
                  Start
                </span>
                <span 
                  className={`text-xs font-medium ${isExtrovert ? 'brutalist-all' : ''}`}
                  style={{ 
                    color: isExtrovert ? '#000000' : '#ffffff',
                    opacity: 0.6
                  }}
                >
                  {Math.round(((allNavItems.findIndex(item => item.id === activeSection) + 1) / allNavItems.length) * 100)}%
                </span>
                <span 
                  className={`text-xs font-medium ${isExtrovert ? 'brutalist-all' : ''}`}
                  style={{ 
                    color: isExtrovert ? '#000000' : '#ffffff',
                    opacity: 0.6
                  }}
                >
                  End
                </span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavigation;