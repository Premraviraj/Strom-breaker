"use client";

import { useTheme } from "../../contexts/ThemeContext";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ShaderBackground from "../3d/ShaderBackground";
import NeoBrutalistScene from "../3d/NeoBrutalistScene";
import ThemeSelector from "./ThemeSelector";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme, currentTheme, isTransitioning, showThemeSelector, setTheme } = useTheme();

  const handleThemeSelect = (selectedTheme: 'minimalist' | 'extrovert') => {
    setTheme(selectedTheme);
  };

  useEffect(() => {
    // Apply theme styles to document body
    document.body.className = `${theme.styles.backgroundClass} transition-all duration-500`;
    
    // Apply CSS custom properties for theme colors
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-border', theme.colors.border);
  }, [theme]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.styles.backgroundClass} relative`}>
      {/* Theme Selector Overlay */}
      <AnimatePresence>
        {showThemeSelector && (
          <ThemeSelector onThemeSelect={handleThemeSelect} />
        )}
      </AnimatePresence>

      {/* Shader background only for minimalist theme */}
      {currentTheme === 'minimalist' && (
        <ShaderBackground />
      )}
      {/* Neo-brutalist scene for extrovert theme */}
      {currentTheme === 'extrovert' && (
        <NeoBrutalistScene />
      )}
      <div 
        className={`relative z-10 transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeWrapper;