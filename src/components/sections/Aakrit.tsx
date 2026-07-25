"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Rocket } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const Aakrit = () => {
  return (
    <section id="aakrit" className="w-full relative z-10 bg-[#1a0a2e] py-24 overflow-hidden">
      {/* Decorative glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#f97316]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
            
            {/* Left — Identity */}
            <div className="flex flex-col gap-6 max-w-xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#f97316] text-white rounded-full font-black text-sm uppercase tracking-widest self-start">
                <Rocket size={16} />
                My Startup
              </div>
              <h2 className="text-[clamp(4rem,10vw,8rem)] font-black text-white tracking-tighter leading-[0.9]">
                AAKRIT<span className="text-[#f97316]">.</span>
              </h2>
              <p className="text-2xl text-white/70 font-medium leading-relaxed">
                Bespoke website development for creators and micro-businesses. High-fidelity, animated, interactive websites at affordable rates.
              </p>
            </div>

            {/* Right — CTA */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <p className="text-lg text-white/40 font-medium">
                aakrit.works@gmail.com
              </p>
              <motion.a
                href="https://aakrit.online"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-10 py-6 bg-[#f97316] text-white rounded-full font-black text-2xl shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.5)] transition-all"
              >
                Visit Aakrit
                <ArrowUpRight size={32} />
              </motion.a>
            </div>

          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default Aakrit;
