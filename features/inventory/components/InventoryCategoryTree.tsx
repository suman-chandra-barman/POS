"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { InventoryCategoryNode } from "../types/inventory.types";

interface InventoryCategoryTreeProps {
  categories: InventoryCategoryNode[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (categoryName: string | null, subcategoryName?: string | null) => void;
}

export const InventoryCategoryTree: React.FC<InventoryCategoryTreeProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
}) => {
  // Keep "Ladies Top" and "Boy' Pant" open by default as shown in the screenshot
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "ladies-top": true,
    "boys-pant": true,
  });

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-[15px] tracking-tight text-neutral-900">
          Category List
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        {categories.map((cat) => {
          const isOpen = openCategories[cat.id] ?? false;
          const isCategorySelected =
            selectedCategory === cat.name && !selectedSubcategory;

          return (
            <div key={cat.id} className="w-full">
              {/* Category Header Row */}
              <div
                className={cn(
                  "flex items-center justify-between py-2 px-3 rounded-lg text-[13px] font-medium transition-colors cursor-pointer select-none",
                  isCategorySelected
                    ? "bg-neutral-100 text-neutral-900 font-semibold"
                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
                )}
                onClick={() => {
                  toggleCategory(cat.id);
                  onSelectCategory(isCategorySelected ? null : cat.name, null);
                }}
              >
                <span>{cat.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(cat.id);
                  }}
                  className="p-0.5 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
                  aria-label={`Toggle ${cat.name}`}
                >
                  {isOpen ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
              </div>

              {/* Subcategories with Tree connector lines */}
              {isOpen && cat.children && cat.children.length > 0 && (
                <div className="relative pl-6 mt-1 flex flex-col space-y-2">
                  {cat.children.map((sub, index) => {
                    const isSubSelected =
                      selectedCategory === cat.name &&
                      selectedSubcategory === sub.name;
                    const isLast = index === cat.children!.length - 1;

                    return (
                      <div key={sub.id} className="relative flex items-center">
                        {/* Vertical tree connector line */}
                        <div
                          className={cn(
                            "absolute -left-3 top-0 w-px bg-neutral-300",
                            isLast ? "h-3.5" : "h-full"
                          )}
                        />
                        {/* Horizontal tree branch line */}
                        <div className="absolute -left-3 top-3.5 w-3 h-px bg-neutral-300" />

                        <button
                          type="button"
                          onClick={() => {
                            if (isSubSelected) {
                              onSelectCategory(null, null);
                            } else {
                              onSelectCategory(cat.name, sub.name);
                            }
                          }}
                          className={cn(
                            "w-full text-left text-xs transition-all py-1.5 px-3 rounded-md cursor-pointer",
                            isSubSelected
                              ? "border border-neutral-300 bg-white text-neutral-900 font-medium shadow-2xs"
                              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                          )}
                        >
                          {sub.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryCategoryTree;
