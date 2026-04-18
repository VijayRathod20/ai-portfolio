"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/data/resume";

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Production systems I&apos;ve built — from CRM automation with Agentic AI
            to cross-platform real-time applications.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass group flex flex-col rounded-2xl p-6 transition-all hover:border-accent/50"
            >
              {/* Project Image Placeholder */}
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10 transition-all group-hover:from-accent/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20">
                <ArrowUpRight className="h-8 w-8 text-accent opacity-50 transition-all group-hover:scale-110 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="mb-6 text-center text-lg font-semibold text-muted-foreground">
              Other Projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherProjects.map((project) => (
                <div
                  key={project.title}
                  className="glass flex items-center justify-between rounded-xl p-4 transition-all hover:border-accent/50"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{project.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.techStack.join(" · ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
