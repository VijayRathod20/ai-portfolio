"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site-config";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <motion.a
            href={`mailto:${siteConfig.links.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent-glow"
          >
            <Mail className="h-5 w-5" />
            Say Hello
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <p className="mt-4 text-sm text-muted-foreground">
            {siteConfig.links.email}
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="text-xs text-muted-foreground">Find me on</span>
          <div className="flex gap-3">
            <motion.a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </motion.a>
            {siteConfig.links.twitter && (
              <motion.a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
