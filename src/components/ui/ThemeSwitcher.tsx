"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();
  const isExtrovert = currentTheme === "extrovert";
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip on first visit
  useEffect(() => {
    const seen = localStorage.getItem("theme-toggle-seen");
    if (!seen) {
      setShowTooltip(true);
      const t = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("theme-toggle-seen", "1");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, []);

  const toggle = () => {
    setShowTooltip(false);
    localStorage.setItem("theme-toggle-seen", "1");
    setTheme(isExtrovert ? "minimalist" : "extrovert");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap"
          >
            Switch theme
            {/* arrow */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        title={isExtrovert ? "Switch to Minimalist" : "Switch to Extrovert"}
        className={`w-12 h-6 rounded-full relative flex items-center transition-colors duration-300 focus:outline-none ${
          isExtrovert ? "bg-black border-2 border-black" : "bg-gray-200 border-2 border-gray-300"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`w-4 h-4 rounded-full shadow-sm absolute ${
            isExtrovert ? "bg-yellow-400 left-[22px]" : "bg-white left-[2px]"
          }`}
        />
        {/* labels */}
        <span className={`absolute left-1.5 text-[8px] font-black select-none ${isExtrovert ? "text-yellow-400" : "text-transparent"}`}>E</span>
        <span className={`absolute right-1.5 text-[8px] font-black select-none ${!isExtrovert ? "text-gray-500" : "text-transparent"}`}>M</span>
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
