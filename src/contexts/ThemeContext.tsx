"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, themes } from '@/lib/themes';
import ShaderTransition from '@/components/animations/ShaderTransition';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  theme: typeof themes[ThemeType];
  isTransitioning: boolean;
  showThemeSelector: boolean;
  setShowThemeSelector: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('minimalist');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Check if user has visited before and selected a theme
  useEffect(() => {
    // Always show theme selector on every visit
    setShowThemeSelector(true);
  }, []);

  const setTheme = (theme: ThemeType) => {
    // Hide theme selector if it's showing
    if (showThemeSelector) {
      setShowThemeSelector(false);
    }
    
    // Switch theme immediately
    setCurrentTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-theme-selected', 'true');
    
    // Start transition animation to give components time to load
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, theme, isTransitioning, showThemeSelector, setShowThemeSelector }}>
      {children}
      <ShaderTransition 
        isVisible={isTransitioning} 
        onComplete={handleTransitionComplete}
      />
    </ThemeContext.Provider>
  );
};