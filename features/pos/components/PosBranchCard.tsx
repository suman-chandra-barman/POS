"use client";

import React, { useState } from "react";
import { MoreVertical, Store, ReceiptText, Edit2 } from "lucide-react";
import { PosBranch } from "../types/pos.types";

interface PosBranchCardProps {
  branch: PosBranch;
  onSelect: (branch: PosBranch) => void;
}

export const PosBranchCard: React.FC<PosBranchCardProps> = ({
  branch,
  onSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Card Header & Stats */}
      <div>
        <h3 className="text-base font-bold text-neutral-900 mb-4 tracking-tight">
          {branch.name}
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Date:</span>
            <span className="text-neutral-700 font-medium">{branch.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Opening Balance:</span>
            <span className="text-neutral-700 font-medium">
              {branch.openingBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#0284c7] font-medium">Sold:</span>
            <span className="text-[#0284c7] font-semibold">
              {branch.sold.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(branch)}
          className="px-4 py-2 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          Continue to sale
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Branch actions"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <MoreVertical className="size-4.5" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 bottom-full mb-1.5 w-36 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onSelect(branch);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <Store className="size-3.5 text-neutral-400" />
                  <span>Session</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <ReceiptText className="size-3.5 text-neutral-400" />
                  <span>Order</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <Edit2 className="size-3.5 text-neutral-400" />
                  <span>Edit</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
