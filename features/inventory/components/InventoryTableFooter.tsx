"use client";

import React from "react";
import { TableFooter, TableRow, TableCell } from "@/components/ui/table";
import { InventoryItem } from "../types/inventory.types";

interface InventoryTableFooterProps {
  items: InventoryItem[];
}

export const InventoryTableFooter: React.FC<InventoryTableFooterProps> = ({
  items,
}) => {
  // Calculate totals from displayed items
  const totalUnitCost = items.reduce((sum, item) => sum + item.unitCost, 0);
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <TableFooter className="bg-transparent border-t border-neutral-100 font-medium">
      <TableRow className="hover:bg-transparent">
        {/* Empty Checkbox Cell */}
        <TableCell className="w-10 pl-4 py-3.5" />

        {/* Total Label */}
        <TableCell className="py-3.5 text-xs font-bold text-neutral-900">
          Total
        </TableCell>

        {/* Barcode (Empty) */}
        <TableCell className="py-3.5" />

        {/* Selling Price (Empty) */}
        <TableCell className="py-3.5" />

        {/* Unit Cost Total */}
        <TableCell className="py-3.5 text-xs font-bold text-neutral-900">
          {totalUnitCost.toFixed(2)}
        </TableCell>

        {/* Stock Total */}
        <TableCell className="py-3.5 text-xs font-bold text-neutral-900">
          {totalStock}/pcs
        </TableCell>

        {/* Total Value */}
        <TableCell className="py-3.5 text-xs font-bold text-neutral-900">
          {totalValue.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>

        {/* Profit Margin (Empty) */}
        <TableCell className="py-3.5" />

        {/* Actions (Empty) */}
        <TableCell className="py-3.5 pr-4" />
      </TableRow>
    </TableFooter>
  );
};

export default InventoryTableFooter;
