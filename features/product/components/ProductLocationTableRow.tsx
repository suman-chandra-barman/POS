"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type ProductLocationItem,
  type LocationColumnVisibility,
} from "../types/product.types";
import { AlignJustify } from "lucide-react";

interface ProductLocationTableRowProps {
  item: ProductLocationItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  columns: LocationColumnVisibility;
}

export const ProductLocationTableRow: React.FC<ProductLocationTableRowProps> = ({
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

      {/* Location */}
      <TableCell className="font-normal text-neutral-800">
        {item.location}
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

      {/* Category */}
      {columns.category && (
        <TableCell className="font-normal text-neutral-700">
          {item.category}
        </TableCell>
      )}

      {/* Value */}
      {columns.value && (
        <TableCell className="font-medium text-neutral-800">
          {item.value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
      )}

      {/* Inventory */}
      {columns.inventory && (
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2 font-medium text-neutral-800">
            <span>
              {item.inventory.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <AlignJustify className="size-3.5 text-neutral-400" />
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};
