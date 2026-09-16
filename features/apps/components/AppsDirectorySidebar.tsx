"use client";

import React from "react";
import {
  ShoppingBag,
  FileText,
  Tag,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_SIDEBAR_CATEGORIES } from "../data/appsDirectoryData";

const SIDEBAR_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  FileText,
  Tag,
  Warehouse,
};

interface AppsDirectorySidebarProps {
  activeTab: "all" | "free";
  selectedCategory: string | null;
  onSelectTab: (tab: "all" | "free") => void;
  onSelectCategory: (categoryId: string | null) => void;
}

export const AppsDirectorySidebar: React.FC<AppsDirectorySidebarProps> = ({
  activeTab,
  selectedCategory,
  onSelectTab,
  onSelectCategory,
}) => {
  return (
    <aside className="w-full md:w-60 shrink-0 rounded-3xl bg-white p-5 border border-neutral-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)]">
      <h2 className="text-base font-bold text-neutral-900 tracking-tight">
        App list
      </h2>

      {/* Tab Filter List */}
      <div className="mt-3 space-y-1">
        <button
          type="button"
          onClick={() => {
            onSelectTab("all");
            onSelectCategory(null);
          }}
          className={cn(
            "w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors cursor-pointer text-left",
            activeTab === "all" && selectedCategory === null
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          )}
        >
          <span>All app</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onSelectTab("free");
            onSelectCategory(null);
          }}
          className={cn(
            "w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors cursor-pointer text-left",
            activeTab === "free" && selectedCategory === null
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          )}
        >
          <span>Free app</span>
        </button>
      </div>

      {/* Categories Section */}
      <div className="mt-6">
        <h3 className="text-xs font-bold text-neutral-800 tracking-tight mb-2.5">
          Category&apos;s
        </h3>

        <div className="space-y-1">
          {APP_SIDEBAR_CATEGORIES.map((cat) => {
            const IconComponent = SIDEBAR_ICON_MAP[cat.iconName] || Tag;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(isSelected ? null : cat.id);
                }}
                className={cn(
                  "w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors cursor-pointer text-left",
                  isSelected
                    ? "bg-neutral-100 text-neutral-900 font-semibold"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex size-6 items-center justify-center rounded-lg bg-neutral-50 text-neutral-500 border border-neutral-100">
                    <IconComponent className="size-3.5" />
                  </div>
                  <span className="font-medium">{cat.name}</span>
                </div>

                <span className="text-[11px] text-neutral-400 font-medium">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
