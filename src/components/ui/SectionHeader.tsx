"use client";

import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  description, 
  className = "" 
}) => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';

  return (
    <motion.div 
      variants={fadeInUp} 
      className={`text-center mb-16 relative z-20 ${className}`}
    >
      {/* Header Container with Background */}
      <div className={`inline-block p-6 rounded-2xl backdrop-blur-md ${
        isExtrovert 
          ? 'bg-white/98 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
          : 'bg-white/95 border border-gray-200 shadow-xl'
      }`}>
        <motion.h2 
          className={`text-3xl sm:text-4xl font-bold mb-4 ${theme.styles.headerClass} relative z-10`} 
          style={{ color: theme.colors.text }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {title}
          {subtitle && (
            <span style={{ color: theme.colors.textSecondary }}> {subtitle}</span>
          )}
        </motion.h2>
        
        {description && (
          <motion.p 
            className="text-lg relative z-10"
            style={{ color: theme.colors.textSecondary }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeader;