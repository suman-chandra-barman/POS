"use client";

import React from "react";
import {
  SecondaryNavbar,
  SecondaryNavbarSearch,
  SecondaryNavbarPagination,
  SecondaryNavbarViewSwitcher,
  type ViewSwitcherMode,
} from "@/components/common";

export interface PosSecondaryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalBranches?: number;
  activeView?: "card" | "table" | string;
  onViewChange?: (view: "card" | "table") => void;
  className?: string;
}

export const PosSecondaryToolbar: React.FC<PosSecondaryToolbarProps> = ({
  searchQuery,
  onSearchChange,
  totalBranches = 100,
  activeView = "card",
  onViewChange,
  className,
}) => {
  const handleViewModeChange = (mode: ViewSwitcherMode) => {
    onViewChange?.(mode === "card" ? "card" : "table");
  };

  return (
    <SecondaryNavbar
      className={className}
      leftSlot={<div className="hidden sm:block w-32 shrink-0" />}
      centerSlot={
        <SecondaryNavbarSearch
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search..."
        />
      }
      rightSlot={
        <>
          <SecondaryNavbarPagination
            currentRangeText="1-100"
            total={totalBranches}
          />
          <SecondaryNavbarViewSwitcher
            activeView={activeView === "card" ? "card" : "table"}
            onViewChange={handleViewModeChange}
          />
        </>
      }
    />
  );
};

export default PosSecondaryToolbar;

