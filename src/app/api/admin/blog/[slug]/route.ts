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

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET - Get a single blog post
export async function GET(request: NextRequest, context: RouteContext) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return NextResponse.json({
      post: {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Vijay Rathod",
        tags: data.tags || [],
        image: data.image || "",
        featured: data.featured || false,
        readingTime: stats.text,
        content,
      },
    });
  } catch (error) {
    console.error("Error reading post:", error);
    return NextResponse.json(
      { error: "Failed to read post" },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post
export async function PUT(request: NextRequest, context: RouteContext) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
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

    // If title changed, we need to rename the file
    const newSlug = slugify(title);
    const newFilePath = path.join(BLOG_DIR, `${newSlug}.md`);

    // If slug changed and new file already exists (different post), reject
    if (newSlug !== slug && fs.existsSync(newFilePath)) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 409 }
      );
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

    // If slug changed, delete old file
    if (newSlug !== slug) {
      fs.unlinkSync(filePath);
    }

    fs.writeFileSync(newFilePath, fileContent, "utf-8");

    return NextResponse.json({ success: true, slug: newSlug });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
