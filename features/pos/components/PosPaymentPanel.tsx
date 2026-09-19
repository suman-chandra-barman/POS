"use client";

import React from "react";
import { Users, Banknote, Landmark, Smartphone, X } from "lucide-react";
import { POS_PAYMENT_METHODS, PosPaymentMethod } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosPaymentPanelProps {
  payableAmount: number;
  selectedMethod: PosPaymentMethod;
  onSelectMethod: (method: PosPaymentMethod) => void;
  tenderedAmount: number;
  onClearMethod: () => void;
}

export const PosPaymentPanel: React.FC<PosPaymentPanelProps> = ({
  payableAmount,
  selectedMethod,
  onSelectMethod,
  tenderedAmount,
  onClearMethod,
}) => {
  // Format the big amount: integer part and decimal part
  const formattedPayable = payableAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [integerPart, decimalPart] = formattedPayable.split(".");

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
    <div className="flex-1 flex flex-col h-full bg-white p-6 sm:p-10 select-none overflow-y-auto">
      {/* 1. Big Payable Amount at Top (Matching Images 3 & 4) */}
      <div className="text-center py-6 sm:py-10">
        <div className="inline-flex items-baseline font-bold tracking-tight">
          <span className="text-6xl sm:text-7xl font-extrabold text-neutral-900">
            {integerPart}
          </span>
          <span className="text-4xl sm:text-5xl font-semibold text-neutral-400">
            .{decimalPart || "00"}
          </span>
          <span className="text-4xl sm:text-5xl font-light text-neutral-500 ml-1">
            ৳
          </span>
        </div>
      </div>

      {/* 2. Payment Method Options List (Matching Image 4) */}
      <div className="max-w-xl w-full mx-auto space-y-3 mt-2">
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
                  ? "border-2 border-[#0088cc] shadow-2xs"
                  : "border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
              )}
            >
              {/* Left: Icon & Label */}
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "size-10 rounded-full flex items-center justify-center border",
                    isSelected
                      ? "border-[#0088cc]/30 bg-[#0088cc]/10 text-[#0088cc]"
                      : "border-neutral-200 bg-neutral-50 text-neutral-600"
                  )}
                >
                  <IconComp className="size-5" />
                </div>
                <span className="text-sm font-semibold text-neutral-800">
                  {opt.name}
                </span>
              </div>

              {/* Right: Amount input/pill and clear button if selected */}
              {isSelected ? (
                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900">
                    {tenderedAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
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

        {/* 3. Change Indicator (Matching Image 4) */}
        {change > 0 && (
          <div className="flex items-center justify-between pt-4 px-2">
            <span className="text-sm font-semibold text-emerald-600">
              Change
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-200">
              {change.toLocaleString("en-US", { minimumFractionDigits: 2 })} ৳
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
