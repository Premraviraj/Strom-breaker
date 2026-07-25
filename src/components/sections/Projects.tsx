"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const projects = [
  {
    num: "01",
    title: "Pitwall",
    description: "A full-stack Formula 1 dashboard aggregating live standings, race schedules, driver profiles, circuit data, and head-to-head comparisons — all in one place.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Ergast API", "Recharts", "Framer Motion", "Vercel"],
    github: "https://github.com/Premraviraj/Fast",
    live: "https://pitwall.rprem.online/",
    bgColor: "bg-[#0038FF]",
    textColor: "text-[#FFE800]",
    descColor: "text-white/90",
    tagColor: "bg-[#FFE800]/10 text-[#FFE800]",
    iconColor: "text-[#0038FF] bg-[#FFE800]"
  },
  {
    num: "02",
    title: "ExpenseStory",
    description: "A neo-brutalist single-page finance app with auth, a narrative InsightsEngine that turns spending into stories, community budget groups with invite codes, survival prediction, and an admin portal.",
    tags: ["Vanilla JS", "Node.js", "Express", "Supabase", "PostgreSQL", "Lucide", "Vercel"],
    github: "https://github.com/Premraviraj/Expo",
    live: "https://moneymatter.rprem.online/",
    bgColor: "bg-[#FFE800]",
    textColor: "text-[#0038FF]",
    descColor: "text-[#062314]/80",
    tagColor: "bg-[#0038FF]/10 text-[#0038FF]",
    iconColor: "text-white bg-[#0038FF]"
  },
  {
    num: "03",
    title: "EcoTravel / TRIPP",
    description: "A Bangalore public transit rewards & eco-travel app. Book trips across BMTC, Namma Metro, KSRTC, and Railway — pay via Razorpay — and earn tokens proportional to distance.",
    tags: ["React 18", "Vite", "Supabase", "Razorpay", "Blockchain", "Web3", "Vercel"],
    github: "https://github.com/Premraviraj/Mjolnior",
    live: "https://tripp.rprem.online/",
    bgColor: "bg-[#FF3B30]",
    textColor: "text-white",
    descColor: "text-white/90",
    tagColor: "bg-white/20 text-white",
    iconColor: "text-[#FF3B30] bg-white"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="w-full relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-[#062314] leading-none tracking-tighter">
                Featured Work.
              </h2>
              <div className="h-2 w-32 bg-[#0038FF] mt-6"></div>
            </div>
            <p className="max-w-md text-xl text-[#062314]/70 font-medium pb-2">
              A selection of engineering projects where logic meets bold design.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <FadeInWhenVisible key={project.num} delay={index * 0.1}>
              <motion.div
                initial="initial"
                whileHover="hover"
                className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start lg:items-center ${project.bgColor} transition-colors duration-500`}
              >
                {/* Background Giant Number */}
                <div className="absolute -top-10 -right-10 text-[20rem] font-black opacity-[0.04] leading-none pointer-events-none select-none">
                  {project.num}
                </div>

                <div className="flex-1 relative z-10 w-full">
                  <div className="flex flex-col gap-6">
                    <span className={`text-2xl font-black ${project.textColor} opacity-60`}>
                      {project.num} //
                    </span>
                    <h3 className={`text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] tracking-tight ${project.textColor}`}>
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`px-4 py-2 text-sm font-bold rounded-full ${project.tagColor} tracking-wide uppercase`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 relative z-10 flex flex-col justify-between h-full w-full gap-10 lg:gap-16">
                  <p className={`text-xl md:text-2xl font-medium leading-relaxed ${project.descColor} max-w-xl`}>
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`flex items-center justify-center w-16 h-16 rounded-full ${project.iconColor} shadow-xl hover:scale-110 transition-transform duration-300`}
                    >
                      <Github size={28} />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-center w-16 h-16 rounded-full ${project.iconColor} shadow-xl hover:scale-110 transition-transform duration-300 group-hover:-rotate-12`}
                    >
                      <ArrowUpRight size={32} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
