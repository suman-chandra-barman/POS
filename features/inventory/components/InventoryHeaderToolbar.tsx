"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVENTORY_TABS, InventoryTab } from "../types/inventory.types";

interface InventoryHeaderToolbarProps {
  activeTab: InventoryTab;
  onTabChange: (tab: InventoryTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TABS: { id: InventoryTab; label: string }[] = [
  { id: INVENTORY_TABS.ALL, label: "All" },
  { id: INVENTORY_TABS.INACTIVE, label: "Inactive" },
  { id: INVENTORY_TABS.ARCHIVED, label: "Archived" },
];

export const InventoryHeaderToolbar: React.FC<InventoryHeaderToolbarProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 pb-4 border-b border-neutral-100">
      {/* Tabs */}
      <div className="inline-flex items-center p-1 bg-neutral-100/80 rounded-xl">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                isActive
                  ? "bg-white text-neutral-900 shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50/50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full h-9 pl-3.5 pr-9 text-xs rounded-xl bg-neutral-100/70 border-none placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:ring-1.5 focus:ring-neutral-300 transition-all"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default InventoryHeaderToolbar;
