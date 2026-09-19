"use client";

import React, { useMemo } from "react";
import { PosProduct } from "../types/pos.types";
import { PosProductCard } from "./PosProductCard";

interface PosProductCatalogProps {
  products: PosProduct[];
  cartProductIds?: string[];
  searchQuery: string;
  onAddToCart: (product: PosProduct) => void;
  onRemoveFromCart?: (product: PosProduct) => void;
}

export const PosProductCatalog: React.FC<PosProductCatalogProps> = ({
  products,
  cartProductIds = [],
  searchQuery,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [products, searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fb] overflow-hidden">
      {/* Products Grid without category filter bar */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {filteredProducts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-neutral-400">
            <p className="text-sm font-medium">No products found</p>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
            {filteredProducts.map((product) => (
              <PosProductCard
                key={product.id}
                product={product}
                isInCart={cartProductIds.includes(product.id)}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
