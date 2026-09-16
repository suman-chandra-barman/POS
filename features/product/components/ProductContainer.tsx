"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  type ProductTab,
  type ProductViewMode,
  type ProductColumnVisibility,
} from "../types/product.types";
import {
  INITIAL_PRODUCTS,
  INITIAL_HISTORY_ITEMS,
  INITIAL_LOCATION_ITEMS,
  DEFAULT_PRODUCT_COLUMNS,
} from "../data/productMockData";
import { ProductHeaderTabs } from "./ProductHeaderTabs";
import { ProductTable } from "./ProductTable";
import { ProductHistoryView } from "./ProductHistoryView";
import { ProductLocationView } from "./ProductLocationView";

export const ProductContainer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query params
  const tabParam = (searchParams.get("tab") as ProductTab) || "all";
  const viewParam = (searchParams.get("view") as ProductViewMode) || "list";
  const selectedProductId = searchParams.get("productId") || undefined;

  const [activeTab, setActiveTab] = useState<ProductTab>(tabParam);
  const [activeView, setActiveView] = useState<ProductViewMode>(viewParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [columns, setColumns] = useState<ProductColumnVisibility>(DEFAULT_PRODUCT_COLUMNS);

  const updateUrl = (tab: ProductTab, view: ProductViewMode, prodId?: string) => {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("tab", tab);
    if (view !== "list") params.set("view", view);
    if (prodId) params.set("productId", prodId);
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const handleTabChange = (newTab: ProductTab) => {
    setActiveTab(newTab);
    updateUrl(newTab, activeView, selectedProductId);
  };

  const handleViewHistory = (productId: string) => {
    setActiveView("history");
    updateUrl(activeTab, "history", productId);
  };

  const handleViewLocation = (productId: string) => {
    setActiveView("location");
    updateUrl(activeTab, "location", productId);
  };

  const handleBackToList = () => {
    setActiveView("list");
    updateUrl(activeTab, "list");
  };

  const handleToggleColumn = (key: keyof ProductColumnVisibility) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filtered products based on active tab & search query
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      if (activeTab === "draft" && product.status !== "draft") return false;
      if (activeTab === "archived" && product.status !== "archived") return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesCategory) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  const handleToggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelectOne = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] px-4 sm:px-6 py-6 pb-36">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main List View */}
        {activeView === "list" && (
          <div className="relative">
            {/* Header Tabs, Search, & Column Visibility Toggle */}
            <ProductHeaderTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onToggleColumnDropdown={() => setIsColumnDropdownOpen((v) => !v)}
              isColumnDropdownOpen={isColumnDropdownOpen}
              onCloseColumnDropdown={() => setIsColumnDropdownOpen(false)}
              columns={columns}
              onToggleColumn={handleToggleColumn}
            />

            {/* Main Product Table */}
            <ProductTable
              products={filteredProducts}
              selectedIds={selectedProductIds}
              onToggleSelectAll={handleToggleSelectAll}
              onToggleSelectOne={handleToggleSelectOne}
              onViewHistory={handleViewHistory}
              onViewLocation={handleViewLocation}
              columns={columns}
            />
          </div>
        )}

        {/* Product History View */}
        {activeView === "history" && (
          <ProductHistoryView
            historyItems={INITIAL_HISTORY_ITEMS}
            onBack={handleBackToList}
          />
        )}

        {/* Product Location View */}
        {activeView === "location" && (
          <ProductLocationView
            locationItems={INITIAL_LOCATION_ITEMS}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
};

export default ProductContainer;
