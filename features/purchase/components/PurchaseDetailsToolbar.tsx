"use client";

import React, { useState } from "react";
import { ChevronDown, FileText, Printer, Copy } from "lucide-react";
import { toast } from "sonner";

interface PurchaseDetailsToolbarProps {
  onNewPurchase: () => void;
  orderId: string;
}

export const PurchaseDetailsToolbar: React.FC<PurchaseDetailsToolbarProps> = ({
  onNewPurchase,
  orderId,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);

  const handleExportPDF = () => {
    setMoreOpen(false);
    toast.success(`Exporting Purchase Order ${orderId} as PDF`);
  };

  const handleLabelPrint = () => {
    setMoreOpen(false);
    toast.success(`Printing barcode labels for ${orderId}`);
  };

  const handleDuplicate = () => {
    setMoreOpen(false);
    toast.success(`Duplicating Purchase Order ${orderId}`);
  };

  return (
    <div className="flex items-center gap-2.5 py-3 select-none">
      <button
        type="button"
        onClick={onNewPurchase}
        className="h-9 px-4.5 rounded-xl bg-[#007aff] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
      >
        New Purchase
      </button>

      {/* More dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className="h-9 px-3.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>More</span>
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
                onClick={handleExportPDF}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer text-left"
              >
                <FileText className="size-3.5 text-neutral-500" />
                <span>Export PDF</span>
              </button>
              <button
                type="button"
                onClick={handleLabelPrint}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer text-left"
              >
                <Printer className="size-3.5 text-neutral-500" />
                <span>Label Print</span>
              </button>
              <button
                type="button"
                onClick={handleDuplicate}
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

export default PurchaseDetailsToolbar;
