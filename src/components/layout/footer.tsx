"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site-config";

const socialLinks = [
  { icon: GithubIcon, href: siteConfig.links.github, label: "GitHub" },
  { icon: LinkedinIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  ...(siteConfig.links.twitter
    ? [{ icon: XTwitterIcon, href: siteConfig.links.twitter, label: "X (Twitter)" }]
    : []),
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Full Stack Developer & Agentic AI Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex items-center justify-center gap-1 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {siteConfig.name}. Built with</span>
          <Heart className="h-3 w-3 fill-red-500 text-red-500" />
          <span>using Next.js & AI</span>
        </div>
      </div>
    </footer>
  );
}
