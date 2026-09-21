"use client";

import React, { useState } from "react";
import { Delete } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PosDiscountDialogProps {
  isOpen: boolean;
  initialDiscount?: number;
  onApplyDiscount: (percent: number) => void;
  onClose: () => void;
}

export const PosDiscountDialog: React.FC<PosDiscountDialogProps> = ({
  isOpen,
  initialDiscount = 10,
  onApplyDiscount,
  onClose,
}) => {
  const [discountInput, setDiscountInput] = useState<string>(
    initialDiscount ? initialDiscount.toString() : "10"
  );

  const handleDigitPress = (digit: string) => {
    setDiscountInput((prev) => {
      if (prev === "0") return digit;
      const next = prev + digit;
      const num = parseFloat(next);
      if (!isNaN(num) && num <= 100) {
        return next;
      }
      return prev;
    });
  };

  const handleDotPress = () => {
    setDiscountInput((prev) => {
      if (prev.includes(".")) return prev;
      return prev ? `${prev}.` : "0.";
    });
  };

  const handleBackspace = () => {
    setDiscountInput((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleApply = () => {
    const num = parseFloat(discountInput) || 0;
    onApplyDiscount(Math.min(100, Math.max(0, num)));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-xs rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200/90 [&>button:last-child]:hidden select-none">
        {/* Title (Matching Image 3) */}
        <DialogHeader className="pb-1">
          <DialogTitle className="text-lg font-bold text-neutral-900 tracking-tight text-left">
            Discount percentage
          </DialogTitle>
        </DialogHeader>

        {/* Display Field (Matching Image 3: centered percentage in red) */}
        <div className="py-2">
          <div className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white flex items-center justify-center">
            <span className="text-xl font-bold text-rose-700 tracking-wide">
              {discountInput || "0"}%
            </span>
          </div>
        </div>

        {/* 3x4 Keypad (Matching Image 3) */}
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-200">
          <div className="grid grid-cols-3 gap-px bg-neutral-200">
            {/* Row 1 */}
            <button
              type="button"
              onClick={() => handleDigitPress("1")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("2")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("3")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              3
            </button>

            {/* Row 2 */}
            <button
              type="button"
              onClick={() => handleDigitPress("4")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("5")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("6")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              6
            </button>

            {/* Row 3 */}
            <button
              type="button"
              onClick={() => handleDigitPress("7")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("8")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("9")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              9
            </button>

            {/* Row 4: . (peach), 0 (white), delete (salmon) */}
            <button
              type="button"
              onClick={handleDotPress}
              className="h-12 bg-[#fed7aa]/50 hover:bg-[#fed7aa]/80 active:bg-[#fdba74] text-lg font-bold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              .
            </button>
            <button
              type="button"
              onClick={() => handleDigitPress("0")}
              className="h-12 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-base font-semibold text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              aria-label="Delete digit"
              className="h-12 bg-[#fecaca] hover:bg-[#fca5a5] active:bg-[#f87171] text-neutral-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              <Delete className="size-5" />
            </button>
          </div>
        </div>

        {/* Footer Buttons (Matching Image 3) */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 h-11 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PosDiscountDialog;
