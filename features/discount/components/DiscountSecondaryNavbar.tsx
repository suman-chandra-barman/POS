"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DISCOUNT_VIEW_MODES,
  type DiscountViewMode,
} from "../types/discount.types";
import { cn } from "@/lib/utils";

interface DiscountSecondaryNavbarProps {
  currentView: DiscountViewMode;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewDiscount: () => void;
  onViewChange: (mode: DiscountViewMode) => void;
  totalCount?: number;
  filteredCount?: number;
  onSaveForm?: () => void;
  onCancelForm?: () => void;
}

export const DiscountSecondaryNavbar: React.FC<
  DiscountSecondaryNavbarProps
> = ({
  currentView,
  searchQuery,
  onSearchChange,
  onNewDiscount,
  onViewChange,
  totalCount = 100,
  filteredCount = 100,
  onSaveForm,
  onCancelForm,
}) => {
  const isCreate = currentView === DISCOUNT_VIEW_MODES.CREATE;

  return (
    <div className="sticky top-14 sm:top-15 z-20 w-full border-b border-neutral-200/80 bg-white px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between select-none shadow-2xs">
      {/* ── Left Side: Action Buttons ── */}
      <div className="flex items-center gap-2 shrink-0">
        {isCreate ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSaveForm}
              className="h-8.5 px-4 rounded-xl bg-[#0080f6] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancelForm}
              className="h-8.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onNewDiscount}
            className="h-8.5 sm:h-9 px-4 rounded-xl bg-[#0080f6] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
          >
            New Discount
          </button>
        )}
      </div>

      {/* ── Center: Search Pill (visible in list/card views) ── */}
      {!isCreate ? (
        <div className="flex-1 max-w-sm sm:max-w-md mx-3">
          <div className="flex items-center h-8.5 sm:h-9 w-full rounded-full border border-neutral-200/90 bg-[#f9fafb] px-3.5 shadow-2xs focus-within:bg-white focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/70 transition-all">
            <Search className="size-3.5 text-neutral-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Placeholder text..."
              className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center justify-center size-5 text-[11px] text-neutral-400 font-mono rounded bg-neutral-100">
              /
            </kbd>
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* ── Right Side: Pagination & View Filter Toggles ── */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs text-neutral-600 select-none">
        {/* Pagination text matching image: "1-100 / 100 < >" */}
        <div className="hidden sm:flex items-center gap-1.5 font-medium text-neutral-700">
          <span>1-{filteredCount}</span>
          <span className="text-neutral-400">/</span>
          <span>{totalCount}</span>
          <div className="flex items-center ml-1">
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="p-1 hover:text-neutral-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Next page"
              className="p-1 hover:text-neutral-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode Icons Filter (Card View vs Table View) */}
        <div className="flex items-center gap-1 pl-2 sm:border-l sm:border-neutral-200">
          {/* Card View Icon: Top bar + two vertical cards */}
          <button
            type="button"
            onClick={() => onViewChange(DISCOUNT_VIEW_MODES.CARD)}
            title="Card View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              currentView === DISCOUNT_VIEW_MODES.CARD
                ? "text-neutral-900 bg-neutral-100"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3 4h18" />
              <rect x="4" y="8" width="6" height="12" rx="1.5" />
              <rect x="14" y="8" width="6" height="12" rx="1.5" />
            </svg>
          </button>

          {/* Table View Icon: Top bar + 3 list rows */}
          <button
            type="button"
            onClick={() => onViewChange(DISCOUNT_VIEW_MODES.LIST)}
            title="Table View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              currentView === DISCOUNT_VIEW_MODES.LIST
                ? "text-neutral-900 bg-neutral-100"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3 4h18" />
              <path d="M4 9h16" />
              <path d="M4 14h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
