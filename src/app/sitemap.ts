import { type MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
