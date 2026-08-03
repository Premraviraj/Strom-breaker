"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Code2, Rocket } from "lucide-react";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [textHovered, setTextHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the blob to follow the mouse
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsClient(true);
    
    // Center the blob initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fdfbfb]">
      
      {/* Interactive Abstract Fluid Blob */}
      {isClient && (
        <motion.div
          className="absolute pointer-events-none z-0 mix-blend-multiply filter blur-3xl"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            width: "60vw",
            height: "60vw",
            maxWidth: "800px",
            maxHeight: "800px",
          }}
        >
          {/* Normal Gradient (Blue, Red, Yellow) */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, #0038FF 0%, #FF3B30 50%, #FFE800 100%)",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              animation: "morph 8s ease-in-out infinite alternate"
            }}
            animate={{ opacity: textHovered ? 0 : 0.7 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {/* Hover Gradient (Purple, Violet, Turquoise) */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, #7C3AED 0%, #EC4899 50%, #06B6D4 100%)",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              animation: "morph 8s ease-in-out infinite alternate"
            }}
            animate={{ opacity: textHovered ? 0.7 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Foreground Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
        <div 
          className="flex flex-col items-center text-center gap-6"
          onMouseEnter={() => setTextHovered(true)}
          onMouseLeave={() => setTextHovered(false)}
        >
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-massive text-[#062314] tracking-tighter leading-none mix-blend-normal">
              Prem R.
            </h1>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold mt-2 leading-none text-[#0038FF]">
              Engineer. Creator.
            </h2>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-xl md:text-3xl font-medium text-[#062314]/80 leading-relaxed mt-4"
          >
            I architect high-performance software, craft beautiful digital experiences, and build robust AI systems.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <button
              onClick={handleScroll}
              className="px-7 py-4 sm:px-10 sm:py-5 bg-[#0038FF] text-white rounded-full font-black text-base sm:text-xl shadow-[0_10px_40px_rgba(0,56,255,0.4)] hover:shadow-[0_15px_50px_rgba(0,56,255,0.6)] hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              <Code2 size={22} />
              Explore Arsenal
            </button>
            <a
              href="mailto:Premraviraj0906@gmail.com"
              className="px-7 py-4 sm:px-10 sm:py-5 bg-white text-[#062314] rounded-full font-black text-base sm:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              <Rocket size={22} />
              Contact
            </a>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}} />
    </section>
  );
};

export default Hero;