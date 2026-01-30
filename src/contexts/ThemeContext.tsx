"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, themes } from '@/lib/themes';
import RocketTransition from '@/components/animations/RocketTransition';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  theme: typeof themes[ThemeType];
  isTransitioning: boolean;
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

  const setTheme = (theme: ThemeType) => {
    if (theme === currentTheme) return;
    
    // Switch theme immediately
    setCurrentTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Start transition animation to give components time to load
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, theme, isTransitioning }}>
      {children}
      <RocketTransition 
        isVisible={isTransitioning} 
        onComplete={handleTransitionComplete}
      />
    </ThemeContext.Provider>
  );
};