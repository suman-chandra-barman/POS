"use client";

import React from "react";
import { PosCartItem } from "../types/pos.types";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface PosCartTableProps {
  items: PosCartItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  taxPercent?: number;
  discountAmount?: number;
}

export const PosCartTable: React.FC<PosCartTableProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  taxPercent = 0.0,
  discountAmount = 0.0,
}) => {
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const calculatedDiscount =
    discountAmount > 0
      ? discountAmount
      : items.reduce(
          (acc, i) => acc + (i.price * i.quantity * i.discountPercent) / 100,
          0
        );
  const taxAmount = (subtotal * taxPercent) / 100;
  const payableAmount = Math.max(0, subtotal - calculatedDiscount + taxAmount);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white">
      {/* Table Header (Image 1 & 2) */}
      <div className="grid grid-cols-12 px-3 py-2 border-b border-neutral-200/80 bg-neutral-50/50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider sticky top-0 z-10 select-none">
        <div className="col-span-2 text-left">Qnt</div>
        <div className="col-span-5 text-left">Name</div>
        <div className="col-span-2 text-right">Per pcs</div>
        <div className="col-span-3 text-right">Total</div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 divide-y divide-neutral-100">
        {items.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-neutral-400 p-4 select-none">
            <ShoppingBag className="size-8 stroke-[1.5] mb-2 text-neutral-300" />
            <p className="text-xs font-medium">Cart is empty</p>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Click products to add to this order
            </p>
          </div>
        ) : (
          items.map((item) => {
            const isSelected = item.id === selectedItemId;
            const originalLineTotal = item.price * item.quantity;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={cn(
                  "grid grid-cols-12 px-3 py-2 text-xs items-center cursor-pointer transition-colors select-none",
                  isSelected
                    ? "bg-[#e0f2fe] text-neutral-900 font-medium"
                    : "hover:bg-neutral-50/80 text-neutral-700"
                )}
              >
                <div className="col-span-2 text-left font-bold text-neutral-900">
                  {item.quantity}
                </div>
                <div className="col-span-5 text-left truncate pr-2">
                  <span className="truncate block font-medium" title={item.name}>
                    {item.name}
                  </span>
                  {item.discountPercent > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
                      <span className="text-rose-500 font-bold">🏷️</span>
                      <span>
                        <strong className="text-neutral-700 font-semibold">
                          {item.discountPercent}%
                        </strong>{" "}
                        discount off on {originalLineTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-span-2 text-right text-neutral-500 text-[11px]">
                  {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="col-span-3 text-right font-bold text-neutral-900">
                  {item.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Rows (Matching Images 1, 2, 3, 4) */}
      {items.length > 0 && (
        <div className="p-3 border-t border-neutral-200/90 bg-white space-y-1.5 text-xs select-none">
          {/* Subtotal line with Total Count */}
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100 font-bold">
            <span className="text-neutral-700">Total: {totalQuantity}</span>
            <span className="text-[#0284c7]">
              {subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600 text-[11px]">
            <span>Tax %</span>
            <span>{taxPercent.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-600">Discount</span>
            <span className="text-rose-600 font-semibold">
              {calculatedDiscount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs font-bold text-neutral-900">
            <span>Payable Amount</span>
            <span>
              {payableAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
