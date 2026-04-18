import type { Metadata } from "next";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on Full Stack Development, Agentic AI, MERN Stack, and building modern web applications. Tips, tutorials, and deep dives.",
  openGraph: {
    title: "Blog | Vijay Rathod",
    description:
      "Insights on Full Stack Development, Agentic AI, MERN Stack, and building modern web applications.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const allTags = getAllTags();

  return <BlogContent posts={posts} allTags={allTags} />;
}
