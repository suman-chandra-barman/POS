"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CatalogProduct } from "../types/purchase.types";

interface PurchaseProductCardProps {
  product: CatalogProduct;
  onSelect?: (product: CatalogProduct) => void;
}

export const PurchaseProductCard: React.FC<PurchaseProductCardProps> = ({
  product,
  onSelect,
}) => {
  const [isStarred, setIsStarred] = useState(product.isStarred ?? false);

  return (
    <div
      onClick={() => onSelect?.(product)}
      className="bg-white border border-neutral-200/90 rounded-xl p-3.5 hover:shadow-sm hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between select-none min-h-24"
    >
      {/* Top: Star and Code / Title */}
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsStarred((v) => !v);
          }}
          className="text-neutral-400 hover:text-amber-500 transition-colors p-0.5 -mt-0.5 cursor-pointer"
          aria-label="Star product"
        >
          <Star
            className={cn(
              "size-4",
              isStarred
                ? "fill-amber-400 text-amber-400"
                : "text-neutral-400 stroke-[1.75]"
            )}
          />
        </button>
        <h4 className="text-xs font-bold text-neutral-800 leading-snug line-clamp-2">
          {product.name}
        </h4>
      </div>

      {/* Bottom: Price and On Hand */}
      <div className="mt-3 space-y-0.5 text-[11px] text-neutral-500">
        <div>
          <span>Price: </span>
          <span className="font-semibold text-neutral-800">
            {product.price.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ৳
          </span>
        </div>
        <div>
          <span>On hand: </span>
          <span className="text-neutral-700">
            {product.onHand.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseProductCard;
