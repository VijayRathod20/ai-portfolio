"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageSquare, FileText, Download } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useTypingEffect } from "@/lib/hooks/use-typing-effect";

const roles = [
  "Agentic AI Developer",
  "AI Engineer",
  "Full Stack Developer",
  "AI Agent Builder",
  "Real-time Systems Architect",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function TypingText() {
  const { currentText } = useTypingEffect({
    words: roles,
    typingSpeed: 70,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <span className="gradient-text">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block w-[3px] h-[1em] bg-accent align-middle"
      />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
      <FloatingOrb className="left-[15%] top-[20%] h-72 w-72 bg-accent/20" delay={0} />
      <FloatingOrb className="right-[15%] bottom-[20%] h-96 w-96 bg-purple-500/15" delay={2} />
      <FloatingOrb className="left-[50%] top-[60%] h-64 w-64 bg-pink-500/15" delay={4} />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_70%)]" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{siteConfig.name}</span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          variants={itemVariants}
          className="mt-4 h-12 text-xl font-medium text-muted-foreground sm:text-2xl md:text-3xl"
        >
          <TypingText />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I build{" "}
          <span className="font-medium text-foreground">AI-powered applications</span>{" "}
          and{" "}
          <span className="font-medium text-foreground">intelligent AI agents</span>{" "}
          with 3+ years of experience. Specializing in{" "}
          <span className="font-medium text-foreground">Agentic AI development</span>,{" "}
          <span className="font-medium text-foreground">LLM integration</span>, and{" "}
          <span className="font-medium text-foreground">scalable full-stack systems</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent-glow"
          >
            <FileText className="h-4 w-4" />
            View My Work
          </motion.a>
          <motion.button
            onClick={() => {
              // Dispatch custom event to open chat widget
              window.dispatchEvent(new CustomEvent("open-chat"));
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass group flex h-12 items-center gap-2 rounded-full px-8 text-sm font-semibold transition-all hover:border-accent"
          >
            <MessageSquare className="h-4 w-4" />
            Chat with AI Clone
          </motion.button>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-12 items-center gap-2 rounded-full border border-border px-8 text-sm font-semibold transition-all hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="mt-20">
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
