"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { TagBadge } from "./tag-badge";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = "Type and press Enter...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      const newTag = inputValue.trim();

      // Don't add duplicates
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }

      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              label={tag}
              removable
              onRemove={() => handleRemoveTag(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
