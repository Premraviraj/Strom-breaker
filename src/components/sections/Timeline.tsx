"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Award, BookOpen, Code, Briefcase, Trophy, GraduationCap, X, Github, ExternalLink, CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Timeline = () => {
  const { theme, currentTheme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const timelineData = [
    {
      date: "Dec 2022",
      title: "Started B.Tech CSE & AI",
      organization: "Sri Venkateshwara College",
      description: "Began my journey in Computer Science and Artificial Intelligence, building a strong foundation in programming and emerging technologies.",
      detailedDescription: "Embarked on a comprehensive 4-year Bachelor's program in Computer Science Engineering with specialization in Artificial Intelligence. The curriculum covers fundamental computer science concepts, advanced AI/ML techniques, and practical application development.",
      highlights: [
        "Current CGPA: 7.3/10",
        "Focus on AI/ML algorithms and implementation",
        "Strong foundation in data structures and algorithms",
        "Hands-on experience with modern programming languages",
        "Expected graduation: 2026"
      ],
      skills: ["Python", "Java", "C++", "Data Structures", "Algorithms", "Mathematics", "AI/ML Fundamentals"],
      achievements: ["Dean's List recognition", "Active participation in coding competitions", "Member of AI/ML club"],
      icon: GraduationCap,
      type: "education",
      size: "large",
      status: "ongoing"
    },
    {
      date: "Sep 2023",
      title: "Vehicle Monitoring System",
      organization: "Live Surveillance Project",
      description: "Developed a real-time vehicle monitoring system using surveillance cameras with Three.js 3D visualizations and GSAP animations.",
      detailedDescription: "Created an advanced real-time vehicle monitoring system that processes live surveillance camera feeds to track and analyze vehicle movements. The system features interactive 3D visualizations and smooth animations for enhanced user experience.",
      highlights: [
        "Real-time video processing and analysis",
        "Interactive 3D vehicle tracking interface",
        "Smooth animations using GSAP library",
        "Live data visualization dashboard",
        "Multi-camera feed integration"
      ],
      skills: ["React.js", "Three.js", "GSAP", "WebRTC", "Computer Vision", "Real-time Processing"],
      achievements: ["Successfully deployed for campus security", "Reduced manual monitoring effort by 60%"],
      icon: Code,
      type: "project",
      size: "medium",
      status: "completed"
    },
    {
      date: "Oct 2023",
      title: "Expense Tracker - Hackathon Winner",
      organization: "24hr Hackathon",
      description: "Built a full-stack React application with TypeScript for expense tracking, featuring LSTM-based predictive analytics for savings goals.",
      detailedDescription: "Developed a comprehensive expense tracking application during a 24-hour hackathon. The application uses machine learning to predict spending patterns and help users achieve their financial goals through intelligent recommendations.",
      highlights: [
        "Full-stack React application with TypeScript",
        "LSTM neural network for expense prediction",
        "Interactive data visualization charts",
        "Goal-based savings recommendations",
        "Secure user authentication and data storage"
      ],
      skills: ["React", "TypeScript", "Node.js", "LSTM", "TensorFlow", "Chart.js", "MongoDB"],
      achievements: ["1st Place Winner", "Best Technical Implementation Award", "50+ active users post-launch"],
      icon: Trophy,
      type: "achievement",
      size: "large",
      status: "completed",
      link: "https://github.com/Premraviraj/ex_track"
    },
    {
      date: "Nov 2023",
      title: "Idea-thon 2nd Prize",
      organization: "College Technical Fest",
      description: "Presented an innovative expense tracking solution to industry experts and secured second place among competing teams.",
      detailedDescription: "Pitched the expense tracker project to a panel of industry experts and venture capitalists. The presentation focused on the business model, technical innovation, and market potential of the AI-powered financial management solution.",
      highlights: [
        "Presented to 5+ industry experts",
        "Competed against 20+ teams",
        "Comprehensive business plan presentation",
        "Technical demonstration of AI features",
        "Market analysis and growth strategy"
      ],
      skills: ["Presentation", "Business Planning", "Market Analysis", "Public Speaking"],
      achievements: ["2nd Place Winner", "Best Innovation Award", "Mentorship opportunity with industry experts"],
      icon: Award,
      type: "achievement",
      size: "small",
      status: "completed"
    },
    {
      date: "Dec 2023",
      title: "Generative AI Certification",
      organization: "Google Cloud",
      description: "Completed comprehensive course on Generative AI fundamentals, machine learning concepts, and practical applications.",
      detailedDescription: "Successfully completed Google Cloud's comprehensive Generative AI certification program, covering fundamental concepts, practical implementations, and real-world applications of generative artificial intelligence technologies.",
      highlights: [
        "Comprehensive study of generative AI models",
        "Hands-on experience with Google Cloud AI tools",
        "Understanding of transformer architectures",
        "Practical implementation of AI solutions",
        "Industry-recognized certification"
      ],
      skills: ["Generative AI", "Machine Learning", "Google Cloud Platform", "Python", "TensorFlow", "Neural Networks"],
      achievements: ["Google Cloud Certified", "Completed all practical labs", "Score: 95%"],
      icon: Award,
      type: "certificate",
      size: "medium",
      status: "completed"
    },
    {
      date: "Feb 2024",
      title: "Smart India Hackathon - Top 30",
      organization: "National Competition",
      description: "Developed AI-powered traffic management solution using YOLOv8, CNN, and LSTM, competing against 1000+ teams nationwide.",
      detailedDescription: "Participated in India's largest hackathon with over 1000+ teams nationwide. Developed an intelligent traffic management system using cutting-edge computer vision and machine learning technologies to optimize traffic flow and reduce congestion.",
      highlights: [
        "Competed against 1000+ teams nationwide",
        "YOLOv8-based real-time vehicle detection",
        "CNN for traffic pattern recognition",
        "LSTM for traffic flow prediction",
        "Top 3% performance nationally"
      ],
      skills: ["YOLOv8", "Computer Vision", "CNN", "LSTM", "Python", "OpenCV", "Team Leadership"],
      achievements: ["Top 30 Finalist", "National Recognition", "Government mentorship program"],
      icon: Trophy,
      type: "achievement",
      size: "large",
      status: "completed"
    },
    {
      date: "Mar 2024",
      title: "UAV Disaster System Research",
      organization: "BEL-IETE Symposium",
      description: "Published research paper on UAVs for disaster identification and alerting systems, focusing on AI, IoT, and aerial vehicle systems.",
      detailedDescription: "Conducted extensive research on unmanned aerial vehicles (UAVs) for disaster management applications. The research focuses on integrating AI, IoT sensors, and aerial vehicle systems to create an autonomous disaster identification and alerting system.",
      highlights: [
        "Published at BEL Academy of Excellence",
        "Focus on AI-powered disaster detection",
        "Integration of IoT sensors with UAV systems",
        "Autonomous flight path optimization",
        "Real-time disaster alerting mechanism"
      ],
      skills: ["Research", "Technical Writing", "AI/ML", "IoT", "UAV Systems", "Data Analysis"],
      achievements: ["Published Research Paper", "Presented at National Symposium", "Peer Review Recognition"],
      icon: BookOpen,
      type: "publication",
      size: "medium",
      status: "completed"
    },
    {
      date: "Dec 2024",
      title: "EcoTravel Platform",
      organization: "Sustainable Tourism Project",
      description: "Built full-stack web application with blockchain technology, cryptocurrency rewards, and carbon footprint tracking for eco-friendly travel.",
      detailedDescription: "Developed a comprehensive sustainable tourism platform that incentivizes eco-friendly travel choices through blockchain-based rewards. The platform features real-time carbon footprint tracking, cryptocurrency rewards, and gamification elements to promote environmental consciousness.",
      highlights: [
        "Custom EcoTokens cryptocurrency reward system",
        "Real-time CO2 emissions calculator",
        "Interactive route planning with environmental impact",
        "3D avatar system and gamification",
        "Secure blockchain integration with Web3",
        "Data visualization dashboards"
      ],
      skills: ["React.js", "Node.js", "MongoDB", "Blockchain", "Web3", "Cryptocurrency", "Leaflet Maps", "Chart.js", "Framer Motion"],
      achievements: ["Fully functional platform", "Blockchain integration", "Environmental impact calculator"],
      icon: Code,
      type: "project",
      size: "large",
      status: "completed",
      link: "https://github.com/Premraviraj/Mjolnior.git"
    },
    {
      date: "Jun 2024 - Present",
      title: "Technical Writer Internship",
      organization: "Nokia",
      description: "Creating comprehensive API documentation for software products and collaborating with global engineering teams to enhance developer experience.",
      detailedDescription: "Working as a Technical Writer intern at Nokia, one of the world's leading telecommunications companies. Responsible for creating user-friendly documentation for complex technical products and collaborating with global engineering teams across multiple time zones.",
      highlights: [
        "Creating API documentation for 5+ software products",
        "Collaborating with teams across 3 different countries",
        "Improving documentation clarity based on user feedback",
        "Streamlining documentation processes",
        "Working with cutting-edge telecommunications technology",
        "Establishing company-wide documentation standards"
      ],
      skills: ["Technical Writing", "API Documentation", "Cross-team Collaboration", "Process Improvement", "User Research", "Content Strategy"],
      achievements: [
        "Enhanced developer experience for 100+ engineers",
        "Reduced documentation-related support tickets by 30%",
        "Established new documentation standards adopted company-wide",
        "Received positive feedback from engineering teams"
      ],
      icon: Briefcase,
      type: "experience",
      size: "extra-large",
      status: "ongoing"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      education: currentTheme === 'minimalist' ? theme.colors.primary : '#FF6B9D',
      project: currentTheme === 'minimalist' ? theme.colors.secondary : '#00FF80',
      achievement: currentTheme === 'minimalist' ? '#f59e0b' : '#FFD93D',
      certificate: currentTheme === 'minimalist' ? '#10b981' : '#00FF80',
      publication: currentTheme === 'minimalist' ? '#8b5cf6' : '#FF6B9D',
      experience: '#FFD93D' // Always yellow for Nokia
    };
    return colors[type as keyof typeof colors] || theme.colors.primary;
  };

  const getTypeColorWithOpacity = (type: string, opacity: number = 0.3) => {
    const baseColor = getTypeColor(type);
    // Convert hex to rgba
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getSizeClasses = (size: string) => {
    const sizeMap = {
      'small': 'col-span-1 row-span-1',
      'medium': 'col-span-1 row-span-2',
      'large': 'col-span-2 row-span-2',
      'extra-large': 'col-span-2 row-span-3'
    };
    return sizeMap[size as keyof typeof sizeMap] || 'col-span-1 row-span-1';
  };

  return (
    <section id="timeline" className="py-16 sm:py-20">
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
            My <motion.span 
              style={{ color: theme.colors.textSecondary }}
              whileHover={{ 
                color: theme.colors.primary,
                transition: { duration: 0.3 }
              }}
            >
              Journey
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
            Click on any milestone to explore detailed information about my projects, achievements, and experiences
          </motion.p>
        </motion.div>

        {/* Masonry Grid Layout - Clean and Organized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          {/* Row 1: Education (large), Vehicle Monitoring (medium), Expense Tracker (extra large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 * 0.1 }}
            className="col-span-1 group cursor-pointer"
            onClick={() => setSelectedItem(0)}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className={`w-full h-80 p-6 relative overflow-hidden transition-all duration-300 ${
                currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
              }`}
              style={{
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : getTypeColorWithOpacity(timelineData[0].type, 0.4),
                border: currentTheme === 'minimalist' 
                  ? `1px solid ${theme.colors.border}`
                  : `4px solid #000000`,
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  : `8px 8px 0px 0px #000000`,
                backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
              }}
              whileHover={{
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)`
                  : `12px 12px 0px 0px #000000`,
                transition: { duration: 0.3 }
              }}
            >
              {currentTheme === 'extrovert' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                  <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                  <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`p-2 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-800 rounded-lg' 
                      : 'bg-black text-white transform -rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  {(() => {
                    const IconComponent = timelineData[0].icon;
                    return (
                      <IconComponent 
                        size={20} 
                        color={currentTheme === 'minimalist' ? getTypeColor(timelineData[0].type) : "#FFFFFF"}
                        style={{ strokeWidth: 2 }}
                      />
                    );
                  })()}
                </div>
                <div 
                  className={`text-xs font-bold px-2 py-1 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-md' 
                      : 'bg-black text-white transform rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }}
                >
                  Academic
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 
                  className={`text-lg font-bold mb-2 leading-tight ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {timelineData[0].title}
                </h3>
                <p 
                  className={`text-sm font-medium mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                  }}
                >
                  {timelineData[0].organization}
                </p>
                <p 
                  className={`text-xs leading-relaxed flex-1 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                >
                  {timelineData[0].description.length > 120 ? `${timelineData[0].description.substring(0, 120)}...` : timelineData[0].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 * 0.1 }}
            className="col-span-1 group cursor-pointer"
            onClick={() => setSelectedItem(1)}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className={`w-full h-80 p-6 relative overflow-hidden transition-all duration-300 ${
                currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
              }`}
              style={{
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : getTypeColorWithOpacity(timelineData[1].type, 0.4),
                border: currentTheme === 'minimalist' 
                  ? `1px solid ${theme.colors.border}`
                  : `4px solid #000000`,
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  : `8px 8px 0px 0px #000000`,
                backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
              }}
              whileHover={{
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)`
                  : `12px 12px 0px 0px #000000`,
                transition: { duration: 0.3 }
              }}
            >
              {currentTheme === 'extrovert' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                  <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                  <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`p-2 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-800 rounded-lg' 
                      : 'bg-black text-white transform -rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  {(() => {
                    const IconComponent = timelineData[1].icon;
                    return (
                      <IconComponent 
                        size={20} 
                        color={currentTheme === 'minimalist' ? getTypeColor(timelineData[1].type) : "#FFFFFF"}
                        style={{ strokeWidth: 2 }}
                      />
                    );
                  })()}
                </div>
                <div 
                  className={`text-xs font-bold px-2 py-1 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-md' 
                      : 'bg-black text-white transform rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }}
                >
                  Technical
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 
                  className={`text-lg font-bold mb-2 leading-tight ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {timelineData[1].title}
                </h3>
                <p 
                  className={`text-sm font-medium mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                  }}
                >
                  {timelineData[1].organization}
                </p>
                <p 
                  className={`text-xs leading-relaxed flex-1 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                >
                  {timelineData[1].description.length > 120 ? `${timelineData[1].description.substring(0, 120)}...` : timelineData[1].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 * 0.1 }}
            className="col-span-1 md:col-span-2 group cursor-pointer"
            onClick={() => setSelectedItem(2)}
          >
            <div 
              className={`w-full h-80 p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
              }`}
              style={{
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : getTypeColorWithOpacity(timelineData[2].type, 0.4),
                border: currentTheme === 'minimalist' 
                  ? `1px solid ${theme.colors.border}`
                  : `4px solid #000000`,
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  : `8px 8px 0px 0px #000000`,
                backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
              }}
            >
              {currentTheme === 'extrovert' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                  <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                  <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`p-2 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-800 rounded-lg' 
                      : 'bg-black text-white transform -rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  {(() => {
                    const IconComponent = timelineData[2].icon;
                    return (
                      <IconComponent 
                        size={20} 
                        color={currentTheme === 'minimalist' ? getTypeColor(timelineData[2].type) : "#FFFFFF"}
                        style={{ strokeWidth: 2 }}
                      />
                    );
                  })()}
                </div>
                <div 
                  className={`text-xs font-bold px-2 py-1 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-md' 
                      : 'bg-black text-white transform rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }}
                >
                  Technical
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 
                  className={`text-xl font-bold mb-2 leading-tight ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {timelineData[2].title}
                </h3>
                <p 
                  className={`text-sm font-medium mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                  }}
                >
                  {timelineData[2].organization}
                </p>
                <p 
                  className={`text-sm leading-relaxed flex-1 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                >
                  {timelineData[2].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 2: Four equal cards */}
          {[3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="col-span-1 group cursor-pointer"
              onClick={() => setSelectedItem(index)}
            >
              <div 
                className={`w-full h-64 p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
                }`}
                style={{
                  backgroundColor: currentTheme === 'minimalist' 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : getTypeColorWithOpacity(timelineData[index].type, 0.4),
                  border: currentTheme === 'minimalist' 
                    ? `1px solid ${theme.colors.border}`
                    : `4px solid #000000`,
                  boxShadow: currentTheme === 'minimalist' 
                    ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                    : `8px 8px 0px 0px #000000`,
                  backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                  color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
                }}
              >
                {currentTheme === 'extrovert' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                    <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                    <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                    <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className={`p-2 ${
                      currentTheme === 'minimalist' 
                        ? 'bg-gray-100 text-gray-800 rounded-lg' 
                        : 'bg-black text-white transform -rotate-2'
                    } transition-transform duration-300 group-hover:rotate-0`}
                    style={{
                      boxShadow: currentTheme === 'minimalist' 
                        ? 'none' 
                        : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    {(() => {
                      const IconComponent = timelineData[index].icon;
                      return (
                        <IconComponent 
                          size={18} 
                          color={currentTheme === 'minimalist' ? getTypeColor(timelineData[index].type) : "#FFFFFF"}
                          style={{ strokeWidth: 2 }}
                        />
                      );
                    })()}
                  </div>
                  <div 
                    className={`text-xs font-bold px-2 py-1 ${
                      currentTheme === 'minimalist' 
                        ? 'bg-gray-100 text-gray-700 rounded-md' 
                        : 'bg-black text-white transform rotate-2'
                    } transition-transform duration-300 group-hover:rotate-0`}
                    style={{
                      boxShadow: currentTheme === 'minimalist' 
                        ? 'none' 
                        : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                      fontWeight: '700'
                    }}
                  >
                    {timelineData[index].type === 'achievement' ? 'Recognition' : 
                     timelineData[index].type === 'certificate' ? 'Learning' : 
                     timelineData[index].type === 'publication' ? 'Research' : 'Technical'}
                  </div>
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 
                    className={`text-base font-bold mb-2 leading-tight ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                    }`}
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                      textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                      letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                    }}
                  >
                    {timelineData[index].title}
                  </h3>
                  <p 
                    className={`text-sm font-medium mb-3 ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : ''
                    }`}
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                    }}
                  >
                    {timelineData[index].organization}
                  </p>
                  <p 
                    className={`text-xs leading-relaxed flex-1 ${
                      currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                    }`}
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                    }}
                  >
                    {timelineData[index].description.length > 80 ? `${timelineData[index].description.substring(0, 80)}...` : timelineData[index].description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Row 3: Two large cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 7 * 0.1 }}
            className="col-span-1 md:col-span-2 group cursor-pointer"
            onClick={() => setSelectedItem(7)}
          >
            <div 
              className={`w-full h-80 p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
              }`}
              style={{
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : getTypeColorWithOpacity(timelineData[7].type, 0.4),
                border: currentTheme === 'minimalist' 
                  ? `1px solid ${theme.colors.border}`
                  : `4px solid #000000`,
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  : `8px 8px 0px 0px #000000`,
                backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
              }}
            >
              {currentTheme === 'extrovert' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                  <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                  <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`p-2 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-800 rounded-lg' 
                      : 'bg-black text-white transform -rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  {(() => {
                    const IconComponent = timelineData[7].icon;
                    return (
                      <IconComponent 
                        size={20} 
                        color={currentTheme === 'minimalist' ? getTypeColor(timelineData[7].type) : "#FFFFFF"}
                        style={{ strokeWidth: 2 }}
                      />
                    );
                  })()}
                </div>
                <div 
                  className={`text-xs font-bold px-2 py-1 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-md' 
                      : 'bg-black text-white transform rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }}
                >
                  Technical
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 
                  className={`text-xl font-bold mb-2 leading-tight ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {timelineData[7].title}
                </h3>
                <p 
                  className={`text-sm font-medium mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                  }}
                >
                  {timelineData[7].organization}
                </p>
                <p 
                  className={`text-sm leading-relaxed flex-1 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                >
                  {timelineData[7].description}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 8 * 0.1 }}
            className="col-span-1 md:col-span-2 group cursor-pointer"
            onClick={() => setSelectedItem(8)}
          >
            <div 
              className={`w-full h-80 p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
              }`}
              style={{
                backgroundColor: currentTheme === 'minimalist' 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : getTypeColorWithOpacity(timelineData[8].type, 0.4),
                border: currentTheme === 'minimalist' 
                  ? `1px solid ${theme.colors.border}`
                  : `4px solid #000000`,
                boxShadow: currentTheme === 'minimalist' 
                  ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
                  : `8px 8px 0px 0px #000000`,
                backdropFilter: currentTheme === 'minimalist' ? 'blur(10px)' : 'blur(8px)',
                color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
              }}
            >
              {currentTheme === 'extrovert' && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black transform rotate-45" />
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full" />
                  <div className="absolute bottom-4 left-3 w-2 h-6 bg-black transform rotate-12" />
                  <div className="absolute bottom-2 right-2 w-6 h-2 bg-black transform rotate-45" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`p-2 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-800 rounded-lg' 
                      : 'bg-black text-white transform -rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)'
                  }}
                >
                  {(() => {
                    const IconComponent = timelineData[8].icon;
                    return (
                      <IconComponent 
                        size={24} 
                        color={currentTheme === 'minimalist' ? '#FFD93D' : "#FFFFFF"}
                        style={{ strokeWidth: 2 }}
                      />
                    );
                  })()}
                </div>
                <div 
                  className={`text-xs font-bold px-2 py-1 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-md' 
                      : 'bg-black text-white transform rotate-2'
                  } transition-transform duration-300 group-hover:rotate-0`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? 'none' 
                      : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    fontWeight: '700'
                  }}
                >
                  Professional
                </div>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 
                  className={`text-xl font-bold mb-2 leading-tight ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-subheading'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                    textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                    letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                  }}
                >
                  {timelineData[8].title}
                </h3>
                <p 
                  className={`text-sm font-medium mb-3 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : ''
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                  }}
                >
                  {timelineData[8].organization}
                </p>
                <p 
                  className={`text-sm leading-relaxed flex-1 ${
                    currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-body'
                  }`}
                  style={{ 
                    color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                    fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                  }}
                >
                  {timelineData[8].description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`relative max-w-4xl w-full max-h-[90vh] overflow-auto ${
                  currentTheme === 'minimalist' ? 'rounded-lg' : 'rounded-none'
                }`}
                style={{
                  backgroundColor: currentTheme === 'minimalist' 
                    ? 'rgba(255, 255, 255, 0.95)'
                    : getTypeColor(timelineData[selectedItem].type),
                  border: currentTheme === 'minimalist' 
                    ? `1px solid ${theme.colors.border}`
                    : `4px solid #000000`,
                  boxShadow: currentTheme === 'minimalist' 
                    ? `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
                    : `12px 12px 0px 0px #000000`,
                  backdropFilter: currentTheme === 'minimalist' ? 'blur(20px)' : 'none',
                  color: currentTheme === 'minimalist' ? theme.colors.text : '#000000'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className={`absolute top-4 right-4 p-3 hover:scale-110 transition-all duration-300 z-10 ${
                    currentTheme === 'minimalist' 
                      ? 'bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200' 
                      : 'bg-black text-white transform rotate-12 hover:rotate-0'
                  }`}
                  style={{
                    boxShadow: currentTheme === 'minimalist' 
                      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      : '4px 4px 0px 0px rgba(0,0,0,0.5)'
                  }}
                >
                  <X size={20} />
                </button>

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div 
                      className={`p-4 ${
                        currentTheme === 'minimalist' 
                          ? 'bg-gray-100 text-gray-800 rounded-lg' 
                          : 'bg-black text-white transform -rotate-2'
                      }`}
                      style={{
                        boxShadow: currentTheme === 'minimalist' 
                          ? 'none' 
                          : '4px 4px 0px 0px rgba(0,0,0,0.3)'
                      }}
                    >
                      {(() => {
                        const IconComponent = timelineData[selectedItem].icon;
                        return (
                          <IconComponent 
                            size={32} 
                            color={currentTheme === 'minimalist' ? getTypeColor(timelineData[selectedItem].type) : "#FFFFFF"}
                          />
                        );
                      })()}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h2 
                          className={`text-2xl font-bold ${
                            currentTheme === 'extrovert' ? 'brutalist-all' : 'minimalist-heading'
                          }`}
                          style={{ 
                            color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                            fontWeight: currentTheme === 'minimalist' ? '600' : '900',
                            textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                            letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                          }}
                        >
                          {timelineData[selectedItem].title}
                        </h2>
                        <span 
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            timelineData[selectedItem].status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {timelineData[selectedItem].status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </span>
                      </div>
                      <p 
                        className={`text-lg font-medium mb-2 ${
                          currentTheme === 'extrovert' ? 'brutalist-all' : ''
                        }`}
                        style={{ 
                          color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                          fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                        }}
                      >
                        {timelineData[selectedItem].organization}
                      </p>
                      <p 
                        className={`text-sm ${
                          currentTheme === 'extrovert' ? 'brutalist-all' : ''
                        }`}
                        style={{ 
                          color: currentTheme === 'minimalist' ? getTypeColor(timelineData[selectedItem].type) : '#666666',
                          fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                        }}
                      >
                        {timelineData[selectedItem].date}
                      </p>
                    </div>
                  </div>

                  {/* GitHub Link - Only for projects */}
                  {timelineData[selectedItem].link && (
                    <div className="mb-6">
                      <a
                        href={timelineData[selectedItem].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 transition-all duration-300 hover:scale-105 ${
                          currentTheme === 'minimalist'
                            ? 'bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200'
                            : 'bg-black text-white transform -rotate-1 hover:rotate-0'
                        }`}
                        style={{
                          boxShadow: currentTheme === 'minimalist' 
                            ? 'none' 
                            : '4px 4px 0px 0px rgba(0,0,0,0.3)'
                        }}
                      >
                        <Github size={16} />
                        <span>View Code</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {/* Description */}
                  <p 
                    className="text-base leading-relaxed mb-6"
                    style={{ 
                      color: currentTheme === 'minimalist' ? theme.colors.textSecondary : '#000000',
                      fontWeight: currentTheme === 'minimalist' ? '400' : '500'
                    }}
                  >
                    {timelineData[selectedItem].detailedDescription}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h3 
                      className={`text-lg font-semibold mb-4 ${
                        currentTheme === 'extrovert' ? 'brutalist-all' : ''
                      }`}
                      style={{ 
                        color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                        fontWeight: currentTheme === 'minimalist' ? '600' : '700',
                        textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                        letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                      }}
                    >
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {timelineData[selectedItem].highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle 
                            size={16} 
                            className="mt-1 flex-shrink-0"
                            style={{ 
                              color: currentTheme === 'minimalist' 
                                ? getTypeColor(timelineData[selectedItem].type) 
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
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills and Achievements Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {/* Skills */}
                    <div>
                      <h3 
                        className={`text-lg font-semibold mb-4 ${
                          currentTheme === 'extrovert' ? 'brutalist-all' : ''
                        }`}
                        style={{ 
                          color: currentTheme === 'minimalist' ? theme.colors.text : '#000000',
                          fontWeight: currentTheme === 'minimalist' ? '600' : '700',
                          textTransform: currentTheme === 'minimalist' ? 'none' : 'uppercase',
                          letterSpacing: currentTheme === 'minimalist' ? 'normal' : '-0.02em'
                        }}
                      >
                        Skills & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {timelineData[selectedItem].skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-sm font-medium ${
                              currentTheme === 'minimalist' 
                                ? 'bg-gray-100 text-gray-700 rounded-full' 
                                : 'bg-black text-white transform -rotate-1 hover:rotate-0'
                            } transition-transform duration-300`}
                            style={{
                              boxShadow: currentTheme === 'minimalist' 
                                ? 'none' 
                                : '2px 2px 0px 0px rgba(0,0,0,0.3)',
                              fontWeight: currentTheme === 'minimalist' ? '500' : '600'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Timeline;