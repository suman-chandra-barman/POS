"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { type ProductColumnVisibility } from "../types/product.types";

interface ProductColumnVisibilityDropdownProps {
  columns: ProductColumnVisibility;
  onChange: (key: keyof ProductColumnVisibility) => void;
  onClose: () => void;
}

const COLUMN_ITEMS: { key: keyof ProductColumnVisibility; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "subcategory", label: "Subcategory" },
  { key: "location", label: "Location" },
  { key: "history", label: "History" },
  { key: "sellingPrice", label: "Product Price" },
  { key: "inventory", label: "Inventory" },
];

export const ProductColumnVisibilityDropdown: React.FC<ProductColumnVisibilityDropdownProps> = ({
  columns,
  onChange,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} />

      {/* Popover Card */}
      <div className="absolute right-0 top-full mt-1.5 z-40 w-44 rounded-xl border border-neutral-100 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in-0 zoom-in-95 duration-150">
        <div className="space-y-0.5">
          {COLUMN_ITEMS.map((item) => {
            const isVisible = columns[item.key];
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
                className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <span className="font-medium">{item.label}</span>
                {isVisible ? (
                  <Eye className="size-3.5 text-neutral-500" />
                ) : (
                  <EyeOff className="size-3.5 text-neutral-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
