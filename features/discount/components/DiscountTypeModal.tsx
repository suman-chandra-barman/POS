"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DiscountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiscount: () => void;
  onSelectBuyXGetY: () => void;
}

export const DiscountTypeModal: React.FC<DiscountTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectDiscount,
  onSelectBuyXGetY,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 gap-0 border border-neutral-100/90 shadow-xl bg-white">
        <DialogHeader className="pb-3 text-left">
          <DialogTitle className="text-sm font-bold text-neutral-900">
            Selected to create
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-1">
          {/* Option 1: Discount / Gift */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectDiscount();
            }}
            className="w-full text-left p-3.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group select-none"
          >
            <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 group-hover:text-sky-600 transition-colors">
              Discount / Gift
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 leading-relaxed">
              Apply percentage or fixed discounts on selected products
            </p>
          </button>

          <div className="h-px bg-neutral-100 my-1" />

          {/* Option 2: Buy X - Get X */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectBuyXGetY();
            }}
            className="w-full text-left p-3.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group select-none"
          >
            <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 group-hover:text-sky-600 transition-colors">
              Buy X - Get X
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 leading-relaxed">
              Create offers like buy one get one or bundle deals
            </p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
