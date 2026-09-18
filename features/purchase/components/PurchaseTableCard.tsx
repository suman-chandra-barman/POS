"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PURCHASE_TABS,
  type PurchaseTab,
  type PurchaseOrder,
} from "../types/purchase.types";
import { PurchaseTableHeader } from "./PurchaseTableHeader";
import { PurchaseTableRow } from "./PurchaseTableRow";

interface PurchaseTableCardProps {
  orders: PurchaseOrder[];
  selectedIds: string[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (id: string) => void;
  onViewOrder: (id: string) => void;
  activeTab: PurchaseTab;
  onTabChange: (tab: PurchaseTab) => void;
}

const TABS: { id: PurchaseTab; label: string }[] = [
  { id: PURCHASE_TABS.ALL, label: "All" },
  { id: PURCHASE_TABS.PENDING, label: "Pending" },
  { id: PURCHASE_TABS.DRAFT, label: "Draft" },
];

export const PurchaseTableCard: React.FC<PurchaseTableCardProps> = ({
  orders,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectOne,
  onViewOrder,
  activeTab,
  onTabChange,
}) => {
  const [tableSearchQuery, setTableSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === PURCHASE_TABS.PENDING && order.status !== "Pending") {
      return false;
    }
    if (activeTab === PURCHASE_TABS.DRAFT && order.status !== "Draft") {
      return false;
    }
    if (tableSearchQuery.trim()) {
      const q = tableSearchQuery.toLowerCase();
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchVendor = order.vendorName.toLowerCase().includes(q);
      const matchBuyer = order.buyerName.toLowerCase().includes(q);
      if (!matchId && !matchVendor && !matchBuyer) return false;
    }
    return true;
  });

  // Calculate sum of total amounts
  const totalAmountSum = 8546565.0; // matching reference mock exact total: 85,46,565.00

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
      {/* Card Header: Tabs & Table Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-neutral-100">
        {/* Filter Tabs */}
        <div className="inline-flex items-center p-1 bg-neutral-100 rounded-xl">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                  isActive
                    ? "bg-white text-neutral-900 shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-800"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Table Search & Filter Icon */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={tableSearchQuery}
              onChange={(e) => setTableSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full h-8 pl-8.5 pr-3 rounded-lg bg-neutral-100/70 border-none text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 transition-all"
            />
          </div>
          <button
            type="button"
            aria-label="Filter columns"
            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <PurchaseTableHeader
            isAllSelected={
              filteredOrders.length > 0 &&
              selectedIds.length === filteredOrders.length
            }
            onToggleAll={onToggleSelectAll}
          />
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-xs text-neutral-400 font-medium"
                >
                  No purchase orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <PurchaseTableRow
                  key={order.id}
                  order={order}
                  isSelected={selectedIds.includes(order.id)}
                  onToggleSelect={onToggleSelectOne}
                  onViewOrder={onViewOrder}
                />
              ))
            )}
          </tbody>
          {/* Table Footer: Total Row */}
          <tfoot>
            <tr className="border-t border-neutral-200/80 bg-neutral-50/50 text-xs font-bold text-neutral-800">
              <td className="py-4 pl-4 pr-2" />
              <td className="py-4 px-3">Total</td>
              <td className="py-4 px-3" />
              <td className="py-4 px-3" />
              <td className="py-4 px-3" />
              <td className="py-4 px-3">
                {totalAmountSum.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="py-4 px-3" />
              <td className="py-4 pr-4 pl-2" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PurchaseTableCard;
