"use client";

import React from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { type CatalogProduct } from "../types/purchase.types";

interface CategoryDrawerProductRowProps {
  product: CatalogProduct;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const CategoryDrawerProductRow: React.FC<
  CategoryDrawerProductRowProps
> = ({ product, isSelected, onToggle }) => {
  return (
    <tr
      onClick={() => onToggle(product.id)}
      className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors cursor-pointer text-xs select-none"
    >
      <td className="w-10 py-3.5 pl-4 pr-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(product.id)}
          aria-label={`Select ${product.name}`}
          className="cursor-pointer"
        />
      </td>

      <td className="py-3.5 px-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg overflow-hidden relative border border-neutral-100 shrink-0 bg-neutral-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-neutral-800 leading-tight">
              {product.name}
            </p>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
              {product.code || product.sku}
            </p>
          </div>
        </div>
      </td>

      <td className="py-3.5 px-3 font-semibold text-neutral-800 text-right sm:text-left">
        {product.price.toFixed(2)}
      </td>

      <td className="py-3.5 pr-4 pl-2 text-right font-medium text-neutral-500">
        {product.stockUnit || `${product.onHand}/pcs`}
      </td>
    </tr>
  );
};

export default CategoryDrawerProductRow;
