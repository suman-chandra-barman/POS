"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight, Rows3 } from "lucide-react";

interface PosSecondaryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PosSecondaryToolbar: React.FC<PosSecondaryToolbarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="w-full container mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between gap-4 select-none">
      {/* Left spacer for centering balance */}
      <div className="hidden lg:block w-48 shrink-0" />

      {/* Center: Search Bar Pill (Image 1) */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative w-full">
          <Search className="size-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10.5 pr-9 rounded-full bg-white text-xs text-neutral-800 placeholder:text-neutral-400 border border-neutral-200/90 shadow-2xs focus:border-neutral-400 focus:outline-hidden transition-all"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400 font-mono select-none">
            /
          </kbd>
        </div>
      </div>

      {/* Right: Pagination + Filter + List View (Image 1) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Pagination 1-100 / 100 < > */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
          <span>1-100 / 100</span>
          <div className="flex items-center gap-0.5 ml-1">
            <button
              type="button"
              className="p-1 rounded-md hover:bg-neutral-200/70 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              className="p-1 rounded-md hover:bg-neutral-200/70 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>



        {/* List / Row view toggle icon */}
        <button
          type="button"
          aria-label="Toggle layout"
          className="p-1.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/70 rounded-lg transition-colors cursor-pointer"
        >
          <Rows3 className="size-4" />
        </button>
      </div>
    </div>
  );
};
