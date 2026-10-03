"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Columns3 } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import {
  PRODUCT_TABS,
  type ProductTab,
  type ProductColumnVisibility,
} from "../types/product.types";
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
  { key: PRODUCT_TABS.ALL, label: "All" },
  { key: PRODUCT_TABS.DRAFT, label: "Draft" },
  { key: PRODUCT_TABS.ARCHIVED, label: "Archived" },
];

export const ProductHeaderTabs: React.FC<ProductHeaderTabsProps> = ({
  activeTab,
  onTabChange,
  onToggleColumnDropdown,
  isColumnDropdownOpen,
  onCloseColumnDropdown,
  columns,
  onToggleColumn,
}) => {

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
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Actions: Add Product, Search Bar & Column Visibility Button */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Relative container for the filter button and its anchored dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={onToggleColumnDropdown}
            title="Toggle column visibility"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs",
              isColumnDropdownOpen &&
                "border-sky-500 text-sky-600 bg-sky-50/50",
            )}
          >
            <HugeiconsIcon
              icon={Columns3}
              size={16}
              strokeWidth={1.5}
              className="shrink-0"
            />
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
