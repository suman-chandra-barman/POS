"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type AddProductFormData } from "../../types/addProduct.types";

interface PriceTaxTabProps {
  form: UseFormReturn<AddProductFormData>;
}

export const PriceTaxTab: React.FC<PriceTaxTabProps> = ({ form }) => {
  const { register, watch } = form;
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(true);

  const sellingPrice = watch("sellingPrice") || 0;
  const cost = watch("cost") || 0;
  const taxPercent = watch("taxPercent") || 0;

  // Auto-calculated profit and margin
  const taxAmount = (sellingPrice * taxPercent) / 100;
  const netSellingPrice = sellingPrice - taxAmount;
  const profit = netSellingPrice - cost;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Gray Heading Banner */}
        <div className="bg-[#F7F7F7] px-5 py-3.5 border-b border-neutral-200/90">
          <h3 className="text-xs font-bold text-neutral-800 tracking-tight">
            Price & Tax
          </h3>
        </div>

        {/* White Body */}
        <div className="p-5 space-y-5">
          {/* Selling Price */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Selling Price
            </label>
            <div className="relative max-w-sm">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-medium">
                $
              </span>
              <input
                type="number"
                step="any"
                {...register("sellingPrice", { valueAsNumber: true })}
                placeholder="0.00"
                className="w-full h-10 rounded-xl border border-neutral-200/90 bg-white pl-8 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Additional display prices */}
          <div className="pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setIsAdditionalOpen((v) => !v)}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-neutral-800 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              <span>Additional display prices</span>
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-400 transition-transform duration-200",
                  !isAdditionalOpen && "-rotate-90"
                )}
              />
            </button>

            {isAdditionalOpen && (
              <div className="space-y-3.5 mt-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                {/* Row 1: Tax */}
                <div>
                  <div className="inline-flex items-center rounded-xl border border-neutral-200/90 bg-white px-3 py-1.5 text-xs text-neutral-800 shadow-2xs">
                    <span className="font-semibold text-neutral-700 mr-2">Tax</span>
                    <input
                      type="number"
                      step="any"
                      {...register("taxPercent", { valueAsNumber: true })}
                      placeholder="--"
                      className="w-14 text-center bg-transparent focus:outline-none text-xs text-neutral-900 font-medium placeholder:text-neutral-400"
                    />
                    <span className="text-neutral-500 ml-1">%</span>
                  </div>
                </div>

                {/* Row 2: Cost, Profit, Margin */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Cost Pill */}
                  <div className="inline-flex items-center rounded-xl border border-neutral-200/90 bg-white px-3 py-1.5 text-xs text-neutral-800 shadow-2xs">
                    <span className="font-semibold text-neutral-700 mr-2">Cost</span>
                    <input
                      type="number"
                      step="any"
                      {...register("cost", { valueAsNumber: true })}
                      placeholder="--"
                      className="w-20 text-center bg-transparent focus:outline-none text-xs text-neutral-900 font-medium placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Profit Pill */}
                  <div className="inline-flex items-center rounded-xl border border-neutral-200/60 bg-neutral-50/70 px-3 py-1.5 text-xs text-neutral-600">
                    <span className="font-medium text-neutral-500 mr-2">Profit</span>
                    <span className="font-semibold text-neutral-800 min-w-12 text-center">
                      {profit !== 0 ? profit.toFixed(2) : "--"}
                    </span>
                  </div>

                  {/* Margin Pill */}
                  <div className="inline-flex items-center rounded-xl border border-neutral-200/60 bg-neutral-50/70 px-3 py-1.5 text-xs text-neutral-600">
                    <span className="font-medium text-neutral-500 mr-2">Margin</span>
                    <span className="font-semibold text-neutral-800 min-w-12 text-center">
                      {margin !== 0 ? `${margin.toFixed(1)}%` : "--"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
