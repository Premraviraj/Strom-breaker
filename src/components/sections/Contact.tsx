"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp, itemVariants } from "@/lib/animations";
import { useTheme } from "../../contexts/ThemeContext";

const Contact = () => {
  const { theme, currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Premraviraj0906@gmail.com",
      href: "mailto:Premraviraj0906@gmail.com",
      color: "text-foreground",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6360663007",
      href: "tel:+916360663007",
      color: "text-foreground",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kolar, Karnataka, India",
      href: "#",
      color: "text-foreground",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Premraviraj",
      color: "hover:text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/prem-r",
      color: "hover:text-foreground",
    },
    {
      icon: ExternalLink,
      label: "Credly",
      href: "https://www.credly.com/users/prem-r.96cb47ba/",
      color: "hover:text-foreground",
    },
    {
      icon: ExternalLink,
      label: "Google Skills",
      href: "https://www.cloudskillsboost.google/public_profiles/e94b85fd-424e-4c69-b51f-0d6189b131d0",
      color: "hover:text-foreground",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            {/* Header Container with Tinted Glass */}
            <div className={`inline-block p-4 sm:p-6 rounded-2xl backdrop-blur-md ${
              isExtrovert 
                ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                : 'bg-white/15 border border-gray-300/30 shadow-lg'
            }`}>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl mb-4 ${
                currentTheme === 'minimalist' 
                  ? 'font-bold tracking-tight minimalist-heading' 
                  : 'brutalist-heading'
              }`} style={{ color: theme.colors.text }}>
                Get In <span style={{ color: theme.colors.textSecondary }}>Touch</span>
              </h2>
              <p className={`max-w-2xl mx-auto ${
                currentTheme === 'extrovert' ? 'brutalist-all' : ''
              }`} style={{ color: theme.colors.textSecondary }}>
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card className={`h-full backdrop-blur-md ${
                isExtrovert 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-white/15 border border-gray-300/30 shadow-lg'
              }`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6" style={{ color: theme.colors.text }}>Let's Connect</h3>
                  <p className="mb-8 leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                    I'm currently seeking internship opportunities where I can contribute 
                    to innovative projects and continue learning. Whether you have a project 
                    in mind, want to collaborate, or just want to say hello, I'd love to hear from you!
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <motion.div
                        key={info.label}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a
                          href={info.href}
                          className="flex items-center group cursor-pointer"
                        >
                          <div className={`p-3 rounded-lg mr-4 group-hover:bg-primary/10 transition-colors duration-200`} style={{ backgroundColor: theme.colors.surface }}>
                            <info.icon className="h-5 w-5" style={{ color: theme.colors.text }} />
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>{info.label}</p>
                            <p className="font-medium group-hover:text-primary transition-colors duration-200" style={{ color: theme.colors.text }}>
                              {info.value}
                            </p>
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                    <h4 className="font-semibold mb-4" style={{ color: theme.colors.text }}>Find me online</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((link) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg transition-all duration-200`}
                          style={{ backgroundColor: theme.colors.surface, color: theme.colors.text }}
                          title={link.label}
                        >
                          <link.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants}>
              <Card className={`h-full backdrop-blur-md ${
                isExtrovert 
                  ? 'bg-white/20 border-4 border-black shadow-[8px_8px_0px_0px_#000000]' 
                  : 'bg-white/15 border border-gray-300/30 shadow-lg'
              }`}>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: theme.colors.surface }}>
                      <Mail className="h-12 w-12" style={{ color: theme.colors.text }} />
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.text }}>Ready to Start a Conversation?</h3>
                    <p className="mb-8 leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                      I'm actively looking for internship opportunities and exciting projects 
                      to work on. Let's discuss how we can create something amazing together!
                    </p>

                    <div className="space-y-4">
                      <Button size="lg" className={`w-full ${theme.styles.buttonClass}`} asChild>
                        <a href="mailto:Premraviraj0906@gmail.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Send me an email
                        </a>
                      </Button>
                      
                      <Button variant="outline" size="lg" className={`w-full ${theme.styles.cardClass}`} asChild>
                        <a href="https://linkedin.com/in/prem-r" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                    </div>

                    <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface }}>
                      <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                        <strong style={{ color: theme.colors.text }}>Current Status:</strong> Available for internships and freelance projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="pt-8" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
              <p style={{ color: theme.colors.textSecondary }}>
                © 2024 Prem R. Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;