"use client";

import React from "react";

interface PosPaymentAmountDisplayProps {
  amount: number;
  className?: string;
}

export const PosPaymentAmountDisplay: React.FC<PosPaymentAmountDisplayProps> = ({
  amount,
  className = "",
}) => {
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [integerPart, decimalPart] = formatted.split(".");

  return (
    <div className={`text-center select-none ${className}`}>
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
  );
};
