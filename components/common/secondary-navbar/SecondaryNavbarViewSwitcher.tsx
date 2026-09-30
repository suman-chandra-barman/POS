"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { KanbanIcon, ListViewIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export type ViewSwitcherMode = "card" | "table" | "list";

export interface SecondaryNavbarViewSwitcherProps {
  activeView: ViewSwitcherMode | string;
  onViewChange: (view: ViewSwitcherMode) => void;
  className?: string;
}

export const SecondaryNavbarViewSwitcher: React.FC<SecondaryNavbarViewSwitcherProps> = ({
  activeView,
  onViewChange,
  className,
}) => {
  const isCard = activeView === "card";
  const isTable = activeView === "table" || activeView === "list";

  return (
    <div className={cn("flex items-center gap-1 select-none", className)}>
      {/* ── Card / Kanban View Button ── */}
      <button
        type="button"
        id="btn-view-card"
        onClick={() => onViewChange("card")}
        aria-label="Card View"
        title="Card view"
        className={cn(
          "p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center",
          isCard
            ? "text-neutral-900 bg-neutral-100 font-semibold shadow-2xs"
            : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
        )}
      >
        <HugeiconsIcon
          icon={KanbanIcon}
          size={16}
          strokeWidth={1.8}
          className="shrink-0"
        />
      </button>

      {/* ── List / Table View Button ── */}
      <button
        type="button"
        id="btn-view-table"
        onClick={() => onViewChange("table")}
        aria-label="Table View"
        title="Table view"
        className={cn(
          "p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center",
          isTable
            ? "text-neutral-900 bg-neutral-100 font-semibold shadow-2xs"
            : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
        )}
      >
        <HugeiconsIcon
          icon={ListViewIcon}
          size={16}
          strokeWidth={1.8}
          className="shrink-0"
        />
      </button>
    </div>
  );
};

export default SecondaryNavbarViewSwitcher;
