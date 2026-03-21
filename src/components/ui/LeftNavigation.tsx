"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  Code, 
  Mail,
  Clock,
  FolderOpen
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
    { id: "home",       label: "Welcome",         icon: Home,       href: "#home" },
    { id: "timeline",   label: "My Journey",      icon: Clock,      href: "#timeline" },
    { id: "experience", label: "Work Experience",  icon: Briefcase,  href: "#experience" },
    { id: "skills",     label: "Technical Skills", icon: Code,       href: "#skills" },
    { id: "projects",   label: "My Work",          icon: FolderOpen, href: "#projects" },
    { id: "contact",    label: "Get In Touch",     icon: Mail,       href: "#contact" },
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
            className={`flex gap-3 p-4 ${
              isMobile ? 'flex-row rounded-full' : 'flex-col rounded-2xl'
            } ${isExtrovert ? 'brutalist-all backdrop-blur-xl' : ''}`}
            style={{
              background: isExtrovert 
                ? 'rgba(255,255,255,0.95)'
                : 'linear-gradient(to bottom, #ffffff, #f3f4f6)',
              border: isExtrovert 
                ? '3px solid #000000'
                : '1px solid #d1d5db',
              boxShadow: isExtrovert
                ? '6px 6px 0px 0px #000000'
                : '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)',
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
                          : 'linear-gradient(to bottom, #e5e7eb, #d1d5db)'
                        : isExtrovert
                          ? 'transparent'
                          : 'linear-gradient(to bottom, #f9fafb, #f3f4f6)',
                      color: isActive 
                        ? isExtrovert ? '#000000' : '#1f2937'
                        : isExtrovert 
                          ? '#000000'
                          : '#6b7280',
                      border: isActive && isExtrovert 
                        ? '2px solid #000000'
                        : isActive && !isExtrovert
                          ? '1px solid #9ca3af'
                          : !isExtrovert
                            ? '1px solid #e5e7eb'
                            : 'none',
                      boxShadow: isActive && isExtrovert
                        ? '3px 3px 0px 0px #000000'
                        : isActive && !isExtrovert
                          ? '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)'
                          : !isExtrovert
                            ? '0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                            : 'none',
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: isExtrovert 
                        ? isActive ? '#ffff00' : '#f0f0f0'
                        : undefined,
                      boxShadow: isExtrovert
                        ? undefined
                        : '0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
                      transition: { duration: 0.2 }
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
                          background: isExtrovert ? '#ff0080' : 'linear-gradient(to bottom, #3b82f6, #2563eb)',
                          boxShadow: isExtrovert ? 'none' : '0 1px 3px rgba(59, 130, 246, 0.5)',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}

                    {/* Tooltip - Only show on desktop */}
                    {!isMobile && (
                      <motion.div
                        key={`tooltip-${item.id}-${isActive}`} // Force re-render when active state changes
                        className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
                          isExtrovert ? 'brutalist-all' : ''
                        }`}
                        style={{
                          background: isActive 
                            ? (isExtrovert ? '#ffff00' : 'linear-gradient(to bottom, #e5e7eb, #d1d5db)')
                            : (isExtrovert ? '#ffffff' : 'linear-gradient(to bottom, #ffffff, #f9fafb)'),
                          color: isActive 
                            ? (isExtrovert ? '#000000' : '#1f2937')
                            : (isExtrovert ? '#000000' : '#374151'),
                          border: isExtrovert ? '2px solid #000000' : '1px solid #d1d5db',
                          boxShadow: isExtrovert 
                            ? '3px 3px 0px 0px #000000'
                            : '0 4px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                          zIndex: 1000,
                        }}
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ 
                          opacity: 0,
                          x: -10,
                          scale: 0.8
                        }}
                        whileHover={{ 
                          opacity: 1, 
                          x: 0, 
                          scale: 1,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className={isActive ? 'font-bold' : 'font-medium'}>
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span 
                            className="ml-2 text-xs opacity-75"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            📍 Active
                          </motion.span>
                        )}
                        
                        {/* Tooltip Arrow */}
                        <div 
                          className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0"
                          style={{
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderRight: isActive 
                              ? (isExtrovert ? '6px solid #ffff00' : '6px solid #e5e7eb')
                              : (isExtrovert ? '6px solid #ffffff' : '6px solid #ffffff'),
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
                    : '#d1d5db',
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
                      color: isExtrovert ? '#000000' : '#374151',
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
                        : '#e5e7eb',
                      boxShadow: isExtrovert
                        ? 'none'
                        : 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: isExtrovert 
                          ? 'linear-gradient(90deg, #ff0080, #ffff00, #00ff80)'
                          : 'linear-gradient(90deg, #3b82f6, #2563eb)',
                        boxShadow: isExtrovert
                          ? 'none'
                          : '0 1px 3px rgba(59, 130, 246, 0.5)',
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