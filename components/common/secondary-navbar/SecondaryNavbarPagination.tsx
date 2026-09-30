"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface SecondaryNavbarPaginationProps {
  currentRangeText?: string;
  total?: number | string;
  canPrev?: boolean;
  canNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export const SecondaryNavbarPagination: React.FC<SecondaryNavbarPaginationProps> = ({
  currentRangeText = "1-100",
  total = 100,
  canPrev = false,
  canNext = true,
  onPrev,
  onNext,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-medium text-neutral-700 select-none",
        className
      )}
    >
      {/* Page Count (e.g. 1-100 / 100) */}
      <span className="whitespace-nowrap">
        {currentRangeText}{" "}
        <span className="text-neutral-400 font-normal">/</span> {total}
      </span>

      {/* Navigation Arrows < > */}
      <div className="flex items-center gap-0.5 text-neutral-500">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous Page"
          className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
        >
          <HugeiconsIcon
            icon={ChevronLeftIcon}
            size={14}
            strokeWidth={1.8}
            className="shrink-0"
          />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next Page"
          className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
        >
          <HugeiconsIcon
            icon={ChevronRightIcon}
            size={14}
            strokeWidth={1.8}
            className="shrink-0"
          />
        </button>
      </div>
    </div>
  );
};

export default SecondaryNavbarPagination;
