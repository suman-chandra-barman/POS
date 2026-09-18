"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface PurchaseTableHeaderProps {
  isAllSelected: boolean;
  onToggleAll: () => void;
}

export const PurchaseTableHeader: React.FC<PurchaseTableHeaderProps> = ({
  isAllSelected,
  onToggleAll,
}) => {
  return (
    <thead className="bg-white border-b border-neutral-100 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
      <tr>
        <th className="w-10 py-3.5 pl-4 pr-2 text-left">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onToggleAll}
            aria-label="Select all purchase orders"
            className="cursor-pointer"
          />
        </th>
        <th className="py-3.5 px-3 text-left">Order ID</th>
        <th className="py-3.5 px-3 text-left">Vendor</th>
        <th className="py-3.5 px-3 text-left">Buyer</th>
        <th className="py-3.5 px-3 text-left">Date</th>
        <th className="py-3.5 px-3 text-left">Total Amount</th>
        <th className="py-3.5 px-3 text-left">Status</th>
        <th className="w-12 py-3.5 pr-4 pl-2 text-center" />
      </tr>
    </thead>
  );
};

export default PurchaseTableHeader;
