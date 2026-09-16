"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ProductTab, type ProductColumnVisibility } from "../types/product.types";
import { ProductColumnVisibilityDropdown } from "./ProductColumnVisibilityDropdown";

interface ProductHeaderTabsProps {
  activeTab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleColumnDropdown: () => void;
  isColumnDropdownOpen: boolean;
  onCloseColumnDropdown: () => void;
  columns: ProductColumnVisibility;
  onToggleColumn: (key: keyof ProductColumnVisibility) => void;
}

const TABS: { key: ProductTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "archived", label: "Archived" },
];

export const ProductHeaderTabs: React.FC<ProductHeaderTabsProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onToggleColumnDropdown,
  isColumnDropdownOpen,
  onCloseColumnDropdown,
  columns,
  onToggleColumn,
}) => {
  const locale = useLocale();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      {/* Left Tabs */}
      <div className="flex items-center gap-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer select-none",
                isActive
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Actions: Add Product, Search Bar & Column Visibility Button */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Link
          href={`/${locale}/product/add`}
          className="inline-flex items-center gap-1.5 h-8 rounded-lg bg-[#232323] hover:bg-neutral-800 text-white px-3 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Add Product</span>
        </Link>

        <div className="relative flex-1 sm:w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full h-8 rounded-lg border border-neutral-200/90 bg-neutral-50/60 pl-8.5 pr-3 text-xs text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:border-sky-500 focus:outline-none transition-all"
          />
        </div>

        {/* Relative container for the filter button and its anchored dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={onToggleColumnDropdown}
            title="Toggle column visibility"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs",
              isColumnDropdownOpen && "border-sky-500 text-sky-600 bg-sky-50/50"
            )}
          >
            <SlidersHorizontal className="size-3.5" />
          </button>

          {isColumnDropdownOpen && (
            <ProductColumnVisibilityDropdown
              columns={columns}
              onChange={onToggleColumn}
              onClose={onCloseColumnDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
};
