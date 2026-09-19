"use client";

import React from "react";
import { PosCartItem } from "../types/pos.types";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface PosCartTableProps {
  items: PosCartItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
}

export const PosCartTable: React.FC<PosCartTableProps> = ({
  items,
  selectedItemId,
  onSelectItem,
}) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white">
      {/* Table Header (Image 5) */}
      <div className="grid grid-cols-12 px-3 py-2 border-b border-neutral-200/80 bg-neutral-50/50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider sticky top-0 z-10 select-none">
        <div className="col-span-2 text-left">Qnt</div>
        <div className="col-span-5 text-left">Name</div>
        <div className="col-span-2 text-right">Per pcs</div>
        <div className="col-span-3 text-right">Total</div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 divide-y divide-neutral-100">
        {items.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-neutral-400 p-4 select-none">
            <ShoppingBag className="size-8 stroke-[1.5] mb-2 text-neutral-300" />
            <p className="text-xs font-medium">Cart is empty</p>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Click products to add to this order
            </p>
          </div>
        ) : (
          items.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={cn(
                  "grid grid-cols-12 px-3 py-2.5 text-xs items-center cursor-pointer transition-colors select-none",
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
                    <span className="text-[10px] text-emerald-600 font-normal">
                      Disc: {item.discountPercent}%
                    </span>
                  )}
                </div>
                <div className="col-span-2 text-right text-neutral-500 text-[11px]">
                  {item.price.toLocaleString("en-US")}
                </div>
                <div className="col-span-3 text-right font-bold text-neutral-900">
                  {item.total.toLocaleString("en-US")} ৳
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
