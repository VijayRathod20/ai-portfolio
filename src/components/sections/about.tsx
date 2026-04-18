"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Zap, Server } from "lucide-react";
import { skills } from "@/data/resume";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building scalable web and cross-platform apps with React.js, React Native, Electron.js, Node.js, and PostgreSQL.",
  },
  {
    icon: Brain,
    title: "Agentic AI Development",
    description:
      "Building intelligent AI agents and AI-powered applications using Agentic AI principles, LLM integration, prompt engineering, context engineering, and MCP tools.",
  },
  {
    icon: Zap,
    title: "Real-time Systems",
    description:
      "Architecting real-time features with Socket.IO, WebRTC, and event-driven pipelines using Apache Kafka and RabbitMQ.",
  },
  {
    icon: Server,
    title: "Event-Driven Architecture",
    description:
      "Designing high-throughput data pipelines with message queues, Redis caching, and optimized PostgreSQL schemas.",
  },
];

const skillCategories = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "ai" as const, label: "AI / ML" },
  { key: "database" as const, label: "Database" },
  { key: "devops" as const, label: "DevOps" },
  { key: "tools" as const, label: "Tools" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Agentic AI Developer & Full Stack Engineer with 3+ years of experience
            building AI-powered applications, intelligent agents, and production-grade
            systems using LLMs, prompt engineering, and modern web technologies.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass group rounded-2xl p-6 transition-all hover:border-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center text-xl font-semibold">
            Tech Stack
          </h3>
          <div className="space-y-6">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(
                (s) => s.category === category.key
              );
              if (categorySkills.length === 0) return null;
              return (
                <div key={category.key}>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {category.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
