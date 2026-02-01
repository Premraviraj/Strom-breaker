"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Briefcase, 
  Code, 
  MapPin, 
  Mail
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

const LeftNavigation = () => {
  const { currentTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isExtrovert = currentTheme === 'extrovert';

  // All navigation items
  const allNavItems: NavigationItem[] = [
    { id: "home", label: "Welcome", icon: Home, href: "#home" },
    { id: "about", label: "About Me", icon: User, href: "#about" },
    { id: "experience", label: "Work Experience", icon: Briefcase, href: "#experience" },
    { id: "skills", label: "Technical Skills", icon: Code, href: "#skills" },
    { id: "timeline", label: "My Journey", icon: MapPin, href: "#timeline" },
    { id: "contact", label: "Get In Touch", icon: Mail, href: "#contact" },
  ];

  // Detect mobile device
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle scroll detection and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Detect active section
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
      
      // Show navigation when not in first section
      const shouldShow = currentSection !== "home";
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            x: isMobile ? 0 : -100, 
            y: isMobile ? 100 : 0, 
            opacity: 0 
          }}
          animate={{ 
            x: 0, 
            y: 0, 
            opacity: 1 
          }}
          exit={{ 
            x: isMobile ? 0 : -100, 
            y: isMobile ? 100 : 0, 
            opacity: 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.3 }
          }}
          className={`fixed z-40 ${
            isMobile 
              ? 'bottom-4 left-1/2 transform -translate-x-1/2' 
              : 'left-4 top-1/2 transform -translate-y-1/2'
          }`}
        >
          {/* Navigation Container */}
          <motion.div
            className={`flex gap-3 p-4 backdrop-blur-xl ${
              isMobile ? 'flex-row rounded-full' : 'flex-col rounded-2xl'
            } ${isExtrovert ? 'brutalist-all' : ''}`}
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
            {/* Navigation Items */}
            <AnimatePresence>
              {allNavItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = item.id === activeSection;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative flex items-center justify-center rounded-full transition-all duration-300 group ${
                      isExtrovert ? 'brutalist-all' : ''
                    }`}
                    style={{
                      width: isMobile ? '44px' : '48px',
                      height: isMobile ? '44px' : '48px',
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
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Icon 
                      className={isMobile ? "w-4 h-4" : "w-5 h-5"}
                      style={{
                        strokeWidth: isExtrovert ? 2.5 : 2,
                      }}
                    />

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className={`absolute w-2 h-2 rounded-full ${
                          isMobile 
                            ? '-bottom-1 left-1/2 transform -translate-x-1/2' 
                            : '-right-1 top-1/2 transform -translate-y-1/2'
                        }`}
                        style={{
                          background: isExtrovert ? '#ff0080' : '#ffffff',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}

                    {/* Tooltip - Only show on desktop */}
                    {!isMobile && (
                      <motion.div
                        className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
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
                        }}
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        whileHover={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                        {isActive && (
                          <span className="ml-2 text-xs opacity-75">
                            📍 Current
                          </span>
                        )}
                        
                        {/* Tooltip Arrow */}
                        <div 
                          className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0"
                          style={{
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderRight: isExtrovert 
                              ? '6px solid #000000'
                              : '6px solid rgba(0,0,0,0.9)',
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>

            {/* Progress Indicator - Only show on desktop */}
            {!isMobile && (
              <motion.div
                className="mt-2 pt-3 border-t"
                style={{
                  borderColor: isExtrovert 
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(255,255,255,0.2)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center">
                  <div 
                    className={`text-xs font-bold mb-1 ${
                      isExtrovert ? 'brutalist-all' : ''
                    }`}
                    style={{ 
                      color: isExtrovert ? '#000000' : '#ffffff',
                    }}
                  >
                    {allNavItems.findIndex(item => item.id === activeSection) + 1}/{allNavItems.length}
                  </div>
                  
                  {/* Progress Bar */}
                  <div
                    className="h-1 rounded-full overflow-hidden relative w-12 mx-auto"
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
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeftNavigation;