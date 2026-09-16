"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  type ProductHistoryItem,
  type HistoryColumnVisibility,
} from "../types/product.types";

interface ProductHistoryTableRowProps {
  item: ProductHistoryItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  columns: HistoryColumnVisibility;
}

export const ProductHistoryTableRow: React.FC<ProductHistoryTableRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  columns,
}) => {
  return (
    <TableRow data-state={isSelected ? "selected" : undefined}>
      {/* Checkbox */}
      <TableCell className="w-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(item.id)}
        />
      </TableCell>

      {/* Date */}
      <TableCell className="font-normal text-neutral-700 whitespace-nowrap">
        {item.date}
      </TableCell>

      {/* Product Name + SKU */}
      <TableCell className="min-w-44">
        <div className="flex flex-col">
          <span className="font-semibold text-neutral-900 text-xs sm:text-[13px] leading-tight">
            {item.productName}
          </span>
          <span className="text-[11px] text-neutral-400 mt-0.5 tracking-tight">
            {item.productSku}
          </span>
        </div>
      </TableCell>

      {/* Reference */}
      {columns.reference && (
        <TableCell className="font-normal text-neutral-700">
          {item.reference}
        </TableCell>
      )}

      {/* From */}
      {columns.from && (
        <TableCell className="font-normal text-neutral-700">
          {item.from}
        </TableCell>
      )}

      {/* To */}
      {columns.to && (
        <TableCell className="font-normal text-neutral-700">
          {item.to}
        </TableCell>
      )}

      {/* Done By */}
      {columns.doneBy && (
        <TableCell className="font-normal text-neutral-700">
          {item.doneBy}
        </TableCell>
      )}

      {/* Quantity */}
      {columns.quantity && (
        <TableCell className="font-normal text-neutral-800">
          {item.quantity.toLocaleString("en-US")}
        </TableCell>
      )}

      {/* Status Badge */}
      {columns.status && (
        <TableCell>
          <Badge variant="success" className="rounded-md px-2.5 py-0.5 text-xs font-medium">
            {item.status}
          </Badge>
        </TableCell>
      )}

      {/* Row Action Icon */}
      <TableCell className="text-right w-10">
        <button
          type="button"
          className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
          title="Details"
        >
          <SlidersHorizontal className="size-3.5" />
        </button>
      </TableCell>
    </TableRow>
  );
};
