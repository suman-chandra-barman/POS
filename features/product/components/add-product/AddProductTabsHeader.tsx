"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { type AddProductActiveTab } from "../../types/addProduct.types";

interface AddProductTabsHeaderProps {
  activeTab: AddProductActiveTab;
  onTabChange: (tab: AddProductActiveTab) => void;
}

const TABS: { key: AddProductActiveTab; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "price-tax", label: "Price & Tax" },
  { key: "variants", label: "Variants" },
];

export const AddProductTabsHeader: React.FC<AddProductTabsHeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#F7F7F7] border border-neutral-200/90 shadow-2xs p-2 mb-4 sm:mb-5">
      <div className="flex items-center gap-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "rounded-xl px-4 py-1.5 text-xs transition-all cursor-pointer select-none",
                isActive
                  ? "bg-white text-neutral-900 font-bold shadow-xs border border-neutral-200/80"
                  : "text-neutral-600 hover:text-neutral-900 font-medium hover:bg-neutral-200/50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
