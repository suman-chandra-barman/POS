"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type PurchaseOrderItem } from "../types/purchase.types";

interface PurchaseDetailsProductsTableProps {
  items: PurchaseOrderItem[];
}

export const PurchaseDetailsProductsTable: React.FC<
  PurchaseDetailsProductsTableProps
> = ({ items }) => {
  const totalDemand = items.reduce((acc, item) => acc + (item.demand ?? 0), 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalDifference = items.reduce(
    (acc, item) => acc + (item.difference ?? 0),
    0
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none">
      <h3 className="text-sm font-bold text-neutral-900 mb-4">Add product</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-neutral-100 text-neutral-500 text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-3">Product</th>
              <th className="py-3 px-3 text-right sm:text-center">Demand</th>
              <th className="py-3 px-3 text-right sm:text-center">Quantity</th>
              <th className="py-3 px-3 text-right">Difference</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const diff = item.difference ?? 0;
              return (
                <tr
                  key={item.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50/60 transition-colors"
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-lg overflow-hidden relative border border-neutral-100 shrink-0 bg-neutral-50">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-800 leading-tight">
                          {item.productName}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          {item.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right sm:text-center font-medium text-neutral-600">
                    {item.demand}
                  </td>

                  <td className="py-3.5 px-3 text-right sm:text-center font-bold text-neutral-800">
                    {item.quantity.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-3 text-right font-bold">
                    <span
                      className={cn(
                        diff < 0
                          ? "text-rose-600"
                          : diff > 0
                          ? "text-emerald-600"
                          : "text-neutral-700"
                      )}
                    >
                      {diff}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-neutral-200/80 font-bold text-neutral-900 bg-neutral-50/40">
              <td className="py-3.5 px-3">Total:</td>
              <td className="py-3.5 px-3 text-right sm:text-center font-bold text-neutral-800">
                {totalDemand}
              </td>
              <td className="py-3.5 px-3 text-right sm:text-center font-black text-neutral-900">
                {totalQuantity}
              </td>
              <td className="py-3.5 px-3 text-right font-black">
                <span
                  className={cn(
                    totalDifference < 0 ? "text-rose-600" : "text-neutral-900"
                  )}
                >
                  {totalDifference}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PurchaseDetailsProductsTable;
