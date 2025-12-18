"use client";

import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { autoBracketTerms } from "@/lib/term-detection";
import { useDebounce } from "@/hooks/use-debounce";

interface SmartTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minRows?: number;
}

export function SmartTextArea({
  value,
  onChange,
  placeholder,
  className = "",
  minRows = 3,
}: SmartTextAreaProps) {
  const [localValue, setLocalValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedValue = useDebounce(localValue, 300);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Auto-bracket terms after debounce
  useEffect(() => {
    if (debouncedValue !== localValue) return;

    // Only auto-bracket if the text has changed and doesn't end with [
    if (debouncedValue && !debouncedValue.endsWith('[')) {
      const bracketed = autoBracketTerms(debouncedValue);

      if (bracketed !== debouncedValue) {
        const cursorPos = textareaRef.current?.selectionStart || bracketed.length;
        setLocalValue(bracketed);
        onChange(bracketed);

        // Restore cursor position
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.setSelectionRange(cursorPos, cursorPos);
          }
        }, 0);
      }
    }
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Add custom styling to highlight bracketed terms
  const getHighlightedStyle = () => {
    return {
      background: `
        linear-gradient(to right,
          transparent 0%,
          transparent 100%
        )
      `.trim(),
    };
  };

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`resize-none font-mono ${className}`}
        style={{
          minHeight: `${minRows * 1.5 + 2}rem`,
          backgroundImage: `linear-gradient(90deg, transparent 0%, transparent 100%)`,
        }}
        rows={minRows}
      />

      {/* Visual indicator for bracketed terms */}
      <style jsx>{`
        textarea:focus {
          outline: 2px solid rgb(147, 51, 234);
          outline-offset: -1px;
        }
      `}</style>
    </div>
  );
}
