"use client";

import React from "react";
import { Users } from "lucide-react";

interface CustomerStatsCardsProps {
  totalCustomers?: number;
  dueAmount?: number;
}

export const CustomerStatsCards: React.FC<CustomerStatsCardsProps> = ({
  totalCustomers = 592,
  dueAmount = 26658,
}) => {
  // Mini chart bar heights matching the visual design
  const blueBarHeights = [20, 35, 25, 45, 60, 50, 80, 95, 70, 85];
  const redBarHeights = [15, 25, 40, 30, 55, 75, 65, 85, 95, 70];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
      {/* Card 1: All Customer */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600">
            All Customer
          </span>
          <div className="size-8 rounded-full flex items-center justify-center text-neutral-400">
            <Users className="size-5 stroke-[1.8]" />
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              {totalCustomers}
            </div>
            <p className="text-xs text-neutral-400 mt-1.5 font-normal">
              You have increased contact by 20% compared to last month
            </p>
          </div>

          {/* Mini Sky-Blue Bar Chart */}
          <div className="flex items-end gap-1 h-10 shrink-0 pl-2">
            {blueBarHeights.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-1.5 bg-sky-300 rounded-xs"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Due Amount */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600">
            Due Amount
          </span>
          <div className="size-8 rounded-full flex items-center justify-center text-neutral-400">
            <Users className="size-5 stroke-[1.8]" />
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              ৳{dueAmount.toLocaleString()}
            </div>
            <p className="text-xs text-neutral-400 mt-1.5 font-normal">
              Increase your income 15% last 7 days
            </p>
          </div>

          {/* Mini Rose Bar Chart */}
          <div className="flex items-end gap-1 h-10 shrink-0 pl-2">
            {redBarHeights.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-1.5 bg-rose-300 rounded-xs"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatsCards;
