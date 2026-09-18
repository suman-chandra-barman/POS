"use client";

import React from "react";

interface PurchaseDetailsTotalsCardProps {
  productAmount?: number;
  taxPercent?: number;
  totalAmount?: number;
}

export const PurchaseDetailsTotalsCard: React.FC<
  PurchaseDetailsTotalsCardProps
> = ({
  productAmount = 125354.0,
  taxPercent = 0.0,
  totalAmount = 125354.0,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none">
      <div className="max-w-xs ml-auto space-y-2 text-xs">
        <div className="flex items-center justify-between text-neutral-600">
          <span>All Product Amount:</span>
          <span className="font-semibold text-neutral-900">
            {productAmount.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between text-neutral-600">
          <span>Tax%:</span>
          <span className="font-semibold text-neutral-900">
            {taxPercent.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-sm font-bold text-neutral-900">
          <span>Total Amount:</span>
          <span className="text-base font-black">
            {totalAmount.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailsTotalsCard;
