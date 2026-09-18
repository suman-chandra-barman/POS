"use client";

import React, { useState } from "react";
import { ChevronDown, X, FileText, Edit2, Copy } from "lucide-react";
import { toast } from "sonner";

interface NewPurchaseToolbarProps {
  onConfirmOrder: () => void;
  onValidate: () => void;
  onCancelOrder: () => void;
}

export const NewPurchaseToolbar: React.FC<NewPurchaseToolbarProps> = ({
  onConfirmOrder,
  onValidate,
  onCancelOrder,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="flex items-center gap-2.5 py-3 select-none">
      {/* Confirm Order Button */}
      <button
        type="button"
        onClick={onConfirmOrder}
        className="h-9 px-4.5 rounded-xl bg-[#007aff] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <span>Confirm order</span>
      </button>

      {/* Validate Button */}
      <button
        type="button"
        onClick={onValidate}
        className="h-9 px-4 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
      >
        Validate
      </button>

      {/* More option Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className="h-9 px-3.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>More option</span>
          <ChevronDown className="size-3.5 text-neutral-500" />
        </button>

        {moreOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMoreOpen(false)}
            />
            <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false);
                  onCancelOrder();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer text-left font-medium"
              >
                <X className="size-3.5" />
                <span>Cancel Order</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false);
                  toast.success("Exporting order as PDF...");
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer text-left"
              >
                <FileText className="size-3.5 text-neutral-500" />
                <span>Export PDF</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false);
                  toast.info("Order opened for editing");
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer text-left"
              >
                <Edit2 className="size-3.5 text-neutral-500" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false);
                  toast.success("Order duplicated");
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer text-left"
              >
                <Copy className="size-3.5 text-neutral-500" />
                <span>Duplicate</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewPurchaseToolbar;
