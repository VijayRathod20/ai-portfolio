export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops" | "database" | "tools";
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  techUsed: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
  };
  keywords: string[];
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  featured: boolean;
}
