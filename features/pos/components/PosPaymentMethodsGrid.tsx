"use client";

import React from "react";
import { Banknote, Users } from "lucide-react";
import { POS_PAYMENT_METHODS, PosPaymentMethod } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosPaymentMethodsGridProps {
  selectedMethod: PosPaymentMethod | null;
  onSelectMethod: (method: PosPaymentMethod) => void;
  isStep2?: boolean;
}

export const PosPaymentMethodsGrid: React.FC<PosPaymentMethodsGridProps> = ({
  selectedMethod,
  onSelectMethod,
  isStep2 = false,
}) => {
  return (
    <div className="p-3 bg-white select-none flex-1 flex flex-col justify-start">
      <div className="grid grid-cols-2 gap-2.5">
        {/* 1. Cash */}
        <button
          type="button"
          onClick={() => onSelectMethod(POS_PAYMENT_METHODS.CASH)}
          className={cn(
            "h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs",
            isStep2 && selectedMethod === POS_PAYMENT_METHODS.CASH
              ? "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-300"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
          )}
        >
          <Banknote className="size-6 text-neutral-600" />
          <span className="text-xs font-semibold">Cash</span>
        </button>

        {/* 2. Customer Account */}
        <button
          type="button"
          onClick={() => onSelectMethod(POS_PAYMENT_METHODS.CUSTOMER_ACCOUNT)}
          className={cn(
            "h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs",
            isStep2 && selectedMethod === POS_PAYMENT_METHODS.CUSTOMER_ACCOUNT
              ? "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-300"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
          )}
        >
          <Users className="size-6 text-neutral-600" />
          <span className="text-xs font-semibold">Customer Account</span>
        </button>

        {/* 3. Brac Bank */}
        <button
          type="button"
          onClick={() => onSelectMethod(POS_PAYMENT_METHODS.BRAC_BANK)}
          className={cn(
            "h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs",
            isStep2 && selectedMethod === POS_PAYMENT_METHODS.BRAC_BANK
              ? "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-300"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
          )}
        >
          <div className="size-6 flex items-center justify-center">
            <svg className="size-5" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="9" height="9" rx="1.5" fill="#00529B" />
              <rect x="12" y="12" width="9" height="9" rx="1.5" fill="#F4B41A" />
            </svg>
          </div>
          <span className="text-xs font-semibold">Brac Bank</span>
        </button>

        {/* 4. Bkash */}
        <button
          type="button"
          onClick={() => onSelectMethod(POS_PAYMENT_METHODS.BKASH)}
          className={cn(
            "h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs",
            isStep2 && selectedMethod === POS_PAYMENT_METHODS.BKASH
              ? "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-300"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
          )}
        >
          <div className="size-6 flex items-center justify-center">
            <svg className="size-5" viewBox="0 0 24 24" fill="#e2136e">
              <path d="M12.5 3L4 12.5l5.5 1.5L12 8l2.5 6 5.5-1.5L12.5 3z" />
              <path d="M9.5 14L4 19.5l7-2.5-1.5-3z" opacity="0.8" />
              <path d="M14.5 14l1.5 3 7-2.5L14.5 14z" opacity="0.8" />
            </svg>
          </div>
          <span className="text-xs font-semibold">Bkash</span>
        </button>

        {/* 5. City Bank */}
        <button
          type="button"
          onClick={() => onSelectMethod(POS_PAYMENT_METHODS.CITY_BANK)}
          className={cn(
            "h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs",
            isStep2 && selectedMethod === POS_PAYMENT_METHODS.CITY_BANK
              ? "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-300"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
          )}
        >
          <div className="size-6 flex items-center justify-center">
            <svg className="size-5" viewBox="0 0 24 24" fill="#dc2626">
              <path d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z" />
            </svg>
          </div>
          <span className="text-xs font-semibold">City Bank</span>
        </button>

        {/* 6. Empty slot */}
        <div className="h-20 rounded-xl border border-dashed border-neutral-200/60 bg-neutral-50/30" />
      </div>
    </div>
  );
};
