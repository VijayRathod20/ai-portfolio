import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getAllBlogSlugs, formatDate } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";
import { BlogPostContent } from "./blog-post-content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each blog post (SEO + Open Graph + JSON-LD Article)
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteConfig.url}/blog/${slug}`,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.date);

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} formattedDate={formattedDate} />
    </>
  );
}
