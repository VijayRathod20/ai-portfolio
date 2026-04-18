import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = Buffer.from(`admin:${ADMIN_PASSWORD}`).toString("base64");
const COOKIE_NAME = "admin_token";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function verifyAuth(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return token === ADMIN_TOKEN;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// GET - List all blog posts with content
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
    const posts = files
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(BLOG_DIR, file);
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
          image: data.image || "",
          featured: data.featured || false,
          readingTime: stats.text,
          content,
        };
      })
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error listing posts:", error);
    return NextResponse.json(
      { error: "Failed to list posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, date, author, tags, image, featured, content } =
      body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = slugify(title);
    const filePath = path.join(BLOG_DIR, `${slug}.md`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 409 }
      );
    }

    // Ensure blog directory exists
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // Build frontmatter
    const frontmatter = {
      title,
      description: description || "",
      date: date || new Date().toISOString().split("T")[0],
      author: author || "Vijay Rathod",
      tags: tags || [],
      image: image || "/og-image.svg",
      featured: featured || false,
    };

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, fileContent, "utf-8");

    return NextResponse.json({ success: true, slug }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
