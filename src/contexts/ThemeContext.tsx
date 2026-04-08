"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, themes } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  theme: typeof themes[ThemeType];
  isTransitioning: boolean;
  onTransitionComplete: () => void;
  showThemeSelector: boolean;
  setShowThemeSelector: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('extrovert');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as ThemeType;
    if (saved === 'minimalist' || saved === 'extrovert') {
      setCurrentTheme(saved);
    }
  }, []);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => setIsTransitioning(false);

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      theme,
      isTransitioning,
      onTransitionComplete: handleTransitionComplete,
      showThemeSelector: false,
      setShowThemeSelector: () => {},
    }}>
      {children}
    </ThemeContext.Provider>
  );
};