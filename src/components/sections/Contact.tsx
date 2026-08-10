"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Mail, Instagram, CheckCircle2, ArrowRight, Copy } from "lucide-react";
import FadeInWhenVisible from "../animations/FadeInWhenVisible";

const socialLinks = [
  { icon: Github, label: "GitHub", handle: "@Premraviraj", href: "https://github.com/Premraviraj", color: "#062314" },
  { icon: Linkedin, label: "LinkedIn", handle: "prem-r", href: "https://www.linkedin.com/in/prem-r-8b8337247/", color: "#0038FF" },
  { icon: Instagram, label: "Instagram", handle: "@_optimus_prem", href: "https://www.instagram.com/_optimus_prem", color: "#FF3B30" },
  { icon: Mail, label: "Email", handle: "Premraviraj0906@gmail.com", href: "mailto:Premraviraj0906@gmail.com", color: "#FFE800" },
];

const prompts = [
  "I have a project idea…",
  "I want to collaborate…",
  "I'd like to hire you…",
  "Just saying hi 👋",
];

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptClick = (prompt: string) => {
    setActivePrompt(prompt);
    setMessage(prompt + " ");
    textareaRef.current?.focus();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Premraviraj0906@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setMessage("");
      setActivePrompt(null);
    }, 4000);
  };

  return (
    <section id="contact" className="w-full relative z-10 bg-[#fdfbfb] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mb-16">
            <h2 className="text-[clamp(4rem,12vw,10rem)] font-black text-[#062314] tracking-tighter leading-[0.85]">
              Let&apos;s<br />
              <span className="text-[#0038FF]">Talk.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* LEFT — Form */}
          <FadeInWhenVisible delay={0.1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center gap-6 h-full min-h-[400px] bg-[#0038FF] rounded-[3rem] p-16"
                >
                  <CheckCircle2 size={80} className="text-[#FFE800]" />
                  <h3 className="text-4xl font-black text-white">Message Sent!</h3>
                  <p className="text-xl text-white/80 font-medium">
                    Thanks {name}! I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  initial={{ opacity: 1 }}
                >
                  {/* Quick-start prompts */}
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#062314]/40 mb-3">
                      Quick start →
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {prompts.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePromptClick(p)}
                          className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                            activePrompt === p
                              ? "bg-[#0038FF] text-white border-[#0038FF]"
                              : "bg-white text-[#062314] border-[#062314]/10 hover:border-[#0038FF] hover:text-[#0038FF]"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-6 py-5 bg-white border-2 border-[#062314]/10 rounded-2xl text-xl font-medium text-[#062314] placeholder:text-[#062314]/30 focus:outline-none focus:border-[#0038FF] transition-colors"
                  />

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      placeholder="Your message…"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-6 py-5 bg-white border-2 border-[#062314]/10 rounded-2xl text-xl font-medium text-[#062314] placeholder:text-[#062314]/30 focus:outline-none focus:border-[#0038FF] transition-colors resize-none"
                    />
                    <span className="absolute bottom-4 right-5 text-xs text-[#062314]/30 font-mono">
                      {message.length}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!name || !message}
                    className="flex items-center justify-center gap-4 w-full py-6 bg-[#0038FF] text-white rounded-2xl font-black text-xl shadow-[0_10px_40px_rgba(0,56,255,0.3)] hover:shadow-[0_15px_50px_rgba(0,56,255,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send Message
                    <Send size={24} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeInWhenVisible>

          {/* RIGHT — Social links */}
          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 12 }}
                  className="group flex items-center justify-between p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#062314] transition-all duration-200 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: link.color === "#FFE800" ? "#FFE800" : link.color + "15" }}
                    >
                      <link.icon
                        size={26}
                        style={{ color: link.color === "#FFE800" ? "#062314" : link.color }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest text-[#062314]/40">{link.label}</p>
                      <p className="text-lg font-bold text-[#062314]">{link.handle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    size={24}
                    className="text-[#062314]/20 group-hover:text-[#0038FF] group-hover:translate-x-2 transition-all"
                  />
                </motion.a>
              ))}

              {/* Copy email pill */}
              <motion.button
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center justify-center gap-3 py-4 px-6 bg-[#FFE800] text-[#062314] rounded-full font-black text-base tracking-wide transition-all"
              >
                <AnimatePresence mode="wait">
                  {copiedEmail ? (
                    <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 size={18} /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <Copy size={18} /> Copy Email Address
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default Contact;