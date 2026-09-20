"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = "e. g. Sales man, Team Lead",
  label,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label className="block text-xs font-medium text-neutral-700">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className="min-h-10 w-full flex flex-wrap items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200/90 rounded-xl cursor-text focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all"
      >
        {/* Rendered Tag Pills */}
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200/80 rounded-lg text-[11px] font-semibold select-none whitespace-nowrap"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="size-3.5 flex items-center justify-center rounded-full text-sky-500 hover:text-sky-800 hover:bg-sky-200/60 transition-colors cursor-pointer shrink-0"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="size-2.5 stroke-[2.5]" />
            </button>
          </span>
        ))}

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : "Add tag..."}
          className="flex-1 min-w-24 bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 outline-none py-0.5"
        />
      </div>

      {/* Hint */}
      <p className="text-[10px] text-neutral-400">
        Press <kbd className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[9px]">Enter</kbd> or{" "}
        <kbd className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[9px]">,</kbd> to add a tag
      </p>
    </div>
  );
};

export default TagInput;
