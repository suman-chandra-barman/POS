"use client";

import React from "react";
import { Search, ChevronLeft, ChevronRight, LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PURCHASE_VIEWS, type PurchaseView } from "../types/purchase.types";

interface PurchaseListToolbarProps {
  onNewPurchase: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeView: PurchaseView;
  onViewChange: (view: PurchaseView) => void;
}

export const PurchaseListToolbar: React.FC<PurchaseListToolbarProps> = ({
  onNewPurchase,
  searchQuery,
  onSearchChange,
  activeView,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 select-none">
      {/* Left: New Purchase Button */}
      <div className="flex items-center self-start sm:self-auto">
        <button
          type="button"
          onClick={onNewPurchase}
          className="h-9 px-4.5 rounded-xl bg-[#007aff] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>New Purchase</span>
        </button>
      </div>

      {/* Center: Global Search Pill */}
      <div className="w-full sm:max-w-md flex-1 px-2">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Placeholder text..."
            className="w-full h-9 pl-9.5 pr-8 rounded-full bg-neutral-100/70 border border-neutral-200/60 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-300 transition-all"
          />
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-neutral-400 bg-neutral-200/60 px-1.5 py-0.5 rounded-sm pointer-events-none">
            /
          </kbd>
        </div>
      </div>

      {/* Right: Pagination + View Switchers */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Pagination indicator */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
          <span className="font-semibold text-neutral-800">1-100</span>
          <span>/ 100</span>
          <div className="flex items-center ml-1 text-neutral-400">
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="p-1 hover:text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Next page"
              className="p-1 hover:text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* View mode toggle icons */}
        <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
          <button
            type="button"
            aria-label="Card Grid View"
            onClick={() => onViewChange(PURCHASE_VIEWS.GRID)}
            className={cn(
              "p-1.5 rounded-md transition-colors cursor-pointer",
              activeView === PURCHASE_VIEWS.GRID
                ? "bg-neutral-200/80 text-neutral-900"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            )}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Table List View"
            onClick={() => onViewChange(PURCHASE_VIEWS.LIST)}
            className={cn(
              "p-1.5 rounded-md transition-colors cursor-pointer",
              activeView === PURCHASE_VIEWS.LIST
                ? "bg-neutral-200/80 text-neutral-900"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            )}
          >
            <Rows3 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseListToolbar;
