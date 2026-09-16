"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Eye, EyeOff, ArrowLeft, AlignJustify } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type ProductLocationItem,
  type LocationColumnVisibility,
} from "../types/product.types";
import { DEFAULT_LOCATION_COLUMNS } from "../data/productMockData";
import { ProductLocationTableRow } from "./ProductLocationTableRow";

interface ProductLocationViewProps {
  locationItems: ProductLocationItem[];
  onBack: () => void;
}

const LOCATION_COLUMN_CONFIG: { key: keyof LocationColumnVisibility; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "subcategory", label: "Subcategory" },
  { key: "value", label: "Value" },
  { key: "history", label: "History" },
  { key: "inventory", label: "Inventory" },
];

export const ProductLocationView: React.FC<ProductLocationViewProps> = ({
  locationItems,
  onBack,
}) => {
  const [columns, setColumns] = useState<LocationColumnVisibility>(DEFAULT_LOCATION_COLUMNS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === locationItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(locationItems.map((l) => l.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleColumn = (key: keyof LocationColumnVisibility) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllSelected =
    locationItems.length > 0 && selectedIds.length === locationItems.length;

  const totalValue = 1203350; // Total specified in design mockup
  const totalInventory = 967; // Total specified in design mockup

  return (
    <div className="w-full space-y-4">
      {/* Top Controls: Back button & Column filter */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Products</span>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((v) => !v)}
            title="Toggle column visibility"
            className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="size-3.5" />
          </button>

          {/* Location Column Visibility Dropdown */}
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-40 w-40 rounded-xl border border-neutral-100 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="space-y-0.5">
                  {LOCATION_COLUMN_CONFIG.map((col) => {
                    const isVisible = columns[col.key];
                    return (
                      <button
                        key={col.key}
                        type="button"
                        onClick={() => toggleColumn(col.key)}
                        className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        <span className="font-medium">{col.label}</span>
                        {isVisible ? (
                          <Eye className="size-3.5 text-neutral-500" />
                        ) : (
                          <EyeOff className="size-3.5 text-neutral-300" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Location Table */}
      <div className="w-full rounded-2xl bg-white border border-neutral-100/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/40 hover:bg-neutral-50/40">
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold text-neutral-800">Location</TableHead>
              <TableHead className="font-semibold text-neutral-800">Product</TableHead>
              {columns.category && (
                <TableHead className="font-semibold text-neutral-800">Category</TableHead>
              )}
              {columns.value && (
                <TableHead className="font-semibold text-neutral-800">Value</TableHead>
              )}
              {columns.inventory && (
                <TableHead className="text-right font-semibold text-neutral-800">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Inventory</span>
                    <AlignJustify className="size-3.5 text-neutral-400" />
                  </div>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {locationItems.map((item) => (
              <ProductLocationTableRow
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={toggleSelectOne}
                columns={columns}
              />
            ))}
          </TableBody>

          {/* Totals Summary Footer */}
          <TableFooter>
            <TableRow className="font-bold text-neutral-900 bg-neutral-50/60">
              <TableCell className="w-10" />
              <TableCell colSpan={columns.category ? 3 : 2} className="font-bold">
                Total
              </TableCell>
              {columns.value && (
                <TableCell className="font-bold">
                  {totalValue.toLocaleString("en-IN")}
                </TableCell>
              )}
              {columns.inventory && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 font-bold">
                    <span>{totalInventory}</span>
                    <AlignJustify className="size-3.5 text-neutral-700" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
