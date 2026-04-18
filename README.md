# 🚀 AI-Powered Agentic Portfolio

A high-performance, SEO-optimized personal portfolio featuring a custom Agentic AI assistant, glassmorphism UI, and an MDX-powered blog system.

## ✨ Features

- **⚡ Next.js 15** — App Router, SSR, and static generation for blazing-fast performance
- **🎨 Glassmorphism UI** — Modern frosted-glass design with Tailwind CSS + Framer Motion
- **🌙 Dark/Light Mode** — Seamless theme switching with next-themes
- **🔍 SEO Optimized** — JSON-LD structured data, Open Graph, Twitter Cards, sitemap, robots.txt
- **🤖 AI Assistant** — (Week 3) Google Gemini 1.5 Flash powered conversational AI clone
- **📝 MDX Blog** — (Week 4) Interactive blog with code snippets and SEO-friendly slugs
- **📱 Fully Responsive** — Mobile-first design with smooth animations
- **♿ Accessible** — Keyboard navigation, ARIA labels, focus management
- **📊 Analytics** — Vercel Analytics integration

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Theme | next-themes |
| Icons | Lucide React + Custom SVGs |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/               # Blog section
│   ├── globals.css          # Design system & tokens
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # Custom 404
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Crawling rules
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, About, Projects, Experience, Stats, Contact
│   └── ui/                  # ThemeToggle, ScrollToTop, Icons, etc.
├── data/                    # Site config & resume data
├── lib/                     # Utilities & hooks
├── providers/               # Theme provider
└── types/                   # TypeScript interfaces
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📋 Customization

1. **Personal Info** — Edit `src/data/site-config.ts` with your name, links, and SEO keywords
2. **Resume Data** — Update `src/data/resume.ts` with your skills, projects, experience, and education
3. **Design Tokens** — Modify CSS variables in `src/app/globals.css` to change colors and branding
4. **Content** — Update section components in `src/components/sections/`

## 🗺️ Roadmap

- [x] Week 1: Foundations (Next.js, Tailwind, SEO)
- [x] Week 2: Core UI (Sections, animations, blog placeholder)
- [x] Week 3: AI Integration (Gemini API, streaming chat)
- [ ] Week 4: Blog & SEO (MDX engine, keyword optimization)
- [ ] Week 5: Polish & Launch (Testing, optimization, deployment)

## 📄 License

MIT
