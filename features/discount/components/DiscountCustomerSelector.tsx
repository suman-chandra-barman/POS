"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import type { SelectedTagItem } from "../types/discount.types";
import { SAMPLE_CUSTOMERS } from "../data/discountMockData";
import { cn } from "@/lib/utils";

interface DiscountCustomerSelectorProps {
  selectedCustomers: SelectedTagItem[];
  onChange: (customers: SelectedTagItem[]) => void;
  className?: string;
}

export const DiscountCustomerSelector: React.FC<
  DiscountCustomerSelectorProps
> = ({ selectedCustomers, onChange, className }) => {
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemove = (id: string) => {
    onChange(selectedCustomers.filter((c) => c.id !== id));
  };

  const handleToggleCustomer = (customer: SelectedTagItem) => {
    if (selectedCustomers.some((c) => c.id === customer.id)) {
      onChange(selectedCustomers.filter((c) => c.id !== customer.id));
    } else {
      onChange([...selectedCustomers, customer]);
    }
  };

  const availableCustomers = SAMPLE_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("space-y-2 relative", className)}>
      {/* Search Bar with Browse Button */}
      <div className="flex items-center h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/70">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isBrowseOpen) setIsBrowseOpen(true);
          }}
          placeholder="Search customers"
          className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
        />
        <button
          type="button"
          onClick={() => setIsBrowseOpen((v) => !v)}
          className="shrink-0 h-6 px-2.5 rounded-md border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-[11px] font-medium text-neutral-700 transition-colors cursor-pointer"
        >
          Browse
        </button>
      </div>

      {/* Browse Dropdown Menu */}
      {isBrowseOpen && (
        <div className="absolute top-11 left-0 z-40 w-full rounded-xl border border-neutral-200 bg-white p-2 shadow-xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="text-[11px] font-semibold text-neutral-500 px-2 py-1">
            Select Customers
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {availableCustomers.map((c) => {
              const isSelected = selectedCustomers.some((item) => item.id === c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleToggleCustomer(c)}
                  className={cn(
                    "w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer",
                    isSelected
                      ? "bg-sky-50 text-sky-800 font-medium"
                      : "hover:bg-neutral-50 text-neutral-700"
                  )}
                >
                  <span>{c.name}</span>
                  {isSelected && <span className="text-[11px] text-sky-600">✓</span>}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-neutral-100 flex justify-end">
            <button
              type="button"
              onClick={() => setIsBrowseOpen(false)}
              className="text-[11px] font-medium text-sky-600 hover:text-sky-700 px-2 py-1"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Selected Customer Tags */}
      {selectedCustomers.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {selectedCustomers.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200/90 bg-white text-xs font-normal text-neutral-700 shadow-2xs group"
            >
              <span>{c.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(c.id)}
                className="text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                title="Remove"
              >
                <X className="size-3" strokeWidth={2.2} />
              </button>
            </span>
          ))}

          {/* 30+ Badge from Screenshot 4 */}
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-lg bg-neutral-900 text-white text-[11px] font-semibold select-none shadow-2xs">
            30+
          </span>
        </div>
      )}
    </div>
  );
};
