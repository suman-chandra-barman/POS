"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Eye, EyeOff, ArrowLeft } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type ProductHistoryItem,
  type HistoryColumnVisibility,
} from "../types/product.types";
import { DEFAULT_HISTORY_COLUMNS } from "../data/productMockData";
import { ProductHistoryTableRow } from "./ProductHistoryTableRow";

interface ProductHistoryViewProps {
  historyItems: ProductHistoryItem[];
  onBack: () => void;
}

const HISTORY_COLUMN_CONFIG: { key: keyof HistoryColumnVisibility; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "doneBy", label: "Done by" },
  { key: "reference", label: "Reference" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "quantity", label: "Quantity" },
];

export const ProductHistoryView: React.FC<ProductHistoryViewProps> = ({
  historyItems,
  onBack,
}) => {
  const [columns, setColumns] = useState<HistoryColumnVisibility>(DEFAULT_HISTORY_COLUMNS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === historyItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(historyItems.map((h) => h.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleColumn = (key: keyof HistoryColumnVisibility) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllSelected =
    historyItems.length > 0 && selectedIds.length === historyItems.length;

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

          {/* History Column Visibility Dropdown */}
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-40 w-40 rounded-xl border border-neutral-100 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="space-y-0.5">
                  {HISTORY_COLUMN_CONFIG.map((col) => {
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

      {/* History Table */}
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
              <TableHead className="font-semibold text-neutral-800">Date</TableHead>
              <TableHead className="font-semibold text-neutral-800">Product</TableHead>
              {columns.reference && (
                <TableHead className="font-semibold text-neutral-800">Reference</TableHead>
              )}
              {columns.from && (
                <TableHead className="font-semibold text-neutral-800">From</TableHead>
              )}
              {columns.to && (
                <TableHead className="font-semibold text-neutral-800">To</TableHead>
              )}
              {columns.doneBy && (
                <TableHead className="font-semibold text-neutral-800">Done by</TableHead>
              )}
              {columns.quantity && (
                <TableHead className="font-semibold text-neutral-800">Quantity</TableHead>
              )}
              {columns.status && (
                <TableHead className="font-semibold text-neutral-800">Status</TableHead>
              )}
              <TableHead className="text-right font-semibold text-neutral-800 w-10">
                <SlidersHorizontal className="size-3.5 text-neutral-400 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {historyItems.map((item) => (
              <ProductHistoryTableRow
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={toggleSelectOne}
                columns={columns}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
