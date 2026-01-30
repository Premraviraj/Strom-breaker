"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Users, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Traffic Management System",
      description: "Developed a YOLOv8-based vehicle detection system to count and classify vehicles in real-time. Integrated CNN model for traffic density analysis and LSTM for long-term traffic trend prediction.",
      technologies: ["Python", "YOLOv8", "CNN", "LSTM", "OpenCV", "PyTorch"],
      type: "24hr Hackathon Project",
      icon: "🚦",
      highlights: [
        "Real-time vehicle detection and classification",
        "Traffic density analysis using CNN",
        "Long-term trend prediction with LSTM",
        "Computer vision implementation"
      ]
    },
    {
      title: "Personal Expense Tracker",
      description: "Created a React application with TypeScript and backend integration to help track daily, monthly expenses. Features goal setting with reminders and LSTM-based savings prediction.",
      technologies: ["React", "TypeScript", "Node.js", "LSTM", "Chart.js"],
      type: "24hr Hackathon Project",
      icon: "💰",
      highlights: [
        "Full-stack expense tracking application",
        "Goal setting with smart reminders",
        "Predictive analytics for savings",
        "Interactive data visualization"
      ]
    },
    {
      title: "Vehicle Monitoring System",
      description: "Built a React web application to display live vehicle data from surveillance cameras. Used advanced libraries for better visualization and smooth animations.",
      technologies: ["React", "Three.js", "GSAP", "Recharts", "WebRTC"],
      type: "Live Surveillance Project",
      icon: "📹",
      highlights: [
        "Real-time vehicle monitoring dashboard",
        "3D visualizations with Three.js",
        "Smooth animations using GSAP",
        "Live camera feed integration"
      ]
    }
  ];

  const publications = [
    {
      title: "UAV's For Disaster Identification and Alerting System",
      venue: "2nd BIS Souvenir 2024 (BIS2024)",
      conference: "BEL-IETE Symposium 2024 on AI, Cyber Security, IoT and Aerial Vehicle Systems",
      organization: "IETE at BEL Academy of Excellence",
      year: "2024",
      type: "Research Publication"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my technical projects, research work, and innovative solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{project.icon}</div>
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Publications Section */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Publications & <span className="gradient-text">Research</span>
            </h3>
            
            {publications.map((publication, index) => (
              <motion.div
                key={publication.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{publication.title}</h4>
                          <p className="text-muted-foreground text-sm">{publication.venue}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{publication.year}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{publication.conference}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{publication.organization}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Interested in seeing more of my work or collaborating on a project?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a 
                  href="https://github.com/Premraviraj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;