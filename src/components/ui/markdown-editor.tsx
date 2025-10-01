"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  label,
  required = false,
}: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force textarea styling after component mounts
  useEffect(() => {
    if (!mounted) return;

    const forceTextareaStyles = () => {
      if (containerRef.current) {
        const textareas = containerRef.current.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
          textarea.style.setProperty("color", "#000000", "important");
          textarea.style.setProperty(
            "background-color",
            "#ffffff",
            "important"
          );
          textarea.style.setProperty("caret-color", "#000000", "important");
          textarea.style.setProperty(
            "-webkit-text-fill-color",
            "#000000",
            "important"
          );
        });
      }
    };

    // Apply styles immediately and on any changes
    forceTextareaStyles();

    // Also apply styles periodically in case MDEditor re-renders
    const interval = setInterval(forceTextareaStyles, 100);

    return () => clearInterval(interval);
  }, [mounted, value]);

  if (!mounted) {
    return (
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        <div className="border rounded-md p-4 min-h-[300px] bg-muted animate-pulse">
          <p className="text-muted-foreground">Loading markdown editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="markdown-editor-wrapper" ref={containerRef}>
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          data-color-mode="light"
          visibleDragbar={false}
          textareaProps={{
            placeholder: placeholder || "Enter markdown content...",
            style: {
              fontSize: 14,
              lineHeight: 1.5,
              color: "#000000 !important",
              backgroundColor: "#ffffff !important",
              caretColor: "#000000 !important",
            },
            required: required,
          }}
          preview="edit"
          height={350}
          toolbarHeight={45}
        />
      </div>
    </div>
  );
}
