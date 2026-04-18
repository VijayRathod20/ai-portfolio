"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("relative py-24 px-6", className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  );
}

interface SectionHeaderProps {
  title: string;
  highlight: string;
  description?: string;
}

export function SectionHeader({ title, highlight, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}
