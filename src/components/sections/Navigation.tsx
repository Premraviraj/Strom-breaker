"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Premraviraj", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/prem-r", label: "LinkedIn" },
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
            : `${theme.styles.cardClass} backdrop-blur-md`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${
          !scrolled && currentTheme === 'minimalist' 
            ? 'bg-white/15 backdrop-blur-md rounded-lg mt-4 px-6 border border-gray-300/30 shadow-lg' 
            : ''
        }`}>
          {/* Logo/Name - Aligned with Hero content */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold ${theme.styles.headerClass}`}
            style={{ color: theme.colors.text }}
          >
            Prem R
          </motion.div>

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
                  color: theme.colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.textSecondary;
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