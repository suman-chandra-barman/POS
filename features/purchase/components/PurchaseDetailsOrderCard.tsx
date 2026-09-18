"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface PurchaseDetailsOrderCardProps {
  orderId?: string;
  date?: string;
  supplierName?: string;
  destination?: string;
  receivedCount?: number;
  totalCount?: number;
}

export const PurchaseDetailsOrderCard: React.FC<
  PurchaseDetailsOrderCardProps
> = ({
  orderId = "SJ0001",
  date = "Mar 12, 2026",
  supplierName = "JK Fashion",
  destination = "Rampura Banasree",
  receivedCount = 600,
  totalCount = 1000,
}) => {
  const percentage = Math.round((receivedCount / totalCount) * 100);

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none">
      {/* Top row: Order ID + Date */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium text-neutral-500">
            Purchase Order ID:
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
            {orderId}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
          <Calendar className="size-3.5 text-neutral-500" />
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Two columns: Supplier & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pb-6 border-b border-neutral-100">
        <div>
          <span className="text-xs font-medium text-neutral-500">
            Supplier Details
          </span>
          <p className="text-base font-bold text-neutral-900 mt-1">
            {supplierName}
          </p>
        </div>

        <div className="md:border-l md:border-neutral-100 md:pl-6">
          <span className="text-xs font-medium text-neutral-500">
            Destination
          </span>
          <p className="text-base font-bold text-neutral-900 mt-1">
            {destination}
          </p>
        </div>
      </div>

      {/* Progress Bar & Status text */}
      <div className="mt-5 space-y-1.5">
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#16a34a] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-neutral-600 font-medium">
            Total received: {receivedCount} of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailsOrderCard;
