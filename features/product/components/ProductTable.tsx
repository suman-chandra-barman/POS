"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type ProductItem,
  type ProductColumnVisibility,
} from "../types/product.types";
import { ProductTableRow } from "./ProductTableRow";

interface ProductTableProps {
  products: ProductItem[];
  selectedIds: string[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (productId: string) => void;
  onViewHistory: (productId: string) => void;
  onViewLocation: (productId: string) => void;
  columns: ProductColumnVisibility;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectOne,
  onViewHistory,
  onViewLocation,
  columns,
}) => {
  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-xs text-neutral-400 font-medium">
        No products found in this view.
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white border border-neutral-100/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-neutral-50/40 hover:bg-neutral-50/40">
            {/* Select All Checkbox */}
            <TableHead className="w-10">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>

            <TableHead className="font-semibold text-neutral-800">
              Product
            </TableHead>

            {columns.sellingPrice && (
              <TableHead className="font-semibold text-neutral-800">
                Selling Price
              </TableHead>
            )}

            {columns.category && (
              <TableHead className="font-semibold text-neutral-800">
                Category
              </TableHead>
            )}

            {columns.inventory && (
              <TableHead className="font-semibold text-neutral-800">
                Inventory
              </TableHead>
            )}

            {columns.cost && (
              <TableHead className="font-semibold text-neutral-800">
                Cost
              </TableHead>
            )}

            <TableHead className="text-right font-semibold text-neutral-800" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedIds.includes(product.id)}
              onToggleSelect={onToggleSelectOne}
              onViewHistory={onViewHistory}
              onViewLocation={onViewLocation}
              columns={columns}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
