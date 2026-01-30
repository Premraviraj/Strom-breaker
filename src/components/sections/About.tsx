"use client";

import { motion, useInView } from "framer-motion";
import { Code, Zap, Heart, Target, MapPin, GraduationCap, Briefcase, Coffee, User, BookOpen, Music, ChefHat, Trophy, Users, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";
import { useRef, useState, useEffect } from "react";

const About = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';
  const [typedText, setTypedText] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const fullText = "Building the future, one line of code at a time ✨";
  
  // Typewriter effect
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const highlights = [
    {
      icon: Code,
      title: "Full Stack Developer",
      description: "React, Node.js, Python, AI/ML",
      color: isExtrovert ? "#ff0080" : "#333333"
    },
    {
      icon: Briefcase,
      title: "Nokia Experience",
      description: "Technical documentation & APIs",
      color: isExtrovert ? "#00ff80" : "#666666"
    },
    {
      icon: Zap,
      title: "Problem Solver",
      description: "Hackathons & innovation",
      color: isExtrovert ? "#ffff00" : "#999999"
    },
    {
      icon: Heart,
      title: "Team Player",
      description: "Collaboration & mentoring",
      color: isExtrovert ? "#ff0080" : "#333333"
    }
  ];

  const quickFacts = [
    { 
      icon: MapPin, 
      text: "Kolar, Karnataka",
      color: isExtrovert ? "#ff0080" : "#000000"
    },
    { 
      icon: GraduationCap, 
      text: "CSE & AI • CGPA 7.9",
      color: isExtrovert ? "#00ff80" : "#000000"
    },
    { 
      icon: Coffee, 
      text: "Always learning",
      color: isExtrovert ? "#ffff00" : "#000000"
    },
    { 
      icon: Target, 
      text: "Open for opportunities",
      color: isExtrovert ? "#ff0080" : "#000000"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 relative overflow-hidden" 
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header with Typewriter Effect */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2 
              className={`text-3xl sm:text-4xl font-bold mb-6 ${theme.styles.headerClass}`} 
              style={{ color: theme.colors.text }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              About <span style={{ color: theme.colors.textSecondary }}>Me</span>
            </motion.h2>
            
            <motion.div 
              className="text-lg sm:text-xl font-medium h-8 flex items-center justify-center"
              style={{ color: theme.colors.textSecondary }}
            >
              {typedText + (typedText.length < fullText.length ? "|" : "")}
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Profile Card */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              <Card className={`h-full ${theme.styles.cardClass} ${theme.styles.shadowClass} overflow-hidden group relative`}>
                <CardContent className="p-6 relative z-10">
                  {/* Animated border for extrovert - only on hover */}
                  {isExtrovert && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      animate={{ 
                        background: [
                          "linear-gradient(0deg, #ff0080, #00ff80, #ffff00)",
                          "linear-gradient(90deg, #00ff80, #ffff00, #ff0080)",
                          "linear-gradient(180deg, #ffff00, #ff0080, #00ff80)",
                          "linear-gradient(270deg, #ff0080, #00ff80, #ffff00)",
                          "linear-gradient(360deg, #00ff80, #ffff00, #ff0080)"
                        ]
                      }}
                      transition={{ 
                        background: { duration: 2, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.3 }
                      }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-xl font-bold mb-3" 
                      style={{ color: theme.colors.text }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <User className="inline-block w-6 h-6 mr-2" style={{ color: isExtrovert ? "#ff0080" : "#000000" }} />
                      Hey there!
                    </motion.h3>
                    
                    <motion.p 
                      className="text-base leading-relaxed mb-4" 
                      style={{ color: theme.colors.textSecondary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      I'm a <strong style={{ color: theme.colors.text }}>3rd-year CSE & AI student</strong> with 
                      experience as a <strong style={{ color: theme.colors.text }}>Technical Writer at Nokia</strong>. 
                      I turn complex problems into elegant solutions through code and collaboration.
                    </motion.p>

                    <motion.p 
                      className="text-sm leading-relaxed" 
                      style={{ color: theme.colors.textSecondary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Lightbulb className="inline-block w-4 h-4 mr-1" style={{ color: isExtrovert ? "#ffff00" : "#000000" }} />
                      Always curious, always learning!
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Facts */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-2"
            >
              <Card className={`h-full ${theme.styles.cardClass} ${theme.styles.shadowClass}`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4" style={{ color: theme.colors.text }}>
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    {quickFacts.map((fact, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center group cursor-pointer"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ 
                          x: 8,
                          scale: 1.05
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="mr-3"
                          whileHover={{ 
                            rotate: isExtrovert ? [0, -10, 10, 0] : 0,
                            scale: 1.2
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <fact.icon className="h-5 w-5" style={{ color: fact.color }} />
                        </motion.div>
                        <span style={{ color: theme.colors.textSecondary }}>{fact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: isExtrovert ? 8 : 0,
                  rotateX: isExtrovert ? 4 : 0,
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card className={`h-full ${theme.styles.cardClass} ${theme.styles.shadowClass} cursor-pointer overflow-hidden relative`}>
                  {/* Interactive background effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isExtrovert 
                        ? `linear-gradient(135deg, ${highlight.color}20, ${highlight.color}10)`
                        : `linear-gradient(135deg, ${highlight.color}10, transparent)`
                    }}
                  />
                  
                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      className="mb-4 mx-auto w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: `${highlight.color}20` }}
                      whileHover={{ 
                        rotate: isExtrovert ? 360 : 0,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <highlight.icon 
                        className="h-8 w-8" 
                        style={{ color: highlight.color }} 
                      />
                      
                      {/* Pulsing ring effect for extrovert */}
                      {isExtrovert && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: highlight.color }}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.h4 
                      className="font-bold mb-2" 
                      style={{ color: theme.colors.text }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {highlight.title}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-sm" 
                      style={{ color: theme.colors.textSecondary }}
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {highlight.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <motion.h3 
              className="text-lg font-semibold mb-4" 
              style={{ color: theme.colors.text }}
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="inline-block w-5 h-5 mr-2" style={{ color: isExtrovert ? "#ff0080" : "#000000" }} />
              Beyond Code
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Music, text: "Music", delay: 0, color: isExtrovert ? "#ff0080" : "#000000" },
                { icon: ChefHat, text: "Cooking", delay: 0.1, color: isExtrovert ? "#00ff80" : "#000000" },
                { icon: Trophy, text: "Hackathons", delay: 0.2, color: isExtrovert ? "#ffff00" : "#000000" },
                { icon: Users, text: "Mentoring", delay: 0.3, color: isExtrovert ? "#ff0080" : "#000000" },
                { icon: BookOpen, text: "Learning", delay: 0.4, color: isExtrovert ? "#00ff80" : "#000000" },
                { icon: Coffee, text: "Coffee", delay: 0.5, color: isExtrovert ? "#ffff00" : "#000000" }
              ].map((interest, index) => (
                <motion.div
                  key={interest.text}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 + interest.delay }}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: isExtrovert ? [-8, 8, -4, 0] : [0, -2, 2, 0],
                    y: -3
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge 
                    variant="outline" 
                    className={`text-sm ${theme.styles.cardClass} cursor-pointer transition-all duration-200 hover:shadow-lg flex items-center gap-2`}
                    style={{
                      borderColor: isExtrovert ? theme.colors.primary : theme.colors.border
                    }}
                  >
                    <interest.icon className="w-4 h-4" style={{ color: interest.color }} />
                    {interest.text}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;