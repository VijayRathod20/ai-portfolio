"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading renderers with anchor links
          h1: ({ children, ...props }) => (
            <h1
              className="mt-10 mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="mt-10 mb-4 text-2xl font-bold tracking-tight"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="mt-8 mb-3 text-xl font-semibold"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="mt-6 mb-2 text-lg font-semibold"
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p
              className="mb-4 text-base leading-relaxed text-muted-foreground"
              {...props}
            >
              {children}
            </p>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ children, ...props }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-muted-foreground" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="my-6 border-l-4 border-accent/50 bg-muted/50 py-3 pl-6 pr-4 italic text-muted-foreground"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-accent"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="my-6 overflow-x-auto rounded-xl border border-border bg-[#0d1117] p-4 text-sm"
              {...props}
            >
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted/50" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border-t border-border px-4 py-3 text-muted-foreground"
              {...props}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-8 border-border" />
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-muted-foreground" {...props}>
              {children}
            </em>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-foreground" {...props}>
              {children}
            </strong>
          ),
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              className="my-6 rounded-xl border border-border"
              loading="lazy"
              {...props}
            />
          ),
        }}
      />
    </div>
  );
}
