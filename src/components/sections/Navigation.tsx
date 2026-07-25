"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Smile } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowName(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Github,   href: "https://github.com/Premraviraj",                         label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/prem-r-8b8337247/",          label: "LinkedIn" },
    { icon: Mail,     href: "mailto:Premraviraj0906@gmail.com",                        label: "Email" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full
        ${scrolled
          ? "w-[92%] max-w-3xl bg-white/90 backdrop-blur-md shadow-xl shadow-black/5 py-2.5 px-4"
          : "w-[96%] max-w-7xl bg-transparent py-3 px-2"
        }`}
    >
      <div className="flex justify-between items-center gap-3">

        {/* Logo + Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
              scrolled ? "bg-[#0038FF] text-white" : "bg-white text-[#0038FF] shadow-md"
            }`}
          >
            <Smile size={18} />
          </motion.div>

          <AnimatePresence>
            {(showName || !scrolled) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-base tracking-tight text-[#062314] overflow-hidden whitespace-nowrap"
              >
                Prem R.
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Social links — icons only on mobile, icons + tooltip on hover on desktop */}
        <div className="flex items-center gap-1">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? "text-[#062314] hover:bg-[#0038FF] hover:text-white"
                  : "bg-white text-[#062314] shadow-md hover:bg-[#0038FF] hover:text-white"
              }`}
            >
              <link.icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;