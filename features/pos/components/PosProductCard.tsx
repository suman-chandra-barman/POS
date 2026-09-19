"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { PosProduct } from "../types/pos.types";

interface PosProductCardProps {
  product: PosProduct;
  onAddToCart: (product: PosProduct) => void;
}

export const PosProductCard: React.FC<PosProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div
      onClick={() => onAddToCart(product)}
      className="group bg-white rounded-xl border border-neutral-200/80 p-2 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between select-none"
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

        {/* Price & Cart Icon Button */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
          <span className="text-xs font-bold text-neutral-900">
            {product.price.toLocaleString("en-US")} ৳
          </span>

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
        </div>
      </div>
    </div>
  );
};
