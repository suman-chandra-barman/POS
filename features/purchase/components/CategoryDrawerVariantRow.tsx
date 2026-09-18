"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProductVariant } from "../types/purchase.types";

interface CategoryDrawerVariantRowProps {
  variant: ProductVariant;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const CategoryDrawerVariantRow: React.FC<
  CategoryDrawerVariantRowProps
> = ({ variant, isSelected, onToggle }) => {
  return (
    <tr
      onClick={() => onToggle(variant.id)}
      className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors cursor-pointer text-xs select-none bg-neutral-50/40"
    >
      <td className="w-10 py-3 pl-8 pr-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(variant.id)}
          aria-label={`Select variant ${variant.name}`}
          className="cursor-pointer"
        />
      </td>

      <td className="py-3 px-3">
        <span className="font-medium text-neutral-700">{variant.name}</span>
      </td>

      <td className="py-3 px-3 font-semibold text-neutral-800 text-right sm:text-left">
        {variant.price.toFixed(2)}
      </td>

      <td className="py-3 pr-4 pl-2 text-right font-medium text-neutral-500">
        {variant.stock}/pcs
      </td>
    </tr>
  );
};

export default CategoryDrawerVariantRow;
