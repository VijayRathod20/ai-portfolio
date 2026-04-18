import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ===== SEO Metadata =====
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter
      ? `@${siteConfig.links.twitter.split("/").pop()}`
      : undefined,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },

  // Manifest
  manifest: "/site.webmanifest",
};

// ===== JSON-LD Structured Data =====
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/og-image.svg`,
  jobTitle: "Agentic AI Developer & Full Stack Engineer",
  description: siteConfig.description,
  email: siteConfig.links.email,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sardar Patel University",
  },
  knowsAbout: [
    "Agentic AI Development",
    "AI Agent Development",
    "Artificial Intelligence Engineering",
    "Large Language Model Integration",
    "LLM Application Development",
    "Prompt Engineering",
    "Context Engineering",
    "MCP Tools",
    "AI-Powered Applications",
    "Full Stack Development",
    "MERN Stack",
    "React.js",
    "Next.js",
    "React Native",
    "Electron.js",
    "Node.js",
    "NestJS",
    "TypeScript",
    "Google Gemini API",
    "Groq API",
    "Real-time Systems",
    "Socket.IO",
    "WebRTC",
    "Apache Kafka",
    "RabbitMQ",
    "PostgreSQL",
    "Redis",
    "Event-Driven Architecture",
    "Cross-Platform Development",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Agentic AI Developer",
    description: "Develops AI-powered applications, intelligent agents, and agentic AI solutions using LLMs, prompt engineering, and modern web technologies.",
    skills: "Agentic AI, AI Agents, LLM Integration, Prompt Engineering, Full Stack Development, MERN Stack, Real-time Systems",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} — Agentic AI Developer Portfolio`,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
