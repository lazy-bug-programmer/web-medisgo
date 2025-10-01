"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownDisplayProps {
  content: string;
  className?: string;
  truncate?: boolean;
  maxLength?: number;
}

export function MarkdownDisplay({
  content,
  className,
  truncate = false,
  maxLength = 150,
}: MarkdownDisplayProps) {
  let displayContent = content;

  if (truncate && content.length > maxLength) {
    displayContent = content.substring(0, maxLength) + "...";
  }

  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Customize markdown components for better display
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-sm mb-2 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="text-sm mb-2 last:mb-0 ml-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-sm mb-2 last:mb-0 ml-4">{children}</ol>
          ),
          li: ({ children }) => <li className="text-sm">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ children }) => (
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-sm">
              {children}
            </blockquote>
          ),
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </div>
  );
}
