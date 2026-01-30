"use client";

import { useState, useEffect } from "react";
import { Calendar, Award, BookOpen, Code, Briefcase, Trophy, Target, Clock, X, Star, CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Timeline = () => {
  const { theme, currentTheme } = useTheme();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timelineData = [
    {
      date: "Aug 2022",
      type: "education",
      title: "B.Tech CSE & AI",
      organization: "Sri Venkateshwara College",
      description: "Building foundation in Computer Science and Artificial Intelligence with focus on emerging technologies.",
      highlights: ["Current CGPA: 7.9", "Focus on AI/ML and Software Development", "Expected graduation: 2026"],
      skills: ["Computer Science", "Artificial Intelligence", "Mathematics", "Programming"],
      impact: "Building foundation for tech career",
      duration: "4 years (ongoing)",
      rating: 4.2,
      completion: 0.75,
      color: currentTheme === 'extrovert' ? "#FF6B9D" : theme.colors.primary,
      icon: Calendar,
      size: "normal"
    },
    {
      date: "Sep 2023",
      type: "project",
      title: "Vehicle Monitoring",
      organization: "Live Surveillance Project",
      description: "Real-time vehicle monitoring using surveillance cameras with 3D visualizations and GSAP animations.",
      highlights: ["Real-time data processing", "Three.js 3D visualizations", "GSAP animations"],
      skills: ["React", "Three.js", "GSAP", "Real-time Processing", "Computer Vision"],
      impact: "Enhanced security monitoring capabilities",
      duration: "2 months",
      rating: 4.5,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#00FF80" : theme.colors.secondary,
      icon: Code,
      size: "normal"
    },
    {
      date: "Oct 2023",
      type: "project",
      title: "Expense Tracker",
      organization: "24hr Hackathon Winner",
      description: "Full-stack React application with TypeScript for expense tracking, featuring goal setting and predictive analytics using LSTM models.",
      highlights: ["React + TypeScript frontend", "Node.js backend integration", "LSTM-based savings prediction"],
      skills: ["React", "TypeScript", "Node.js", "LSTM", "Data Visualization"],
      impact: "Improved personal finance management for 50+ users",
      duration: "24 hours",
      rating: 4.8,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#FF6B9D" : theme.colors.primary,
      icon: Code,
      size: "large"
    },
    {
      date: "Nov 2023",
      type: "achievement",
      title: "Idea-thon 2nd Prize",
      organization: "College Technical Fest",
      description: "Innovative solution for expense tracking presented to industry experts.",
      highlights: ["Innovative solution for expense tracking", "Presented to industry experts", "Recognized for technical excellence"],
      skills: ["Innovation", "Presentation", "Problem Solving", "Business Analysis"],
      impact: "Recognized among top college innovators",
      duration: "1 week preparation",
      rating: 4.6,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#FFD93D" : theme.colors.secondary,
      icon: Award,
      size: "normal"
    },
    {
      date: "Dec 2023",
      type: "certificate",
      title: "Generative AI",
      organization: "Google Cloud",
      description: "Comprehensive course on Generative AI fundamentals and applications.",
      highlights: ["Machine Learning fundamentals", "Generative AI concepts and applications", "Practical hands-on experience"],
      skills: ["Generative AI", "Machine Learning", "Google Cloud", "Python"],
      impact: "Enhanced AI/ML knowledge for future projects",
      duration: "2 months",
      rating: 4.3,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#00FF80" : theme.colors.primary,
      icon: Award,
      size: "normal"
    },
    {
      date: "Feb 2024",
      type: "achievement",
      title: "SIH Top 30",
      organization: "Smart India Hackathon",
      description: "AI-powered traffic management solution competing against 1000+ teams nationwide.",
      highlights: ["Competed against 1000+ teams nationwide", "Developed YOLOv8-based vehicle detection system", "Integrated CNN and LSTM for traffic analysis"],
      skills: ["YOLOv8", "CNN", "LSTM", "Computer Vision", "Team Leadership"],
      impact: "Top 3% performance among national participants",
      duration: "24 hours",
      rating: 4.9,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#FFD93D" : theme.colors.secondary,
      icon: Trophy,
      size: "normal"
    },
    {
      date: "Mar 2024",
      type: "publication",
      title: "UAV Disaster System",
      organization: "BEL-IETE Symposium",
      description: "Research paper on UAVs for disaster identification and alerting systems.",
      highlights: ["Presented at BEL Academy of Excellence", "Focus on AI, Cyber Security, IoT and Aerial Vehicle Systems", "Innovative approach to disaster management"],
      skills: ["Research", "AI/ML", "IoT", "Technical Writing"],
      impact: "Contributed to disaster management research community",
      duration: "6 months research",
      rating: 4.4,
      completion: 1.0,
      color: currentTheme === 'extrovert' ? "#FF6B9D" : theme.colors.primary,
      icon: BookOpen,
      size: "normal"
    },
    {
      date: "Jun 2024 - Present",
      type: "experience",
      title: "Technical Writer",
      organization: "Nokia Internship",
      description: "Creating user-friendly documentation for complex technical products and collaborating with global engineering teams.",
      highlights: ["Creating API documentation for 5+ software products", "Improving documentation clarity based on user feedback", "Collaborating with cross-functional teams across 3 countries"],
      skills: ["Technical Writing", "API Documentation", "Cross-team Collaboration"],
      impact: "Enhancing developer experience for 100+ engineers",
      duration: "Ongoing",
      rating: 4.7,
      completion: 0.8,
      color: currentTheme === 'extrovert' ? "#00FF80" : theme.colors.secondary,
      icon: Briefcase,
      size: "large"
    }
  ];

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      experience: "Professional",
      project: "Technical",
      publication: "Research",
      achievement: "Recognition",
      certificate: "Learning",
      education: "Academic"
    };
    return labels[type] || "Event";
  };

  // Background patterns for cards (simplified SVG patterns)
  const BackgroundPattern = ({ type, color }: { type: string, color: string }) => {
    const patterns: { [key: string]: React.ReactElement } = {
      education: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="education-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill={color} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#education-pattern)" />
        </svg>
      ),
      project: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="project-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="5" height="5" fill={color} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#project-pattern)" />
        </svg>
      ),
      achievement: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="achievement-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <polygon points="12.5,2 15.5,8 22.5,8 17,12.5 19,19 12.5,15 6,19 8,12.5 2.5,8 9.5,8" fill={color} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#achievement-pattern)" />
        </svg>
      ),
      default: (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="default-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="10" stroke={color} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#default-pattern)" />
        </svg>
      )
    };
    return patterns[type] || patterns.default;
  };

  return (
    <section className="py-16" style={{ backgroundColor: theme.colors.surface }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.styles.headerClass} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color: theme.colors.text }}
          >
            My <span style={{ color: theme.colors.textSecondary }}>Journey</span>
          </h2>
          <p 
            className={`max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ color: theme.colors.textSecondary }}
          >
            Click on any card to explore my professional journey in detail
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            const isLarge = item.size === "large";
            
            return (
              <div
                key={index}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
                } relative overflow-hidden ${
                  isLarge ? 'md:col-span-2 lg:col-span-2 xl:col-span-2' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  backgroundColor: currentTheme === 'minimalist' 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : item.color,
                  border: currentTheme === 'minimalist' 
                    ? `1px solid ${theme.colors.border}`
                    : `4px solid #000000`,
                  boxShadow: currentTheme === 'minimalist' 
                    ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                    : `8px 8px 0px 0px #000000`,
                  backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'none',
                  padding: isLarge ? '2rem' : '1.5rem',
                  minHeight: isLarge ? '400px' : '280px',
                  transitionDelay: `${index * 100}ms`,
                  color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
                }}
                onClick={() => setSelectedCard(index)}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div 
                    className={`text-sm font-bold px-3 py-2 ${
                      currentTheme === 'minimalist' 
                        ? 'bg-gray-100 text-gray-800 rounded-md' 
                        : 'bg-black text-white transform -rotate-2 hover:rotate-0'
                    } transition-transform duration-300`}
                    style={{
                      boxShadow: currentTheme === 'minimalist' 
                        ? 'none' 
                        : '3px 3px 0px 0px rgba(0,0,0,0.3)',
                      fontWeight: '700'
                    }}
                  >
                    {getTypeLabel(item.type)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className={`w-12 h-12 ${
                        currentTheme === 'minimalist' 
                          ? 'bg-gray-200 rounded-full' 
                          : 'bg-black border-2 border-black shadow-lg transform rotate-12 hover:rotate-0'
                      } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      style={{
                        boxShadow: currentTheme === 'minimalist' 
                          ? 'none' 
                          : '4px 4px 0px 0px rgba(0,0,0,0.5)'
                      }}
                    >
                      <Icon 
                        size={22} 
                        color={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"}
                        style={{
                          strokeWidth: 3
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <h3 
                      className={`font-bold mb-3 leading-tight ${
                        isLarge ? 'text-2xl' : 'text-2xl'
                      }`}
                      style={{ 
                        color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                        fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                        textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                        letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                      }}
                    >
                      {item.title}
                    </h3>
                    
                    <p 
                      className="text-sm leading-relaxed mb-4 font-medium"
                      style={{ 
                        color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                        fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                      <div 
                        className={`flex items-center space-x-1 px-3 py-2 ${
                          currentTheme === 'minimalist' 
                            ? 'bg-gray-100 text-gray-700 rounded-md' 
                            : 'bg-black text-white transform rotate-1 hover:rotate-0'
                        } transition-transform duration-300`}
                        style={{
                          boxShadow: currentTheme === 'minimalist' 
                            ? 'none' 
                            : '3px 3px 0px 0px rgba(0,0,0,0.3)'
                        }}
                      >
                        <Star 
                          size={16} 
                          fill={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"} 
                          color={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"}
                          style={{
                            strokeWidth: 2
                          }}
                        />
                        <span 
                          className="text-sm font-bold"
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.text : '#FFFFFF',
                            fontWeight: '700'
                          }}
                        >
                          {item.rating}
                        </span>
                      </div>
                      <div 
                        className={`flex items-center space-x-1 px-3 py-2 ${
                          currentTheme === 'minimalist' 
                            ? 'bg-gray-100 text-gray-700 rounded-md' 
                            : 'bg-black text-white transform -rotate-1 hover:rotate-0'
                        } transition-transform duration-300`}
                        style={{
                          boxShadow: currentTheme === 'minimalist' 
                            ? 'none' 
                            : '3px 3px 0px 0px rgba(0,0,0,0.3)'
                        }}
                      >
                        <CheckCircle 
                          size={16} 
                          color={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"}
                          style={{
                            strokeWidth: 2
                          }}
                        />
                        <span 
                          className="text-sm font-bold"
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.text : '#FFFFFF',
                            fontWeight: '700'
                          }}
                        >
                          {Math.round(item.completion * 100)}%
                        </span>
                      </div>
                    </div>
                    <div 
                      className={`text-xs font-bold px-3 py-2 ${
                        currentTheme === 'minimalist' 
                          ? 'bg-gray-100 text-gray-700 rounded-md' 
                          : 'bg-black text-white transform rotate-2 hover:rotate-0'
                      } transition-transform duration-300`}
                      style={{
                        boxShadow: currentTheme === 'minimalist' 
                          ? 'none' 
                          : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                        fontWeight: '700'
                      }}
                    >
                      {item.date}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal - with tinted glass effect */}
        {selectedCard !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setSelectedCard(null)}
          >
            <div 
              className={`relative max-w-4xl w-full max-h-[90vh] overflow-auto animate-slideUp shadow-2xl ${
                currentTheme === 'minimalist' ? 'rounded-lg border border-gray-200' : 'border-4 border-black'
              }`}
              style={{ 
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.95)'
                  : `${timelineData[selectedCard].color}CC`,
                boxShadow: currentTheme === 'minimalist' 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  : '12px 12px 0px 0px #000000',
                backdropFilter: currentTheme === 'minimalist' ? 'blur(20px)' : 'blur(10px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className={`absolute top-4 right-4 p-3 hover:scale-110 transition-all duration-300 z-10 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200' 
                    : 'bg-black text-white border-2 border-black transform rotate-12 hover:rotate-0'
                }`}
                style={{
                  boxShadow: currentTheme === 'minimalist' 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : '4px 4px 0px 0px rgba(0,0,0,0.5)'
                }}
              >
                <X size={20} className="hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left side - Icon section styled per theme */}
                <div 
                  className={`flex items-center justify-center p-8 md:w-1/3 relative overflow-hidden ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-50 border-r border-gray-200' 
                      : 'border-r-4 border-black'
                  }`}
                  style={currentTheme === 'minimalist' ? {} : { 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {/* Background patterns - only for extrovert */}
                  {currentTheme === 'extrovert' && (
                    <div className="absolute inset-0 opacity-30">
                      {/* Bold geometric shapes */}
                      <div className="absolute top-4 left-4 w-8 h-8 bg-black transform rotate-45" />
                      <div className="absolute top-12 right-8 w-6 h-6 bg-black" />
                      <div className="absolute bottom-16 left-6 w-4 h-12 bg-black transform rotate-12" />
                      <div className="absolute bottom-8 right-4 w-10 h-4 bg-black transform rotate-45" />
                      
                      {/* Bold lines */}
                      <div className="absolute top-1/4 left-0 w-full h-1 bg-black transform -rotate-12"></div>
                      <div className="absolute top-3/4 left-0 w-full h-1 bg-black transform rotate-12"></div>
                      
                      {/* Bold dots */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-black"></div>
                      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-black"></div>
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black"></div>
                    </div>
                  )}

                  {/* Icon container - styled per theme */}
                  <div 
                    className={`flex items-center justify-center relative z-10 ${
                      currentTheme === 'minimalist' 
                        ? 'w-24 h-24 bg-white rounded-full shadow-lg' 
                        : 'w-32 h-32 bg-black border-4 border-black transform -rotate-6 hover:rotate-0 transition-transform duration-500 animate-float'
                    }`}
                    style={currentTheme === 'minimalist' ? {} : { 
                      boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    {(() => {
                      const IconComponent = timelineData[selectedCard].icon;
                      return (
                        <IconComponent 
                          size={currentTheme === 'minimalist' ? 32 : 48} 
                          color={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"}
                          className={currentTheme === 'minimalist' ? '' : 'animate-pulse'}
                          style={{
                            strokeWidth: currentTheme === 'minimalist' ? 2 : 3
                          }}
                        />
                      );
                    })()}
                  </div>

                  {/* Minimalist decorative elements */}
                  {currentTheme === 'minimalist' && (
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-8 left-8 w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="absolute top-16 right-12 w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="absolute bottom-12 left-12 w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="absolute bottom-8 right-8 w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Main content */}
                <div className="p-8 md:w-2/3">
                  {/* Category badge - minimal for minimalist */}
                  <div 
                    className={`inline-block mb-6 animate-slideInLeft ${
                      currentTheme === 'minimalist' 
                        ? 'text-xs uppercase tracking-wide font-medium text-gray-500' 
                        : 'px-4 py-2 bg-black text-white border-2 border-black transform -rotate-2 hover:rotate-0 transition-transform duration-300'
                    }`}
                    style={currentTheme === 'minimalist' ? {} : { 
                      boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)',
                      fontWeight: '700'
                    }}
                  >
                    {getTypeLabel(timelineData[selectedCard].type)}
                  </div>
                  
                  {/* Title and organization */}
                  <div className="mb-6">
                    <h2 
                      className={`mb-2 animate-slideInLeft ${
                        currentTheme === 'minimalist' ? 'text-3xl font-light' : 'text-2xl font-black'
                      }`} 
                      style={{ 
                        color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                        animationDelay: '0.1s',
                        fontWeight: currentTheme === 'minimalist' ? '300' : '900',
                        textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                        letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                      }}
                    >
                      {timelineData[selectedCard].title}
                    </h2>
                    
                    <p 
                      className={`animate-slideInLeft ${
                        currentTheme === 'minimalist' ? 'text-lg font-normal' : 'text-xl font-bold'
                      }`} 
                      style={{ 
                        color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000', 
                        fontWeight: currentTheme === 'minimalist' ? '400' : '700',
                        animationDelay: '0.2s'
                      }}
                    >
                      {timelineData[selectedCard].organization}
                    </p>
                    
                    {/* Date and stats - minimal layout for minimalist */}
                    <div className={`flex items-center mt-4 animate-slideInLeft ${
                      currentTheme === 'minimalist' ? 'space-x-6' : 'space-x-4'
                    }`} style={{ animationDelay: '0.3s' }}>
                      <div 
                        className={`${
                          currentTheme === 'minimalist' 
                            ? 'text-sm text-gray-500' 
                            : 'px-4 py-2 bg-black text-white border-2 border-black transform rotate-1 hover:rotate-0 transition-transform duration-300'
                        }`}
                        style={currentTheme === 'minimalist' ? {} : { 
                          boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
                          fontWeight: '700'
                        }}
                      >
                        {timelineData[selectedCard].date}
                      </div>
                      
                      {currentTheme === 'minimalist' ? (
                        <>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Star size={14} fill={theme.colors.textSecondary} color={theme.colors.textSecondary} />
                            <span>{timelineData[selectedCard].rating}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <CheckCircle size={14} color={theme.colors.textSecondary} />
                            <span>{Math.round(timelineData[selectedCard].completion * 100)}%</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2 text-sm">
                          <div className={`flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md transition-transform duration-300`} 
                          style={{ boxShadow: 'none' }}>
                            <Star 
                              size={16} 
                              fill={theme.colors.text} 
                              color={theme.colors.text}
                              style={{ strokeWidth: 2 }}
                            />
                            <span style={{ 
                              color: theme.colors.text, 
                              fontWeight: '700' 
                            }}>
                              {timelineData[selectedCard].rating}
                            </span>
                          </div>
                          <div className={`flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md transition-transform duration-300`} 
                          style={{ boxShadow: 'none' }}>
                            <CheckCircle 
                              size={16} 
                              color={theme.colors.text}
                              style={{ strokeWidth: 2 }}
                            />
                            <span style={{ 
                              color: theme.colors.text, 
                              fontWeight: '700' 
                            }}>
                              {Math.round(timelineData[selectedCard].completion * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p 
                    className="mb-8 leading-relaxed animate-slideInLeft" 
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                      animationDelay: '0.4s',
                      fontWeight: currentTheme === 'minimalist' ? '400' : '500',
                      fontSize: currentTheme === 'minimalist' ? '1rem' : '0.875rem'
                    }}
                  >
                    {timelineData[selectedCard].description}
                  </p>

                  {/* Content sections - simplified for minimalist */}
                  <div className={`${currentTheme === 'minimalist' ? 'space-y-8' : 'space-y-6'}`}>
                    {/* Highlights */}
                    <div className="animate-slideInLeft" style={{ animationDelay: '0.5s' }}>
                      <h4 
                        className={`mb-4 ${currentTheme === 'minimalist' ? 'text-sm font-medium uppercase tracking-wide' : 'font-semibold'}`}
                        style={{ 
                          color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                          fontWeight: currentTheme === 'minimalist' ? '500' : '900',
                          textTransform: currentTheme === 'minimalist' ? 'uppercase' : 'uppercase',
                          letterSpacing: currentTheme === 'minimalist' ? '0.05em' : '-0.01em'
                        }}
                      >
                        Key Highlights
                      </h4>
                      <ul className={`${currentTheme === 'minimalist' ? 'space-y-3' : 'space-y-2'}`}>
                        {timelineData[selectedCard].highlights.map((highlight, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start animate-slideInLeft" 
                            style={{ 
                              color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                              animationDelay: `${0.6 + idx * 0.1}s`,
                              fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                            }}
                          >
                            <div 
                              className={`mt-2 mr-4 flex-shrink-0 ${
                                currentTheme === 'minimalist' ? 'w-1 h-1 bg-gray-400 rounded-full' : 'w-3 h-3 bg-black transform rotate-45'
                              }`} 
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills - simplified for minimalist */}
                    <div className="animate-slideInLeft" style={{ animationDelay: '0.8s' }}>
                      <h4 
                        className={`mb-4 ${currentTheme === 'minimalist' ? 'text-sm font-medium uppercase tracking-wide' : 'font-semibold'}`}
                        style={{ 
                          color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#FFFFFF',
                          textShadow: currentTheme === 'minimalist' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
                          fontWeight: currentTheme === 'minimalist' ? '500' : '700'
                        }}
                      >
                        Skills
                      </h4>
                      <div className={`flex flex-wrap ${currentTheme === 'minimalist' ? 'gap-3' : 'gap-2'}`}>
                        {timelineData[selectedCard].skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className={`hover:scale-105 transition-transform duration-300 animate-slideInLeft ${
                              currentTheme === 'minimalist' 
                                ? 'px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full' 
                                : 'px-3 py-1 rounded-full backdrop-blur-sm border'
                            }`}
                            style={currentTheme === 'minimalist' ? {
                              animationDelay: `${0.9 + idx * 0.05}s`
                            } : { 
                              backgroundColor: `${timelineData[selectedCard].color}30`,
                              color: timelineData[selectedCard].color,
                              border: `1px solid ${timelineData[selectedCard].color}50`,
                              animationDelay: `${0.9 + idx * 0.05}s`,
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact and Duration - side by side for minimalist */}
                    <div className={`animate-slideInLeft ${
                      currentTheme === 'minimalist' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'grid grid-cols-1 md:grid-cols-2 gap-4'
                    }`} style={{ animationDelay: '1s' }}>
                      <div>
                        <h4 
                          className={`mb-3 flex items-center ${
                            currentTheme === 'minimalist' ? 'text-sm font-medium uppercase tracking-wide' : 'font-semibold'
                          }`}
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#FFFFFF',
                            textShadow: currentTheme === 'minimalist' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
                            fontWeight: currentTheme === 'minimalist' ? '500' : '700'
                          }}
                        >
                          {currentTheme === 'minimalist' ? (
                            <>Impact</>
                          ) : (
                            <>
                              <Target 
                                size={16} 
                                className="mr-2 animate-spin" 
                                style={{ 
                                  color: timelineData[selectedCard].color, 
                                  animationDuration: '3s',
                                  filter: 'none',
                                  strokeWidth: 2
                                }} 
                              />
                              Impact
                            </>
                          )}
                        </h4>
                        <p 
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.text : '#E5E7EB', 
                            fontSize: currentTheme === 'minimalist' ? '0.95rem' : '0.9rem',
                            textShadow: currentTheme === 'minimalist' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
                            fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                          }}
                        >
                          {timelineData[selectedCard].impact}
                        </p>
                      </div>
                      <div>
                        <h4 
                          className={`mb-3 flex items-center ${
                            currentTheme === 'minimalist' ? 'text-sm font-medium uppercase tracking-wide' : 'font-semibold'
                          }`}
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#FFFFFF',
                            textShadow: currentTheme === 'minimalist' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
                            fontWeight: currentTheme === 'minimalist' ? '500' : '700'
                          }}
                        >
                          {currentTheme === 'minimalist' ? (
                            <>Duration</>
                          ) : (
                            <>
                              <Clock 
                                size={16} 
                                className="mr-2 animate-pulse" 
                                style={{ 
                                  color: timelineData[selectedCard].color,
                                  filter: 'none',
                                  strokeWidth: 2
                                }} 
                              />
                              Duration
                            </>
                          )}
                        </h4>
                        <p 
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.text : '#E5E7EB', 
                            fontSize: currentTheme === 'minimalist' ? '0.95rem' : '0.9rem',
                            textShadow: currentTheme === 'minimalist' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
                            fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                          }}
                        >
                          {timelineData[selectedCard].duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Timeline;