import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  featured: boolean;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  featured: boolean;
  readingTime: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get all blog post slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Get a single blog post by slug (includes full content)
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    author: data.author || "Vijay Rathod",
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    readingTime: stats.text,
    content,
  };
}

/**
 * Get all blog posts metadata (without content), sorted by date descending
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;

      // Return metadata only (no content)
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) => post.featured);
}

/**
 * Get all unique tags across all posts
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
