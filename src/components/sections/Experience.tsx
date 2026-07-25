"use client";

import { motion } from "framer-motion";
import { SiNokia } from "react-icons/si";
import { FaFaceSmileWink } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { FileText, Cpu, GitBranch } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const achievements = [
  {
    id: "A",
    title: "5G Architecture Documentation",
    meta: "Technical Documentation",
    body: "Structured and drafted developer guides for complex 5G specifications and large-scale telecom architecture blueprints, significantly increasing developer onboarding efficiency.",
    icon: FileText,
  },
  {
    id: "B",
    title: "Design Rebranding Pipeline",
    meta: "Automation Systems",
    body: "Built and deployed a CLI tool for automated SVG rebranding across regional design teams, eliminating hundreds of hours of manual rework.",
    icon: Cpu,
  },
  {
    id: "C",
    title: "Cross-Functional API Mapping",
    meta: "Systems Integration",
    body: "Mapped distributed API architectures and data workflows across global teams — reducing integration friction and aligning cross-timezone delivery.",
    icon: GitBranch,
  },
];

const skills = [
  "5G Architecture", "REST APIs", "Technical Writing",
  "Design Automation", "SVG Tooling", "Developer Docs",
];

const Experience = () => {
  return (
    <section id="experience" className="w-full relative z-10 py-16 md:py-24">

      {/* Section heading */}
      <FadeInWhenVisible>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0038FF] mb-2">
              Work History
            </p>
            <h2 className="text-[clamp(3rem,9vw,6.5rem)] font-black text-[#062314] tracking-tighter leading-none">
              Exp<span className="text-[#0038FF]">.</span>
            </h2>
          </div>
          <p className="text-sm font-semibold text-[#062314]/40 pb-1 max-w-xs leading-relaxed">
            Oct 2025 – Jul 2026<br />Nokia · Bangalore, India
          </p>
        </div>
      </FadeInWhenVisible>

      {/* Main 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT — Nokia */}
        <div className="lg:col-span-8 space-y-4">

          {/* Company header */}
          <FadeInWhenVisible delay={0.05}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#062314]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow">
                  <SiNokia size={30} color="#0038FF" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none">Nokia</h3>
                  <p className="text-sm text-white/40 mt-0.5 font-medium">Technical Writer Intern</p>
                </div>
              </div>
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FFE800]/10 text-[#FFE800] border border-[#FFE800]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE800]" />
                Completed
              </span>
            </div>
          </FadeInWhenVisible>

          {/* Achievement rows */}
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeInWhenVisible key={item.id} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="group flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-3xl bg-white border-[1.5px] border-[#f0eeee] hover:border-[#0038FF]/20 hover:shadow-sm transition-all duration-300 cursor-default"
                >
                  {/* Letter + icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#e8e8e8] leading-none group-hover:text-[#0038FF]/20 transition-colors duration-300">
                      {item.id}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#f5f5f5] flex items-center justify-center text-[#aaa] group-hover:bg-[#0038FF]/5 group-hover:text-[#0038FF] transition-all duration-300">
                      <Icon size={15} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h4 className="text-base font-black text-[#062314] tracking-tight">{item.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0038FF] opacity-60">{item.meta}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#888]">{item.body}</p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            );
          })}

          {/* Skills */}
          <FadeInWhenVisible delay={0.35}>
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#f2f2f2] text-[#666] border border-[#e8e8e8]">
                  {s}
                </span>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>

        {/* RIGHT — Next Company */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <FadeInWhenVisible delay={0.15}>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative rounded-3xl overflow-hidden flex flex-col min-h-[500px] sm:min-h-[520px] shadow-[0_20px_60px_-15px_rgba(0,56,255,0.35)] bg-[#0038FF]"
            >
              {/* Radial highlight */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />

              {/* Decorative "?" backdrop */}
              <div className="absolute bottom-0 right-0 font-black pointer-events-none select-none leading-none text-white/[0.04]" style={{ fontSize: "18rem", transform: "translate(20%, 10%)" }}>
                ?
              </div>

              {/* Yellow top strip */}
              <div className="h-1 w-full bg-[#FFE800] shrink-0" />

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 gap-5 relative z-10">
                <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/15 text-white">
                  <FaFaceSmileWink size={12} className="text-[#FFE800] animate-bounce shrink-0" />
                  Looking for the next adventure
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Next Company</p>
                  <h3 className="font-black tracking-tighter leading-[0.9] text-white" style={{ fontSize: "clamp(2.5rem,5vw,3.2rem)" }}>
                    Yours<span className="text-[#FFE800]">?</span>
                  </h3>
                </div>

                <p className="text-sm font-semibold leading-relaxed text-white/75">
                  Now that my Nokia gig has ended, I am ready to deploy clean frontend magic to your codebase.
                </p>

                <div className="flex flex-col gap-2.5 mt-auto">
                  {[
                    "Writes React apps that build on the first try.",
                    "Coffee-to-code compiler (highly efficient).",
                    "Will not push to main on a Friday afternoon.",
                  ].map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-black/20 border border-white/8">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFE800] shrink-0 mt-1.5" />
                      <span className="text-xs font-semibold leading-snug text-white/80">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 mx-7 mb-7 mt-3 flex items-center justify-between pt-5 border-t border-white/10">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FFE800]">
                  Let&apos;s build something wild.
                </span>
                <a href="#contact" className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-[#FFE800] text-[#062314] shrink-0 shadow-lg">
                  <FiArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default Experience;