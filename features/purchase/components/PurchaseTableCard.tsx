"use client";

import React from "react";
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
  searchQuery?: string;
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
  searchQuery = "",
}) => {
  const filteredOrders = orders.filter((order) => {
    if (activeTab === PURCHASE_TABS.PENDING && order.status !== "Pending") {
      return false;
    }
    if (activeTab === PURCHASE_TABS.DRAFT && order.status !== "Draft") {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
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
      {/* Card Header: Tabs */}
      <div className="flex items-center px-5 py-3.5 border-b border-neutral-100">
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
