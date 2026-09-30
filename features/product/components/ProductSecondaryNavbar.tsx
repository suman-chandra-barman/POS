"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  SecondaryNavbar,
  SecondaryNavbarSearch,
  SecondaryNavbarPagination,
  SecondaryNavbarViewSwitcher,
  type ViewSwitcherMode,
} from "@/components/common";
import {
  PRODUCT_VIEW_MODES,
  type ProductViewMode,
} from "../types/product.types";

export interface ProductSecondaryNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProducts?: number;
  activeView: ProductViewMode;
  onViewChange: (view: ProductViewMode) => void;
  className?: string;
}

export const ProductSecondaryNavbar: React.FC<ProductSecondaryNavbarProps> = ({
  searchQuery,
  onSearchChange,
  totalProducts = 100,
  activeView,
  onViewChange,
  className,
}) => {
  const locale = useLocale();

  const handleViewModeChange = (mode: ViewSwitcherMode) => {
    onViewChange(
      mode === "table" || mode === "list"
        ? PRODUCT_VIEW_MODES.LIST
        : PRODUCT_VIEW_MODES.LIST
    );
  };

  return (
    <SecondaryNavbar
      className={className}
      leftSlot={
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/product/add`}
            id="btn-new-product"
            className="px-4 py-2 bg-brand hover:bg-brand/80 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer select-none active:scale-98"
          >
            New Product
          </Link>
          <Link href={`/${locale}/product`} className="text-brand hover:text-brand/80 text-xs font-medium select-none">
            Product
          </Link>
        </div>
      }
      centerSlot={
        <SecondaryNavbarSearch
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search..."
        />
      }
      rightSlot={
        <>
          <SecondaryNavbarPagination
            currentRangeText="1-100"
            total={totalProducts}
          />
          <SecondaryNavbarViewSwitcher
            activeView={activeView === PRODUCT_VIEW_MODES.LIST ? "table" : "card"}
            onViewChange={handleViewModeChange}
          />
        </>
      }
    />
  );
};

export default ProductSecondaryNavbar;
