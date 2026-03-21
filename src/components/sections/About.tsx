"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Code, 
  Target, 
  Heart
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const About = () => {
  const { theme, currentTheme } = useTheme();

  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tinted Glass */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-block p-4 sm:p-6 rounded-2xl backdrop-blur-none ${
            currentTheme === 'extrovert' 
              ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
              : 'bg-gradient-to-b from-white to-gray-50 border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]'
          }`}>
            <h2 
              className={`${
                currentTheme === 'minimalist' 
                  ? 'text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold tracking-tight minimalist-heading' 
                  : 'text-2xl sm:text-3xl lg:text-4xl mb-4 transition-all duration-1000 brutalist-heading'
              }`}
              style={{ color: theme.colors.text }}
            >
              About <span style={{ color: theme.colors.textSecondary }}>Me</span>
            </h2>
            <p 
              className={`max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                currentTheme === 'extrovert' ? 'brutalist-all' : ''
              }`}
              style={{ color: theme.colors.textSecondary }}
            >
              Get to know me better - my passion, skills, and what drives me in the world of technology
            </p>
          </div>
        </div>

        {/* Professional Experience Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Who I Am */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`p-6 rounded-2xl backdrop-blur-none ${
                currentTheme === 'extrovert' 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-gradient-to-b from-white to-gray-50 border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gradient-to-b from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                    : 'bg-black text-white'
                }`}>
                  <User size={24} />
                </div>
                <h3 className={`text-xl font-bold ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                }`} style={{ color: theme.colors.text }}>
                  Who I Am
                </h3>
              </div>
              <p className={`leading-relaxed mb-4 ${
                currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
              }`} style={{ color: theme.colors.textSecondary }}>
                A passionate Computer Science student specializing in AI/ML, with a love for creating innovative solutions that make a difference.
              </p>
              <ul className="space-y-2">
                {[
                  "Currently pursuing B.Tech in CSE & AI",
                  "3+ years of hands-on programming experience",
                  "Strong foundation in algorithms and data structures",
                  "Always eager to learn new technologies"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span className={`text-sm ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`} style={{ color: theme.colors.textSecondary }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What I Do */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-6 rounded-2xl backdrop-blur-none ${
                currentTheme === 'extrovert' 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-gradient-to-b from-white to-gray-50 border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gradient-to-b from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                    : 'bg-black text-white'
                }`}>
                  <Code size={24} />
                </div>
                <h3 className={`text-xl font-bold ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                }`} style={{ color: theme.colors.text }}>
                  What I Do
                </h3>
              </div>
              <p className={`leading-relaxed mb-4 ${
                currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
              }`} style={{ color: theme.colors.textSecondary }}>
                Full-stack development with expertise in React, Node.js, and modern web technologies. I build scalable applications with clean, maintainable code.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Frontend: React, TypeScript, Next.js",
                  "Backend: Node.js, Express, MongoDB",
                  "AI/ML: Python, TensorFlow, PyTorch",
                  "Tools: Git, Docker, AWS, Vercel"
                ].map((skill, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                      : 'bg-black/20 border-2 border-black'
                  }`}>
                    <span className={`text-sm font-medium ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`} style={{ color: theme.colors.text }}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* My Goals */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`p-6 rounded-2xl backdrop-blur-none ${
                currentTheme === 'extrovert' 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-gradient-to-b from-white to-gray-50 border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gradient-to-b from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                    : 'bg-black text-white'
                }`}>
                  <Target size={24} />
                </div>
                <h3 className={`text-xl font-bold ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                }`} style={{ color: theme.colors.text }}>
                  My Goals
                </h3>
              </div>
              <p className={`leading-relaxed mb-4 ${
                currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
              }`} style={{ color: theme.colors.textSecondary }}>
                Aspiring to become a leading software engineer who creates impactful technology solutions for real-world problems.
              </p>
              <ul className="space-y-2">
                {[
                  "Secure a challenging internship in tech",
                  "Contribute to open-source projects",
                  "Master advanced AI/ML concepts",
                  "Build products that help millions of users"
                ].map((goal, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <span className={`text-sm ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`} style={{ color: theme.colors.textSecondary }}>
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What Drives Me */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-6 rounded-2xl backdrop-blur-none ${
                currentTheme === 'extrovert' 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-gradient-to-b from-white to-gray-50 border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${
                  currentTheme === 'minimalist' 
                    ? 'bg-gradient-to-b from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                    : 'bg-black text-white'
                }`}>
                  <Heart size={24} />
                </div>
                <h3 className={`text-xl font-bold ${
                  currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                }`} style={{ color: theme.colors.text }}>
                  What Drives Me
                </h3>
              </div>
              <p className={`leading-relaxed mb-4 ${
                currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
              }`} style={{ color: theme.colors.textSecondary }}>
                The excitement of solving problems, learning new technologies, and creating solutions that positively impact people's lives.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Problem-solving",
                  "Continuous learning",
                  "Team collaboration",
                  "Innovation"
                ].map((trait, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      currentTheme === 'minimalist' 
                        ? 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 border border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                        : 'bg-black text-white border-2 border-black'
                    } ${currentTheme === 'extrovert' ? 'brutalist-all' : ''}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;