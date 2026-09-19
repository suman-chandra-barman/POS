"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { PosProduct } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosProductCardProps {
  product: PosProduct;
  isInCart?: boolean;
  onAddToCart: (product: PosProduct) => void;
  onRemoveFromCart?: (product: PosProduct) => void;
}

export const PosProductCard: React.FC<PosProductCardProps> = ({
  product,
  isInCart = false,
  onAddToCart,
  onRemoveFromCart,
}) => {
  return (
    <div
      onClick={() => onAddToCart(product)}
      className={cn(
        "group bg-white rounded-xl p-2 transition-all cursor-pointer flex flex-col justify-between select-none",
        isInCart
          ? "border-2 border-[#0088cc] shadow-2xs"
          : "border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md"
      )}
    >
      {/* Product Image */}
      <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-neutral-100 mb-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <h4
          className="text-xs font-medium text-neutral-800 line-clamp-2 leading-tight mb-2 group-hover:text-neutral-950 transition-colors"
          title={product.name}
        >
          {product.name}
        </h4>

        {/* Price & Cart Action Buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
          <span className="text-xs font-bold text-neutral-900">
            {product.price.toLocaleString("en-US")} ৳
          </span>

          {isInCart ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${product.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart?.(product);
                }}
                className="size-6 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                <Minus className="size-3 stroke-[2.5]" />
              </button>
              <button
                type="button"
                aria-label={`Increase ${product.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="size-6 rounded-md bg-[#0088cc] text-white flex items-center justify-center hover:bg-[#0077b5] active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="size-3 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
            >
              <ShoppingCart className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
