"use client";

import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, Building2, Users, Target, Award, TrendingUp, Globe, FileText, Code2, Zap, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";
import { useRef, useState } from "react";

const Experience = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const experiences = [
    {
      title: "Technical Writer Intern",
      company: "Nokia",
      location: "Remote",
      duration: "June 2024 - August 2024",
      type: "Internship",
      description: "Contributed to Nokia's global documentation ecosystem, creating technical content for international developer communities.",
      keyImpacts: [
        { icon: FileText, text: "Documented 5+ software products", metric: "5+" },
        { icon: Globe, text: "Served 1000+ global developers", metric: "1K+" },
        { icon: TrendingUp, text: "Improved clarity by 40%", metric: "40%" },
        { icon: Users, text: "Collaborated across 3 countries", metric: "3" }
      ],
      technologies: [
        { name: "Technical Writing", color: isExtrovert ? "#ff0080" : "#333333" },
        { name: "API Documentation", color: isExtrovert ? "#00ff80" : "#666666" },
        { name: "Confluence", color: isExtrovert ? "#ffff00" : "#999999" },
        { name: "Markdown", color: isExtrovert ? "#ff0080" : "#333333" },
        { name: "Git", color: isExtrovert ? "#00ff80" : "#666666" },
        { name: "OpenAPI", color: isExtrovert ? "#ffff00" : "#999999" }
      ],
      achievements: [
        "Outstanding Intern Recognition",
        "30% faster documentation reviews",
        "Global best practices adoption"
      ],
      companyIcon: Building2,
      gradient: isExtrovert 
        ? "from-pink-500/20 via-yellow-400/20 to-green-500/20"
        : "from-gray-100 to-gray-50"
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Experience", value: "1", suffix: "Internship", color: isExtrovert ? "#ff0080" : "#333333" },
    { icon: Globe, label: "Global Reach", value: "1K", suffix: "Developers", color: isExtrovert ? "#00ff80" : "#666666" },
    { icon: FileText, label: "Documentation", value: "5", suffix: "Products", color: isExtrovert ? "#ffff00" : "#999999" },
    { icon: Award, label: "Recognition", value: "100", suffix: "% Success", color: isExtrovert ? "#ff0080" : "#333333" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="py-20 relative overflow-hidden" 
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2 
              className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.styles.headerClass}`} 
              style={{ color: theme.colors.text }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              Professional <span style={{ color: theme.colors.textSecondary }}>Experience</span>
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto" 
              style={{ color: theme.colors.textSecondary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Real-world impact through professional internships and industry collaboration
            </motion.p>
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`${theme.styles.cardClass} ${theme.styles.shadowClass} overflow-hidden group relative`}>
                  {/* Animated background for extrovert */}
                  {isExtrovert && hoveredCard === index && (
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: "linear-gradient(45deg, #ff0080, #00ff80, #ffff00)"
                      }}
                      animate={{
                        background: [
                          "linear-gradient(0deg, #ff0080, #00ff80, #ffff00)",
                          "linear-gradient(120deg, #00ff80, #ffff00, #ff0080)",
                          "linear-gradient(240deg, #ffff00, #ff0080, #00ff80)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  <CardContent className="p-0 relative z-10">
                    {/* Enhanced Header */}
                    <div className={`bg-gradient-to-r ${experience.gradient} p-8 relative`}>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="p-4 rounded-2xl"
                            style={{ backgroundColor: theme.colors.background }}
                            whileHover={{ 
                              scale: 1.1, 
                              rotate: isExtrovert ? 360 : 0 
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <experience.companyIcon 
                              className="w-8 h-8" 
                              style={{ color: isExtrovert ? "#ff0080" : theme.colors.text }} 
                            />
                          </motion.div>
                          <div>
                            <motion.h3 
                              className="text-2xl font-bold mb-1" 
                              style={{ color: theme.colors.text }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {experience.title}
                            </motion.h3>
                            <motion.p 
                              className="text-xl font-semibold mb-2" 
                              style={{ color: isExtrovert ? "#ff0080" : theme.colors.primary }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {experience.company}
                            </motion.p>
                            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                              {experience.description}
                            </p>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Badge 
                            variant="secondary" 
                            className={`text-sm ${theme.styles.cardClass}`}
                            style={{ backgroundColor: isExtrovert ? "#00ff80" : theme.colors.surface }}
                          >
                            {experience.type}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="flex flex-wrap gap-6 text-sm">
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <Calendar 
                            className="h-4 w-4 mr-2" 
                            style={{ color: isExtrovert ? "#ffff00" : theme.colors.text }} 
                          />
                          <span style={{ color: theme.colors.textSecondary }}>{experience.duration}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <MapPin 
                            className="h-4 w-4 mr-2" 
                            style={{ color: isExtrovert ? "#00ff80" : theme.colors.text }} 
                          />
                          <span style={{ color: theme.colors.textSecondary }}>{experience.location}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Key Impacts */}
                        <div>
                          <motion.h4 
                            className="text-lg font-semibold mb-4 flex items-center" 
                            style={{ color: theme.colors.text }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Target 
                              className="w-5 h-5 mr-2" 
                              style={{ color: isExtrovert ? "#ff0080" : theme.colors.text }} 
                            />
                            Key Impact
                          </motion.h4>
                          <div className="grid grid-cols-2 gap-4">
                            {experience.keyImpacts.map((impact, idx) => (
                              <motion.div
                                key={idx}
                                className={`p-4 rounded-lg ${theme.styles.cardClass} text-center group cursor-pointer`}
                                whileHover={{ 
                                  scale: 1.05, 
                                  y: -3,
                                  rotateY: isExtrovert ? 5 : 0 
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                              >
                                <motion.div
                                  className="mb-2 mx-auto w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: `${isExtrovert ? "#ff0080" : theme.colors.primary}20` }}
                                  whileHover={{ rotate: isExtrovert ? 360 : 0 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  <impact.icon 
                                    className="w-5 h-5" 
                                    style={{ color: isExtrovert ? "#ff0080" : theme.colors.primary }} 
                                  />
                                </motion.div>
                                <div className="text-xl font-bold" style={{ color: theme.colors.text }}>
                                  {impact.metric}
                                </div>
                                <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                                  {impact.text}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies & Achievements */}
                        <div className="space-y-6">
                          <div>
                            <motion.h4 
                              className="text-lg font-semibold mb-3 flex items-center" 
                              style={{ color: theme.colors.text }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Code2 
                                className="w-5 h-5 mr-2" 
                                style={{ color: isExtrovert ? "#00ff80" : theme.colors.text }} 
                              />
                              Technologies
                            </motion.h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech, idx) => (
                                <motion.div
                                  key={tech.name}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + idx * 0.1 }}
                                  whileHover={{ 
                                    scale: 1.1, 
                                    rotate: isExtrovert ? [-5, 5, 0] : 0 
                                  }}
                                >
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${theme.styles.cardClass} cursor-pointer`}
                                    style={{ 
                                      borderColor: tech.color,
                                      color: tech.color 
                                    }}
                                  >
                                    {tech.name}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <motion.h4 
                              className="text-lg font-semibold mb-3 flex items-center" 
                              style={{ color: theme.colors.text }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Award 
                                className="w-5 h-5 mr-2" 
                                style={{ color: isExtrovert ? "#ffff00" : theme.colors.text }} 
                              />
                              Achievements
                            </motion.h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.9 + idx * 0.1 }}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                >
                                  <CheckCircle 
                                    className="w-4 h-4 mt-0.5 mr-3 flex-shrink-0" 
                                    style={{ color: isExtrovert ? "#00ff80" : "#10B981" }} 
                                  />
                                  <span 
                                    className="text-sm leading-relaxed" 
                                    style={{ color: theme.colors.textSecondary }}
                                  >
                                    {achievement}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <motion.div 
                            className="pt-4"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Button 
                              variant="outline" 
                              className={`w-full ${theme.styles.cardClass} group`} 
                              asChild
                            >
                              <a 
                                href="https://www.nokia.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center"
                              >
                                <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                                Learn about Nokia
                              </a>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <Card className={`${theme.styles.cardClass} ${theme.styles.shadowClass} overflow-hidden group relative`}>
              {isExtrovert && (
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: "linear-gradient(45deg, #ff0080, #00ff80, #ffff00)"
                  }}
                  animate={{
                    background: [
                      "linear-gradient(0deg, #ff0080, #00ff80, #ffff00)",
                      "linear-gradient(120deg, #00ff80, #ffff00, #ff0080)",
                      "linear-gradient(240deg, #ffff00, #ff0080, #00ff80)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
              <CardContent className="p-8 relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: isExtrovert ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap 
                    className="w-8 h-8" 
                    style={{ color: isExtrovert ? "#ffff00" : theme.colors.primary }} 
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text }}>
                  Ready for New Challenges
                </h3>
                <p className="mb-6 max-w-2xl mx-auto" style={{ color: theme.colors.textSecondary }}>
                  Seeking opportunities to apply technical expertise and create meaningful impact
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className={theme.styles.buttonClass} asChild>
                      <a href="#contact">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Let's Connect
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className={theme.styles.cardClass} asChild>
                      <a href="/Prem_Resume.pdf" download="Prem_R_Resume.pdf">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;