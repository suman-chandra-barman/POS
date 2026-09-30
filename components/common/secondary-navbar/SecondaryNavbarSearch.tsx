"use client";

import React, { useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SecondaryNavbarSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  enableShortcut?: boolean;
}

export const SecondaryNavbarSearch: React.FC<SecondaryNavbarSearchProps> = ({
  value,
  onChange,
  placeholder = "Placeholder text...",
  className,
  enableShortcut = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If pressing '/' when not actively focused in an input/textarea
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableShortcut]);

  return (
    <div
      className={cn(
        "relative w-full max-w-sm sm:max-w-md h-8.5 sm:h-9 bg-neutral-50 hover:bg-neutral-100/70 focus-within:bg-white border border-neutral-200/90 focus-within:border-sky-400 rounded-full flex items-center px-3 gap-2.5 transition-all shadow-2xs focus-within:ring-2 focus-within:ring-sky-100",
        className
      )}
    >
      {/* Hugeicons Search Icon */}
      <HugeiconsIcon
        icon={Search01Icon}
        size={15}
        strokeWidth={1.8}
        className="text-neutral-400 shrink-0 select-none"
      />

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full h-full text-xs text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-none min-w-0"
      />

      {/* Keyboard Shortcut Indicator Badge '/' */}
      <div
        title="Press '/' to search"
        className="size-5 rounded-full bg-neutral-200/70 text-[11px] font-medium text-neutral-500 flex items-center justify-center shrink-0 select-none cursor-default"
      >
        /
      </div>
    </div>
  );
};

export default SecondaryNavbarSearch;
