"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

interface BlogPostContentProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    readingTime: string;
    content: string;
  };
  formattedDate: string;
}

export function BlogPostContent({ post, formattedDate }: BlogPostContentProps) {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <article className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg text-muted-foreground">
            {post.description}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MarkdownRenderer content={post.content} />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-t border-border pt-8"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Thanks for reading! If you found this helpful, feel free to share
              it.
            </p>
            <Link
              href="/blog"
              className="flex h-10 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              More Articles
            </Link>
          </div>
        </motion.footer>
      </article>
    </div>
  );
}
