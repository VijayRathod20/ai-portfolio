import { type Skill, type Project, type Experience, type Education } from "@/types";

// ===== SKILLS (from actual resume) =====
export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },

  // Frontend
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Electron.js", category: "frontend" },
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "REST APIs", category: "backend" },

  // Databases
  { name: "PostgreSQL", category: "database" },
  { name: "SQL", category: "database" },
  { name: "Redis", category: "database" },

  // Messaging & Real-Time
  { name: "RabbitMQ", category: "backend" },
  { name: "BullMQ", category: "backend" },
  { name: "Apache Kafka", category: "backend" },
  { name: "Socket.IO", category: "backend" },
  { name: "WebRTC", category: "backend" },

  // AI / LLM
  { name: "Agentic AI", category: "ai" },
  { name: "AI Agents", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "Meta Prompts", category: "ai" },
  { name: "Context Engineering", category: "ai" },
  { name: "MCP Tools", category: "ai" },
  { name: "Google Gemini API", category: "ai" },
  { name: "Groq API", category: "ai" },
  { name: "Vercel AI SDK", category: "ai" },

  // Tools
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Postman", category: "tools" },
  { name: "VS Code", category: "tools" },
];

// ===== PROJECTS (from actual resume) =====
export const projects: Project[] = [
  {
    title: "CRM Platform with AI Automation",
    description:
      "Designed and built a CRM automation module from scratch, enabling no-code workflow creation for business operations with an Agentic AI assistant for conversational CRM management.",
    longDescription:
      "Used Apache Kafka & RabbitMQ for async event processing; Socket.IO for real-time UI updates without page refresh. Built an Agentic AI assistant allowing users to query, update, and manage CRM data via a conversational interface.",
    techStack: ["Node.js", "React.js", "Socket.IO", "Apache Kafka", "RabbitMQ", "PostgreSQL", "Google Gemini API"],
    featured: true,
  },
  {
    title: "Multi-Platform Chat Application",
    description:
      "Architected a Slack/Cliq-style messaging app across React (web), React Native (iOS/Android), and Electron.js (desktop) with real-time messaging, channel management, and multilingual auto-translation.",
    longDescription:
      "Implemented real-time messaging, channel management, and notifications using Socket.IO and WebRTC. Maintained shared business logic and API contracts across platforms. Integrated Google Gemini API for multilingual auto-translation of incoming messages for international users.",
    techStack: ["React.js", "React Native", "Electron.js", "Socket.IO", "WebRTC", "Google Gemini API"],
    featured: true,
  },
  {
    title: "AI-Powered Portfolio",
    description:
      "A personal portfolio with an integrated Agentic AI assistant that answers questions about my professional background in real-time using Groq-powered LLMs.",
    longDescription:
      "Built with Next.js, Tailwind CSS, Framer Motion, and Groq (Llama 3.3 70B). Features SSR for SEO, streaming AI responses, glassmorphism UI, dark/light themes, and a markdown-powered blog.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Groq", "Vercel AI SDK"],
    liveUrl: "https://vijayrathod.dev",
    githubUrl: "https://github.com/VijayRathod20/ai-portfolio",
    featured: true,
  },
];

// ===== EXPERIENCE (from actual resume) =====
export const experiences: Experience[] = [
  {
    company: "eSparkBiz Technologies",
    role: "Software Developer",
    duration: "Jan 2023 — Present",
    description:
      "Led end-to-end feature development across multiple client projects — from requirement gathering and analysis to implementation, QA, and production validation.",
    highlights: [
      "Built a full CRM Automation Module from scratch, architecting real-time data pipelines using Socket.IO, RabbitMQ, and Apache Kafka for high-throughput workflow processing",
      "Developed an AI-powered CRM Assistant using Agentic AI principles, enabling end users to perform complex CRM operations via natural language interactions",
      "Integrated Google Gemini API to implement an auto-translation feature that automatically translates incoming messages into the user's native language in real time",
      "Engineered a multi-platform Chat Application (similar to Slack/Cliq) with a React web app, React Native mobile app, and Electron.js desktop app from a unified codebase",
      "Implemented real-time communication features using Socket.IO and WebRTC for instant messaging, notifications, and video/audio capabilities",
      "Designed and optimized PostgreSQL schemas and Redis caching strategies to improve query performance and reduce latency in high-traffic scenarios",
      "Mentored junior developers, conducted code reviews, and drove best practices across the team for maintainable and scalable code",
      "Diagnosed and resolved production incidents for live users, reducing downtime through rapid root-cause analysis and hotfix deployments",
    ],
    techUsed: ["React.js", "React Native", "Electron.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "Socket.IO", "WebRTC", "Apache Kafka", "RabbitMQ", "Google Gemini API"],
  },
];

// ===== EDUCATION (from actual resume) =====
export const education: Education[] = [
  {
    institution: "Sardar Patel University, Vallabh Vidyanagar, Anand, Gujarat",
    degree: "Master of Computer Applications (MCA)",
    duration: "2021 — 2023",
  },
];
