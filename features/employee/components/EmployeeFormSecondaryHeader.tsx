"use client";

import React from "react";
import { ShoppingBag, FileText, CreditCard } from "lucide-react";

interface EmployeeFormSecondaryHeaderProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  posOrdersCount?: number;
  invoicedCount?: number;
  dueAmount?: number;
}

export const EmployeeFormSecondaryHeader: React.FC<EmployeeFormSecondaryHeaderProps> = ({
  onSave,
  onCancel,
  isSaving = false,
  posOrdersCount = 56,
  invoicedCount = 30,
  dueAmount = 17532.0,
}) => {
  return (
    <div className="w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none">
      {/* ── Left Side: Actions & Breadcrumb ── */}
      <div className="flex items-center gap-2.5">
        {/* Save Employee */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 disabled:opacity-50 text-neutral-800 border border-neutral-200/80 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          {isSaving ? "Saving..." : "Save Employee"}
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-700 border border-neutral-200/80 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          Cancel
        </button>

        {/* Employee Profile Breadcrumb */}
        <span className="text-xs font-bold text-[#0284c7] ml-2">
          Employee Profile
        </span>
      </div>

      {/* ── Right Side: Metric Badges (Matching Image 2) ── */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* 1. PoS Orders */}
        <div className="h-8.5 px-3 rounded-lg border border-neutral-200/90 bg-white flex items-center gap-2 text-xs shadow-2xs">
          <ShoppingBag className="size-3.5 text-neutral-500 shrink-0" />
          <span className="text-neutral-600 font-medium text-[11px]">
            PoS Orders
          </span>
          <span className="text-xs font-bold text-[#0284c7]">
            {posOrdersCount}
          </span>
        </div>

        {/* 2. Invoiced */}
        <div className="h-8.5 px-3 rounded-lg border border-neutral-200/90 bg-white flex items-center gap-2 text-xs shadow-2xs">
          <FileText className="size-3.5 text-neutral-500 shrink-0" />
          <span className="text-neutral-600 font-medium text-[11px]">
            Invoiced
          </span>
          <span className="text-xs font-bold text-[#0284c7]">
            {invoicedCount}
          </span>
        </div>

        {/* 3. Due */}
        <div className="h-8.5 px-3 rounded-lg border border-neutral-200/90 bg-white flex items-center gap-2 text-xs shadow-2xs">
          <CreditCard className="size-3.5 text-neutral-500 shrink-0" />
          <span className="text-neutral-600 font-medium text-[11px]">Due</span>
          <span className="text-xs font-bold text-[#0284c7]">
            {dueAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormSecondaryHeader;
