"use client";

import React from "react";
import { User, Users } from "lucide-react";
import {
  DISCOUNT_ELIGIBILITY,
  DISCOUNT_STATUS,
  type DiscountItem,
} from "../types/discount.types";

interface DiscountTableViewProps {
  discounts: DiscountItem[];
}

export const DiscountTableView: React.FC<DiscountTableViewProps> = ({
  discounts,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[11.5px] font-medium text-neutral-500 bg-neutral-50/50">
              <th className="py-3.5 px-6 font-semibold">Title</th>
              <th className="py-3.5 px-6 font-semibold">Coupons</th>
              <th className="py-3.5 px-6 font-semibold">Eligibility</th>
              <th className="py-3.5 px-6 font-semibold">Type</th>
              <th className="py-3.5 px-6 font-semibold text-center">Status</th>
              <th className="py-3.5 px-6 font-semibold text-right">Used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-800">
            {discounts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-neutral-400">
                  No discounts found
                </td>
              </tr>
            ) : (
              discounts.map((discount) => {
                const isSpecific =
                  discount.eligibility ===
                  DISCOUNT_ELIGIBILITY.SPECIFIC_CUSTOMER;

                return (
                  <tr
                    key={discount.id}
                    className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                  >
                    {/* Title */}
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      {discount.title}
                    </td>

                    {/* Coupons */}
                    <td className="py-4 px-6 text-neutral-600 font-mono text-[11.5px]">
                      {discount.coupons || "---"}
                    </td>

                    {/* Eligibility */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-neutral-700">
                        {isSpecific ? (
                          <User className="size-3.5 text-neutral-500" />
                        ) : (
                          <Users className="size-3.5 text-neutral-500" />
                        )}
                        <span>{discount.eligibilityLabel}</span>
                      </div>
                    </td>

                    {/* Type (Time ago) */}
                    <td className="py-4 px-6 text-neutral-500">
                      {discount.typeTime}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      {discount.status === DISCOUNT_STATUS.ACTIVE ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Used Count */}
                    <td className="py-4 px-6 text-right font-medium text-neutral-900">
                      {discount.usedCount}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
