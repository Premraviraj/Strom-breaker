"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showName, setShowName] = useState(false);
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.3; // Show name after scrolling 30% of viewport
      
      setScrolled(scrollPosition > 50);
      setShowName(scrollPosition > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "About", href: "#about" },
    { label: "My Journey", href: "#timeline" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Premraviraj", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/prem-r-8b8337247/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/thenarratorwithinsomnia", label: "Instagram" },
    { icon: Mail, href: "mailto:Premraviraj0906@gmail.com", label: "Email" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isExtrovert
            ? 'bg-white/95 border-b-4 border-black shadow-[0_4px_0px_0px_#000000] backdrop-blur-md'
            : 'bg-black/80 backdrop-blur-md border-b border-white/20'
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name - Shows only when scrolled */}
          <div className="flex items-center">
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-bold ${
                    currentTheme === 'extrovert' ? 'brutalist-heading' : 'minimalist-heading'
                  }`}
                  style={{ 
                    color: scrolled 
                      ? (isExtrovert ? '#000000' : '#ffffff')
                      : theme.colors.text,
                    fontWeight: currentTheme === 'minimalist' ? '700' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {currentTheme === 'minimalist' ? 'Prem R' : 'PREM R'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="transition-colors duration-200"
                style={{ 
                  color: scrolled 
                    ? (isExtrovert ? '#666666' : '#cccccc')
                    : theme.colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled 
                    ? (isExtrovert ? '#000000' : '#ffffff')
                    : theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled 
                    ? (isExtrovert ? '#666666' : '#cccccc')
                    : theme.colors.textSecondary;
                }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;