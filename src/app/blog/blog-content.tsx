"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}

interface BlogContentProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export function BlogContent({ posts, allTags }: BlogContentProps) {
  const featuredPosts = posts.filter((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Insights on Full Stack Development, Agentic AI, and building modern
            web applications.
          </p>
        </motion.div>

        {/* Tags */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12 flex flex-wrap gap-2"
          >
            {allTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground"
            >
              Featured Articles
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="glass flex h-full flex-col rounded-2xl p-6 transition-all hover:border-accent/50">
                      {/* Tags */}
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-semibold leading-tight transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDisplayDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-1">
                          Read
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* All Other Posts */}
        {recentPosts.length > 0 && (
          <section>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground"
            >
              All Articles
            </motion.h2>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="glass flex items-center justify-between rounded-xl p-5 transition-all hover:border-accent/50">
                      <div className="flex-1">
                        <div className="mb-1 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-base font-semibold transition-colors group-hover:text-accent">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {post.description}
                        </p>
                      </div>
                      <div className="ml-4 flex flex-shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span>{formatDisplayDate(post.date)}</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State (fallback) */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass flex flex-col items-center rounded-2xl p-16 text-center"
          >
            <h2 className="mt-6 text-2xl font-semibold">Coming Soon</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              I&apos;m working on some exciting articles. Stay tuned!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function formatDisplayDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
