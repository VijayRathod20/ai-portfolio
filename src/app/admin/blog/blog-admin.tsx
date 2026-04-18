"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import {
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Calendar,
  Clock,
  Tag,
  Star,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

// ===== Types =====
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  featured: boolean;
  readingTime: string;
  content: string;
}

interface PostFormData {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string;
  image: string;
  featured: boolean;
  content: string;
}

const emptyForm: PostFormData = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  author: "Vijay Rathod",
  tags: "",
  image: "/og-image.svg",
  featured: false,
  content: "",
};

// ===== Toast Notification =====
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-xl border px-5 py-3 shadow-lg transition-all ${
        type === "success"
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ===== Main Component =====
export function BlogAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [view, setView] = useState<"list" | "editor">("list");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormData>(emptyForm);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/blog")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch {
      showToast("Failed to fetch posts", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchPosts();
  }, [isAuthenticated, fetchPosts]);

  // Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setAuthError("Invalid password. Please try again.");
      }
    } catch {
      setAuthError("Connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPosts([]);
    setView("list");
  };

  // Create new post
  const handleNewPost = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setPreviewMode(false);
    setView("editor");
  };

  // Edit existing post
  const handleEditPost = (post: BlogPost) => {
    setForm({
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      tags: post.tags.join(", "),
      image: post.image,
      featured: post.featured,
      content: post.content,
    });
    setEditingSlug(post.slug);
    setPreviewMode(false);
    setView("editor");
  };

  // Save post (create or update)
  const handleSave = async () => {
    if (!form.title.trim()) {
      showToast("Title is required", "error");
      return;
    }
    if (!form.content.trim()) {
      showToast("Content is required", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      let res: Response;
      if (editingSlug) {
        res = await fetch(`/api/admin/blog/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        showToast(
          editingSlug
            ? "Post updated successfully!"
            : "Post created successfully!",
          "success"
        );
        setView("list");
        fetchPosts();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to save post", "error");
      }
    } catch {
      showToast("Failed to save post", "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      return;
    }

    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Post deleted successfully", "success");
        fetchPosts();
      } else {
        showToast("Failed to delete post", "error");
      }
    } catch {
      showToast("Failed to delete post", "error");
    } finally {
      setDeleting(null);
    }
  };

  // ===== Loading State =====
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // ===== Login Screen =====
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <Edit3 className="h-7 w-7 text-accent" />
              </div>
              <h1 className="text-2xl font-bold">Blog Admin</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your password to manage posts
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading || !password}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {authLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ===== Editor View =====
  if (view === "editor") {
    return (
      <div className="min-h-screen bg-background">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Editor Header */}
        <div className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Posts
            </button>

            <div className="flex items-center gap-3">
              {/* Preview Toggle */}
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  previewMode
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {previewMode ? (
                  <Edit3 className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {previewMode ? "Edit" : "Preview"}
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {editingSlug ? "Update Post" : "Publish Post"}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8">
          {previewMode ? (
            /* ===== Preview Mode ===== */
            <div className="mx-auto max-w-3xl">
              <div className="mb-6">
                {form.tags && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {form.tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight">
                  {form.title || "Untitled Post"}
                </h1>
                {form.description && (
                  <p className="mt-3 text-lg text-muted-foreground">
                    {form.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {form.date}
                  </span>
                  <span>{form.author}</span>
                  {form.featured && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <hr className="my-6 border-border" />
              <MarkdownRenderer content={form.content || "*Start writing your post...*"} />
            </div>
          ) : (
            /* ===== Edit Mode ===== */
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              {/* Form Fields */}
              <div className="space-y-5">
                <h2 className="text-lg font-semibold">Post Details</h2>

                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="My Awesome Blog Post"
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  {form.title && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Slug:{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-accent">
                        {form.title
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")
                          .replace(/-+/g, "-")
                          .trim()}
                      </code>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="A brief summary of your post..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                {/* Date & Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Calendar className="mr-1 inline h-3 w-3" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Author
                    </label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <Tag className="mr-1 inline h-3 w-3" />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value })
                    }
                    placeholder="Next.js, React, AI, Tutorial"
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  {form.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {form.tags
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, featured: !form.featured })
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      form.featured ? "bg-accent" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        form.featured ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <label className="flex items-center gap-1.5 text-sm">
                    <Star
                      className={`h-4 w-4 ${
                        form.featured
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                    Featured Post
                  </label>
                </div>

                {/* OG Image */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    OG Image Path
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="/og-image.svg"
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Content *</h2>
                  <span className="text-xs text-muted-foreground">
                    Markdown supported
                  </span>
                </div>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder={`# Your Blog Post Title\n\nStart writing your amazing content here...\n\n## Section Heading\n\nYour content with **bold**, *italic*, and \`code\` formatting.\n\n\`\`\`javascript\nconst hello = "world";\n\`\`\`\n\n- Bullet points\n- More points`}
                  className="h-[calc(100vh-280px)] min-h-[400px] w-full resize-none rounded-xl border border-border bg-muted px-4 py-3 font-mono text-sm leading-relaxed placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== Dashboard / List View =====
  return (
    <div className="min-h-screen bg-background">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Blog Manager</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {posts.length} post{posts.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNewPost}
              className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Edit3 className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <h2 className="text-xl font-semibold">No posts yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first blog post to get started.
            </p>
            <button
              onClick={handleNewPost}
              className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
            >
              <Plus className="h-4 w-4" />
              Create First Post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    {post.featured && (
                      <span className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <h3 className="truncate text-base font-semibold">
                    {post.title}
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-4 flex flex-shrink-0 items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="View post"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleEditPost(post)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                    title="Edit post"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    disabled={deleting === post.slug}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Delete post"
                  >
                    {deleting === post.slug ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
