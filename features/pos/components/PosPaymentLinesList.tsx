"use client";

import React from "react";
import { Users, Banknote, Landmark, Smartphone, X } from "lucide-react";
import { POS_PAYMENT_METHODS, PosPaymentMethod } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosPaymentLinesListProps {
  payableAmount: number;
  selectedMethod: PosPaymentMethod;
  tenderedAmount: number;
  onSelectMethod: (method: PosPaymentMethod) => void;
  onClearMethod: () => void;
}

export const PosPaymentLinesList: React.FC<PosPaymentLinesListProps> = ({
  payableAmount,
  selectedMethod,
  tenderedAmount,
  onSelectMethod,
  onClearMethod,
}) => {
  const change = Math.max(0, tenderedAmount - payableAmount);

  const paymentOptions = [
    {
      id: POS_PAYMENT_METHODS.CUSTOMER_ACCOUNT,
      name: "Customer Account",
      icon: Users,
    },
    {
      id: POS_PAYMENT_METHODS.CASH,
      name: "Cash",
      icon: Banknote,
    },
    {
      id: POS_PAYMENT_METHODS.PUBALI_BANK,
      name: "Pubali Bank",
      icon: Landmark,
    },
    {
      id: POS_PAYMENT_METHODS.BKASH,
      name: "Bkash",
      icon: Smartphone,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto space-y-3 mt-4 select-none">
      {paymentOptions.map((opt) => {
        const isSelected = selectedMethod === opt.id;
        const IconComp = opt.icon;

        return (
          <div
            key={opt.id}
            onClick={() => onSelectMethod(opt.id)}
            className={cn(
              "w-full rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer bg-white",
              isSelected
                ? "border-2 border-[#0284c7] shadow-xs"
                : "border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60"
            )}
          >
            {/* Left: Icon & Label */}
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center border",
                  isSelected
                    ? "border-[#0284c7]/30 bg-[#0284c7]/10 text-[#0284c7]"
                    : "border-neutral-200 bg-neutral-50 text-neutral-600"
                )}
              >
                <IconComp className="size-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">
                {opt.name}
              </span>
            </div>

            {/* Right: Amount pill and clear button if selected */}
            {isSelected ? (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900">
                  {tenderedAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ৳
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearMethod();
                  }}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Change Indicator (Matching Image 3) */}
      {change > 0 && (
        <div className="flex items-center justify-between pt-3 px-2">
          <span className="text-sm font-semibold text-emerald-600">Change</span>
          <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-200">
            {change.toLocaleString("en-US", { minimumFractionDigits: 2 })} ৳
          </span>
        </div>
      )}
    </div>
  );
};
