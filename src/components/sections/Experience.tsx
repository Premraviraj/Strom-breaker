"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  MapPin
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Experience = () => {
  const { theme, currentTheme } = useTheme();

  const experienceCard = {
    icon: Briefcase,
    title: "Technical Writer",
    company: "Nokia",
    type: "Internship",
    duration: "Jun 2024 - Present",
    location: "Remote",
    description: "Creating user-friendly documentation for complex technical products and collaborating with global engineering teams.",
    details: [
      "Creating comprehensive API documentation for 5+ software products",
      "Improving documentation clarity based on user feedback and analytics",
      "Collaborating with cross-functional teams across 3 countries",
      "Streamlining documentation processes to reduce development time by 20%"
    ],
    skills: ["Technical Writing", "API Documentation", "Cross-team Collaboration", "Process Improvement"],
    achievements: [
      "Enhanced developer experience for 100+ engineers",
      "Reduced documentation-related support tickets by 30%",
      "Established new documentation standards adopted company-wide"
    ],
    color: "#FFD93D"
  };

  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className={`${
              currentTheme === 'minimalist' 
                ? 'text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold tracking-tight minimalist-heading' 
                : 'text-2xl sm:text-3xl lg:text-4xl mb-4 transition-all duration-1000 brutalist-heading'
            }`}
            style={{ color: theme.colors.text }}
            whileHover={{ 
              scale: 1.05,
              textShadow: currentTheme === 'minimalist' 
                ? "0px 0px 8px rgba(59, 130, 246, 0.3)"
                : "3px 3px 0px rgba(0,0,0,0.2)",
              transition: { duration: 0.3 }
            }}
          >
            Professional <motion.span 
              style={{ color: theme.colors.textSecondary }}
              whileHover={{ 
                color: theme.colors.primary,
                transition: { duration: 0.3 }
              }}
            >
              Experience
            </motion.span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto transition-all duration-1000 delay-200"
            style={{ color: theme.colors.textSecondary }}
            whileHover={{ 
              scale: 1.02,
              y: -2,
              transition: { duration: 0.3 }
            }}
          >
            My current internship experience in the telecommunications industry
          </motion.p>
        </motion.div>

        {/* Compact Experience Card - Nokia Only */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`transform transition-all duration-300 ${
              currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
            } relative overflow-hidden`}
            style={{
              backgroundColor: currentTheme === 'minimalist' 
                ? 'rgba(255, 255, 255, 0.1)'
                : `rgba(255, 217, 61, 0.4)`, // Translucent yellow for Nokia
              border: currentTheme === 'minimalist' 
                ? `1px solid ${theme.colors.border}`
                : `4px solid #000000`,
              boxShadow: currentTheme === 'minimalist' 
                ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                : `8px 8px 0px 0px #000000`,
              backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
              padding: '2rem',
              color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              boxShadow: currentTheme === 'minimalist' 
                ? `0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)`
                : `12px 12px 0px 0px #000000`,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* Background Pattern for Extrovert Theme */}
            {currentTheme === 'extrovert' && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-6 h-6 bg-black transform rotate-45" />
                <div className="absolute top-8 right-6 w-4 h-4 bg-black rounded-full" />
                <div className="absolute bottom-8 left-6 w-3 h-8 bg-black transform rotate-12" />
                <div className="absolute bottom-4 right-4 w-8 h-3 bg-black transform rotate-45" />
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <motion.div 
                className={`p-4 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gray-100 text-gray-800 rounded-lg' 
                    : 'bg-black text-white transform -rotate-2'
                } transition-transform duration-300`}
                style={{
                  boxShadow: currentTheme === 'minimalist' 
                    ? 'none' 
                    : '4px 4px 0px 0px rgba(0,0,0,0.3)'
                }}
                whileHover={{ 
                  rotate: currentTheme === 'extrovert' ? 0 : 0,
                  scale: 1.1
                }}
              >
                <Briefcase 
                  size={32} 
                  color={currentTheme === 'minimalist' ? theme.colors.text : "#FFFFFF"}
                  style={{ strokeWidth: 2 }}
                />
              </motion.div>

              <motion.div
                className={`text-sm font-bold px-4 py-2 ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : ''
                } ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gray-100 text-gray-700 rounded-md' 
                    : 'bg-black text-white transform rotate-2'
                } transition-transform duration-300`}
                style={{
                  boxShadow: currentTheme === 'minimalist' 
                    ? 'none' 
                    : '3px 3px 0px 0px rgba(0,0,0,0.3)',
                  fontWeight: '700'
                }}
                whileHover={{ rotate: 0 }}
              >
                {experienceCard.type}
              </motion.div>
            </div>

            {/* Content - Compact Layout */}
            <div className="relative z-10 space-y-6">
              {/* Title and Company */}
              <div className="text-center mb-6">
                <motion.h3 
                  className={`mb-3 leading-tight ${
                    currentTheme === 'minimalist' 
                      ? 'font-bold minimalist-subheading' 
                      : 'brutalist-subheading brutalist-all'
                  } text-2xl sm:text-3xl`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                  whileHover={{ x: 5 }}
                >
                  {experienceCard.title}
                </motion.h3>

                <motion.p 
                  className={`text-xl font-semibold mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.primary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '700'
                  }}
                  whileHover={{ x: 3 }}
                >
                  {experienceCard.company}
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{experienceCard.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{experienceCard.location}</span>
                  </div>
                </div>
                
                <motion.p 
                  className={`text-base leading-relaxed max-w-3xl mx-auto ${
                    currentTheme === 'minimalist' 
                      ? 'font-medium minimalist-body' 
                      : 'brutalist-body brutalist-all'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                  whileHover={{ x: 3 }}
                >
                  {experienceCard.description}
                </motion.p>
              </div>

              {/* Single Column Layout for Details */}
              <div className="space-y-6">
                {/* Responsibilities */}
                <div>
                  <h4 
                    className={`text-lg font-semibold mb-4 ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`}
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '600' : '700'
                    }}
                  >
                    Key Responsibilities:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {experienceCard.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex items-start space-x-3 ${
                          currentTheme === 'extrovert' ? 'brutalist-all' : ''
                        }`}
                      >
                        <div 
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0`}
                          style={{ 
                            backgroundColor: currentTheme === 'minimalist' 
                              ? theme.colors.primary 
                              : '#000000'
                          }}
                        />
                        <span 
                          className="text-sm leading-relaxed"
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                            fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                          }}
                        >
                          {detail}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 
                    className={`text-lg font-semibold mb-4 ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`}
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '600' : '700'
                    }}
                  >
                    Skills & Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceCard.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className={`px-3 py-2 text-sm ${
                          currentTheme === 'minimalist' 
                            ? 'bg-gray-100 text-gray-700 rounded-lg' 
                            : 'bg-white text-black transform -rotate-1 hover:rotate-0'
                        } transition-transform duration-300`}
                        style={{
                          boxShadow: currentTheme === 'minimalist' 
                            ? 'none' 
                            : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                          fontWeight: '600'
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;