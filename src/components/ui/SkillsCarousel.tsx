"use client";

import { useState, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface Skill {
  name: string;
  logoUrl: string;
  color: string;
  category: string;
}

const SkillsCarousel = () => {
  const { theme, currentTheme } = useTheme();
  const [isPaused, setIsPaused] = useState(false);

  // Focus on core programming languages and frameworks with actual logos
  const skills: Skill[] = [
    {
      name: "Python",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776AB",
      category: "Language"
    },
    {
      name: "JavaScript",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
      category: "Language"
    },
    {
      name: "TypeScript",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6",
      category: "Language"
    },
    {
      name: "React",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
      category: "Framework"
    },
    {
      name: "Node.js",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933",
      category: "Runtime"
    },
    {
      name: "Next.js",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: currentTheme === 'minimalist' ? "#000000" : "#FFFFFF",
      category: "Framework"
    },
    {
      name: "MongoDB",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47A248",
      category: "Database"
    },
    {
      name: "PyTorch",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      color: "#EE4C2C",
      category: "AI/ML"
    },
    {
      name: "Flask",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      color: currentTheme === 'minimalist' ? "#000000" : "#FFFFFF",
      category: "Framework"
    },
    {
      name: "Git",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "#F05032",
      category: "Tool"
    },
    {
      name: "Jira",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      color: "#0052CC",
      category: "Tool"
    },
    {
      name: "Jenkins",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      color: "#D33833",
      category: "CI/CD"
    },
    {
      name: "Oxygen Writer",
      logoUrl: "https://www.oxygenxml.com/img/resources/oxygen_author_256.png",
      color: "#FF6B35",
      category: "Writing"
    },
    {
      name: "Inkscape",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/inkscape/inkscape-original.svg",
      color: "#000000",
      category: "Design"
    },
  ];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Get theme-specific card styling with tinted glass effect
  const getCardStyle = (skill: Skill) => {
    const baseStyle = {
      width: '140px',
      height: '180px',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
      cursor: 'pointer',
      flexShrink: 0,
      backdropFilter: 'blur(12px)',
    };

    // Apply theme-specific tinted glass styling
    switch (currentTheme) {
      case 'minimalist':
        return {
          ...baseStyle,
          border: `1px solid rgba(255, 255, 255, 0.3)`,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        };
      case 'extrovert':
        return {
          ...baseStyle,
          border: `4px solid ${skill.color}`,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `8px 8px 0px 0px ${skill.color}`,
        };
      default:
        return {
          ...baseStyle,
          border: `1px solid rgba(255, 255, 255, 0.3)`,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        };
    }
  };

  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Add the keyframes animation for linear movement */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes skillsLinearMove {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `
      }} />
      
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Single continuous strip */}
        <div 
          style={{
            display: 'flex',
            gap: '30px',
            animation: 'skillsLinearMove 60s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            minWidth: 'max-content',
          }}
        >
          {/* Render skills multiple times for seamless loop - need enough copies for true infinite scroll */}
          {[...Array(8)].map((_, setIndex) => (
            skills.map((skill, index) => (
              <div
                key={`${setIndex}-${skill.name}`}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <div style={getCardStyle(skill)}>
                  {/* Background effect based on theme */}
                  {currentTheme === 'extrovert' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${skill.color}20, transparent)`,
                        borderRadius: '16px',
                      }}
                    />
                  )}
                  
                  {/* Actual Logo */}
                  <div 
                    style={{
                      width: '64px',
                      height: '64px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={skill.logoUrl}
                      alt={`${skill.name} logo`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div style="font-size: 32px; font-weight: bold; color: ${skill.color};">${skill.name.charAt(0)}</div>`;
                        }
                      }}
                    />
                  </div>
                  
                  {/* Skill name */}
                  <h3 
                    style={{
                      fontSize: '18px',
                      fontWeight: currentTheme === 'extrovert' ? '900' : '700',
                      marginBottom: '8px',
                      textAlign: 'center',
                      color: theme.colors.text,
                      position: 'relative',
                      zIndex: 1,
                      textTransform: currentTheme === 'extrovert' ? 'uppercase' : 'none',
                    }}
                  >
                    {skill.name}
                  </h3>
                  
                  {/* Category badge */}
                  <span 
                    style={{
                      fontSize: '12px',
                      padding: currentTheme === 'extrovert' ? '6px 16px' : '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: currentTheme === 'minimalist' 
                        ? theme.colors.surface 
                        : `${skill.color}20`,
                      color: currentTheme === 'minimalist' 
                        ? theme.colors.textSecondary 
                        : skill.color,
                      fontWeight: currentTheme === 'extrovert' ? '800' : '600',
                      border: `1px solid ${skill.color}40`,
                      position: 'relative',
                      zIndex: 1,
                      textTransform: currentTheme === 'extrovert' ? 'uppercase' : 'none',
                    }}
                  >
                    {skill.category}
                  </span>
                  
                  {/* Theme-specific decorative elements - removed non-existent themes */}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCarousel;