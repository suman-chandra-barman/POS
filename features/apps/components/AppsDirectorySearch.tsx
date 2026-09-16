"use client";

import React from "react";
import { Search } from "lucide-react";

interface AppsDirectorySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const AppsDirectorySearch: React.FC<AppsDirectorySearchProps> = ({
  value,
  onChange,
  placeholder = "Search",
}) => {
  return (
    <div className="w-full max-w-sm mb-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9.5 rounded-xl border border-neutral-200/90 bg-neutral-50/50 pl-10 pr-3.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-[#0095FF] focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};
