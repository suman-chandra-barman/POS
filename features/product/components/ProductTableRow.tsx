"use client";

import React from "react";
import { MoreVertical, Shirt } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProductItem, type ProductColumnVisibility } from "../types/product.types";

interface ProductTableRowProps {
  product: ProductItem;
  isSelected: boolean;
  onToggleSelect: (productId: string) => void;
  onViewHistory: (productId: string) => void;
  onViewLocation: (productId: string) => void;
  columns: ProductColumnVisibility;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onViewHistory,
  onViewLocation,
  columns,
}) => {
  return (
    <TableRow data-state={isSelected ? "selected" : undefined}>
      {/* Checkbox */}
      <TableCell className="w-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(product.id)}
        />
      </TableCell>

      {/* Product Image + Name + SKU */}
      <TableCell className="min-w-48">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50/80 text-neutral-500 overflow-hidden">
            <Shirt className="size-5 text-sky-600 stroke-[1.7]" />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 text-xs sm:text-[13px] leading-tight">
              {product.name}
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 tracking-tight font-normal">
              {product.sku}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Selling Price */}
      {columns.sellingPrice && (
        <TableCell className="font-medium text-neutral-800">
          {product.sellingPrice !== null
            ? product.sellingPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "-"}
        </TableCell>
      )}

      {/* Category */}
      {columns.category && (
        <TableCell className="text-neutral-700 font-normal">
          {product.category}
        </TableCell>
      )}

      {/* Inventory */}
      {columns.inventory && (
        <TableCell className="text-neutral-700 font-normal">
          {product.inventory} in stock
        </TableCell>
      )}

      {/* Cost */}
      {columns.cost && (
        <TableCell className="font-medium text-neutral-800">
          {product.cost.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
      )}

      {/* Quick Action Links & Menu */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-3.5">
          {columns.history && (
            <button
              type="button"
              onClick={() => onViewHistory(product.id)}
              className="text-xs font-semibold text-[#0095FF] hover:text-sky-700 hover:underline transition-colors cursor-pointer"
            >
              History
            </button>
          )}

          {columns.location && (
            <button
              type="button"
              onClick={() => onViewLocation(product.id)}
              className="text-xs font-semibold text-[#0095FF] hover:text-sky-700 hover:underline transition-colors cursor-pointer"
            >
              Location
            </button>
          )}

          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
            title="More actions"
          >
            <MoreVertical className="size-3.5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};
