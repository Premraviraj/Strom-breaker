"use client";

import { useTheme } from "../../contexts/ThemeContext";
import { useEffect } from "react";
import ShaderBackground from "../3d/ShaderBackground";
import NeoBrutalistScene from "../3d/NeoBrutalistScene";
import ShaderTransition from "../animations/ShaderTransition";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme, currentTheme, isTransitioning, onTransitionComplete } = useTheme();

  useEffect(() => {
    document.body.className = `${theme.styles.backgroundClass} transition-all duration-500`;
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
      {currentTheme === 'minimalist' && <ShaderBackground />}
      {currentTheme === 'extrovert' && <NeoBrutalistScene />}
      <div className={`relative z-10 transition-opacity duration-500 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
      <ShaderTransition isVisible={isTransitioning} onComplete={onTransitionComplete} />
    </div>
  );
};

export default ThemeWrapper;