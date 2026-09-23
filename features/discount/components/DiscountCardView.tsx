"use client";

import React from "react";
import {
  DISCOUNT_STATUS,
  type DiscountItem,
} from "../types/discount.types";
import { DiscountEmptyState } from "./DiscountEmptyState";

interface DiscountCardViewProps {
  discounts: DiscountItem[];
  onCreateOffer: () => void;
}

export const DiscountCardView: React.FC<DiscountCardViewProps> = ({
  discounts,
  onCreateOffer,
}) => {
  if (discounts.length === 0) {
    return <DiscountEmptyState onCreateOffer={onCreateOffer} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {discounts.map((discount) => {
        const isActive = discount.status === DISCOUNT_STATUS.ACTIVE;
        const hasCoupon = Boolean(
          discount.coupons && discount.coupons !== "---"
        );

        return (
          <div
            key={discount.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all cursor-pointer"
          >
            {/* ── Top Header: Title & Status Badge aligned on same row ── */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-neutral-900 transition-colors truncate flex-1">
                  {discount.title}
                </h3>

                {/* Status Badge */}
                <div className="shrink-0">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-600">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Big Discount Value Display */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-black tracking-tight text-neutral-900">
                  {discount.value}
                  {discount.valueType === "percentage" ? "%" : "৳"}
                </span>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-0.5">
                  OFF
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="my-3.5 h-px bg-neutral-100" />

            {/* ── Clean Metadata Details (Without Cluttering Icons) ── */}
            <div className="space-y-2.5 text-xs">
              {/* Coupon Row */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">Coupon</span>
                {hasCoupon ? (
                  <span className="font-mono text-[11.5px] font-medium text-neutral-800 bg-neutral-50 border border-neutral-200/70 px-2 py-0.5 rounded-md truncate max-w-36">
                    {discount.coupons}
                  </span>
                ) : (
                  <span className="text-neutral-400 font-mono text-xs">
                    ---
                  </span>
                )}
              </div>

              {/* Eligibility Row */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">Eligibility</span>
                <span className="font-medium text-neutral-800 truncate max-w-36 text-right">
                  {discount.eligibilityLabel}
                </span>
              </div>

              {/* Used Count Row */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-normal">Used count</span>
                <span className="font-semibold text-neutral-900">
                  {discount.usedCount} used
                </span>
              </div>
            </div>

            {/* ── Footer: Updated Time ── */}
            <div className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Updated</span>
              <span className="font-medium text-neutral-500">
                {discount.typeTime}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
