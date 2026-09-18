"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Rows3,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PURCHASE_VIEWS,
  type PurchaseView,
  type CatalogProduct,
} from "../types/purchase.types";
import { CATALOG_PRODUCTS } from "../data/purchaseMockData";
import { PurchaseProductCard } from "./PurchaseProductCard";

interface PurchaseCardGridViewProps {
  onNewPurchase: () => void;
  onViewChange: (view: PurchaseView) => void;
  onSelectProduct?: (product: CatalogProduct) => void;
}

export const PurchaseCardGridView: React.FC<PurchaseCardGridViewProps> = ({
  onNewPurchase,
  onViewChange,
  onSelectProduct,
}) => {
  const [filterTag, setFilterTag] = useState<string | null>("Goods");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !prod.name.toLowerCase().includes(q) &&
        !prod.sku.toLowerCase().includes(q) &&
        !prod.code.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Sub-navbar matching Image 3 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 border-b border-neutral-200/80 select-none">
        {/* Left: New Button + Products Settings Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onNewPurchase}
            className="h-8 px-4 rounded-md bg-[#6b2c58] hover:bg-[#582449] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            New
          </button>

          <button
            type="button"
            className="h-8 px-2.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Products</span>
            <Settings className="size-3.5 text-neutral-500" />
          </button>
        </div>

        {/* Center: Search with Filter Tag */}
        <div className="w-full sm:max-w-md flex-1 px-2">
          <div className="relative flex items-center w-full h-8 px-2 rounded-lg border border-neutral-200 bg-white shadow-2xs">
            <Search className="size-3.5 text-neutral-400 mr-2 shrink-0" />
            {filterTag && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#6b2c58] text-white text-[11px] font-medium mr-2 shrink-0">
                <span>{filterTag}</span>
                <button
                  type="button"
                  onClick={() => setFilterTag(null)}
                  className="hover:text-neutral-200 cursor-pointer"
                  aria-label="Remove filter"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-full text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Right: Pagination + View Switchers */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <span className="font-semibold text-neutral-800">1-80</span>
            <span>/ 2415</span>
            <div className="flex items-center ml-1 text-neutral-400">
              <button
                type="button"
                disabled
                aria-label="Previous page"
                className="p-1 hover:text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                disabled
                aria-label="Next page"
                className="p-1 hover:text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <button
              type="button"
              aria-label="Card Grid View"
              onClick={() => onViewChange(PURCHASE_VIEWS.GRID)}
              className="p-1.5 rounded-md bg-neutral-800 text-white shadow-2xs transition-colors cursor-pointer"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Table List View"
              onClick={() => onViewChange(PURCHASE_VIEWS.LIST)}
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Rows3 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredProducts.map((product) => (
          <PurchaseProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchaseCardGridView;
