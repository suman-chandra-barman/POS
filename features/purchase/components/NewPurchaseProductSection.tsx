"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Trash2, Layers } from "lucide-react";
import {
  type PurchaseOrderItem,
  type CatalogProduct,
} from "../types/purchase.types";
import { NewPurchaseProductSelectorModal } from "./NewPurchaseProductSelectorModal";

interface NewPurchaseProductSectionProps {
  items: PurchaseOrderItem[];
  onAddProducts: (products: CatalogProduct[]) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const NewPurchaseProductSection: React.FC<
  NewPurchaseProductSectionProps
> = ({ items, onAddProducts, onUpdateQuantity, onRemoveItem }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleOpenSelector = () => {
    setIsSelectorOpen(true);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none space-y-4">
      <h3 className="text-sm font-bold text-neutral-900">Add product</h3>

      {/* Search Input Bar or Category Button */}
      {!isSelectorOpen ? (
        <div className="flex items-center gap-2">
          <div
            onClick={handleOpenSelector}
            className="relative flex-1 flex items-center h-10 px-3.5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors cursor-pointer shadow-2xs"
          >
            <Search className="size-4 text-neutral-400 mr-2.5 shrink-0" />
            <span className="text-xs text-neutral-400">
              {searchInputValue || "Search or scan product"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenSelector}
            className="h-10 px-4 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors shrink-0"
          >
            <Layers className="size-3.5 text-neutral-500" />
            <span>Category</span>
          </button>
        </div>
      ) : (
        /* Image 5 Step 2 Overlay */
        <NewPurchaseProductSelectorModal
          isOpen={isSelectorOpen}
          onClose={() => setIsSelectorOpen(false)}
          onAddProducts={(prods) => {
            onAddProducts(prods);
            setIsSelectorOpen(false);
          }}
          initialQuery="Zara"
        />
      )}

      {/* Added Products Table (Empty dashes state in Image 4, filled in Step 2) */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-neutral-100 text-neutral-500 text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-3 px-3">Product</th>
              <th className="py-3 px-3 text-center sm:text-left">Quantity</th>
              <th className="py-3 px-3 text-right sm:text-left">Unit Price</th>
              <th className="py-3 px-3 text-right">Total Amount</th>
              {items.length > 0 && <th className="w-10 py-3 pr-3 text-center" />}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <>
                {/* Visual placeholder empty dashes matching Image 4 */}
                <tr className="border-b border-neutral-100/60 text-neutral-300">
                  <td className="py-4 px-3 font-mono font-bold text-sm">—</td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-center sm:text-left">
                    —
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-right sm:text-left">
                    —
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-right">
                    —
                  </td>
                </tr>
                <tr className="border-b border-neutral-100/60 text-neutral-300">
                  <td className="py-4 px-3 font-mono font-bold text-sm">—</td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-center sm:text-left">
                    —
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-right sm:text-left">
                    —
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-sm text-right">
                    —
                  </td>
                </tr>
              </>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors"
                >
                  <td className="py-3 px-3">
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

                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                      className="w-20 h-8 px-2.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>

                  <td className="py-3 px-3 text-right sm:text-left font-medium text-neutral-700">
                    {item.unitPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-neutral-900">
                    {(item.quantity * item.unitPrice).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="py-3 pr-3 text-center">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="p-1 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewPurchaseProductSection;
