"use client";

import React from "react";
import { Shirt, MapPin } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { InventoryItem } from "../types/inventory.types";

interface InventoryTableRowProps {
  item: InventoryItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onViewHistory: (item: InventoryItem) => void;
  onViewLocation: (item: InventoryItem) => void;
}

export const InventoryTableRow: React.FC<InventoryTableRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onViewHistory,
  onViewLocation,
}) => {
  return (
    <TableRow
      data-state={isSelected ? "selected" : undefined}
      className="hover:bg-neutral-50/70 border-b border-neutral-100 transition-colors"
    >
      {/* Checkbox */}
      <TableCell className="w-10 pl-4 py-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(item.id)}
          aria-label={`Select ${item.name}`}
        />
      </TableCell>

      {/* Product Image + Name */}
      <TableCell className="py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7.5 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-white shadow-2xs">
            <Shirt className="size-4 stroke-[1.8] text-white" />
          </div>
          <span className="font-medium text-neutral-900 text-xs tracking-tight">
            {item.name}
          </span>
        </div>
      </TableCell>

      {/* Barcode */}
      <TableCell className="py-3 text-xs text-neutral-600 font-normal">
        {item.barcode}
      </TableCell>

      {/* Selling Price */}
      <TableCell className="py-3 text-xs text-neutral-900 font-normal">
        {item.sellingPrice.toFixed(2)}
      </TableCell>

      {/* Unit Cost */}
      <TableCell className="py-3 text-xs text-neutral-900 font-normal">
        {item.unitCost.toFixed(2)}
      </TableCell>

      {/* Stock */}
      <TableCell className="py-3 text-xs text-neutral-700 font-normal">
        {item.stock}/{item.unit}
      </TableCell>

      {/* Total Value */}
      <TableCell className="py-3 text-xs text-neutral-900 font-normal">
        {item.totalValue.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* Profit Margin */}
      <TableCell className="py-3 text-xs text-neutral-900 font-normal">
        {item.profitMargin.toFixed(1)}%
      </TableCell>

      {/* Actions */}
      <TableCell className="py-3 pr-4 text-right">
        <div className="flex items-center justify-end gap-3.5">
          <button
            type="button"
            onClick={() => onViewHistory(item)}
            className="text-xs font-medium text-[#0095FF] hover:text-sky-700 hover:underline transition-colors cursor-pointer"
          >
            History
          </button>

          <button
            type="button"
            onClick={() => onViewLocation(item)}
            className="text-[#0095FF] hover:text-sky-700 transition-colors p-1 rounded-md hover:bg-sky-50 cursor-pointer"
            title="View Location"
          >
            <MapPin className="size-3.5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InventoryTableRow;
