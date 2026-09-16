"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronsUpDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  options: FormSelectOption[];
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select an option",
  options,
  error,
  disabled = false,
  searchable = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q)
    );
  }, [options, searchQuery]);

  return (
    <div ref={containerRef} className={cn("relative w-full space-y-1.5", className)}>
      <label className="block text-xs font-semibold text-neutral-800">
        {label}
      </label>

      {/* Select Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setSearchQuery("");
          }
        }}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-3.5 text-sm transition-all focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/70 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20"
        )}
      >
        <span
          className={cn(
            "truncate text-sm",
            selectedOption ? "text-neutral-900" : "text-neutral-400"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="size-4 text-neutral-400 shrink-0 ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-full rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 py-1 max-h-60 overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-100">
          {/* Search input when many options exist */}
          {searchable && options.length > 8 && (
            <div className="p-2 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100/80 px-2.5 py-1.5">
                <Search className="size-3.5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto max-h-48 py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-neutral-400 text-center">
                No matching options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.value);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors text-left cursor-pointer",
                      isSelected && "bg-neutral-100 font-medium text-neutral-900"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="size-3.5 text-neutral-900 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-[11px] font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};
