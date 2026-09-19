"use client";

import React, { useState, useMemo } from "react";
import { PosProduct } from "../types/pos.types";
import { PosProductCard } from "./PosProductCard";
import { cn } from "@/lib/utils";

interface PosProductCatalogProps {
  products: PosProduct[];
  searchQuery: string;
  onAddToCart: (product: PosProduct) => void;
}

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Footwear"] as const;

export const PosProductCatalog: React.FC<PosProductCatalogProps> = ({
  products,
  searchQuery,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fb] overflow-hidden">
      {/* Category Filter Pills */}
      <div className="px-4 py-2.5 bg-white border-b border-neutral-200/80 flex items-center gap-2 overflow-x-auto select-none shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              selectedCategory === cat
                ? "bg-neutral-900 text-white shadow-2xs"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {filteredProducts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-neutral-400">
            <p className="text-sm font-medium">No products found</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
            {filteredProducts.map((product) => (
              <PosProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
