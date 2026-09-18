"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { type CatalogProduct } from "../types/purchase.types";
import { CATALOG_PRODUCTS } from "../data/purchaseMockData";

interface NewPurchaseProductSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (selectedProducts: CatalogProduct[]) => void;
  initialQuery?: string;
}

export const NewPurchaseProductSelectorModal: React.FC<
  NewPurchaseProductSelectorModalProps
> = ({ isOpen, onClose, onAddProducts, initialQuery = "Zara" }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "cat-16",
    "cat-17",
  ]);

  if (!isOpen) return null;

  // Filter products by query
  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchSku = prod.sku.toLowerCase().includes(q);
      const matchCat = prod.category.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCat) return false;
    }
    return true;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmAdd = () => {
    const productsToAdd = CATALOG_PRODUCTS.filter((p) =>
      selectedIds.includes(p.id)
    );
    onAddProducts(productsToAdd);
    onClose();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/90 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 select-none">
      {/* Search Input Row */}
      <div className="p-3 border-b border-neutral-100">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="w-full h-9.5 pl-10 pr-4 rounded-xl bg-neutral-50/70 border border-neutral-200/60 text-xs text-neutral-800 focus:bg-white focus:outline-none focus:ring-1.5 focus:ring-neutral-300 transition-all font-medium"
          />
        </div>
      </div>

      {/* Matching Products Table */}
      <div className="overflow-x-auto max-h-80">
        <table className="w-full text-left border-collapse text-xs">
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-xs text-neutral-400 font-medium"
                >
                  No matching products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => {
                const isChecked = selectedIds.includes(prod.id);
                return (
                  <tr
                    key={prod.id}
                    onClick={() => handleToggleSelect(prod.id)}
                    className="border-b border-neutral-100 hover:bg-neutral-50/80 transition-colors cursor-pointer"
                  >
                    {/* Checkbox */}
                    <td className="w-10 py-3.5 pl-4 pr-2">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggleSelect(prod.id)}
                        aria-label={`Select ${prod.name}`}
                        className="cursor-pointer"
                      />
                    </td>

                    {/* Product thumbnail + Name + SKU */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg overflow-hidden relative border border-neutral-100 shrink-0 bg-neutral-50">
                          <Image
                            src={prod.imageUrl}
                            alt={prod.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-800 leading-tight">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                            {prod.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-neutral-400">
                        Price{" "}
                      </span>
                      <span className="font-bold text-neutral-800">
                        {prod.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Category & Subcategory */}
                    <td className="py-3.5 pr-6 pl-2 text-right">
                      <div className="inline-flex flex-col items-end">
                        <span className="font-semibold text-neutral-700">
                          {prod.category}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          /{prod.subcategory}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Selection Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/60 border-t border-neutral-100">
        <span className="text-xs font-semibold text-neutral-700">
          {selectedIds.length} Products selected
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmAdd}
            disabled={selectedIds.length === 0}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseProductSelectorModal;
