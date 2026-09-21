"use client";

import React, { useState } from "react";
import { X, ArrowLeft, ChevronDown } from "lucide-react";
import {
  type CatalogProduct,
} from "../types/purchase.types";
import {
  CATEGORY_DRAWER_PRODUCTS,
  CATEGORIES,
  SUBCATEGORIES,
} from "../data/purchaseMockData";
import { CategoryDrawerProductRow } from "./CategoryDrawerProductRow";
import { CategoryDrawerVariantRow } from "./CategoryDrawerVariantRow";

interface CategoryFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (selectedProducts: CatalogProduct[]) => void;
}

export const CategoryFilterDrawer: React.FC<CategoryFilterDrawerProps> = ({
  isOpen,
  onClose,
  onAddProducts,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    "cdp-4",
  ]);
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>([
    "v-1",
    "v-2",
    "v-3",
  ]);

  if (!isOpen) return null;

  // Filter products by search and category
  const filteredProducts = CATEGORY_DRAWER_PRODUCTS.filter((prod) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchSku = prod.sku.toLowerCase().includes(q);
      if (!matchName && !matchSku) return false;
    }
    if (selectedCategory && prod.category !== selectedCategory) {
      return false;
    }
    if (selectedSubcategory && prod.subcategory !== selectedSubcategory) {
      return false;
    }
    return true;
  });

  const handleToggleProduct = (id: string) => {
    setSelectedProductIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      // If user selected multiple items, allow auto-switch or manual toggle to step 2
      if (!exists && next.length >= 2 && step === 1) {
        setStep(2);
      }
      return next;
    });
  };

  const handleToggleVariant = (id: string) => {
    setSelectedVariantIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalSelectedCount =
    selectedProductIds.length +
    (step === 2 && selectedVariantIds.length > 0 ? 1 : 0);

  const handleAddNow = () => {
    const selected = CATEGORY_DRAWER_PRODUCTS.filter((p) =>
      selectedProductIds.includes(p.id)
    );
    onAddProducts(selected);
    onClose();
  };

  return (
    <aside
      aria-label="Category Filters"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-115 md:w-120 bg-white border-l border-neutral-200 shadow-2xl flex flex-col select-none animate-in slide-in-from-right duration-250"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              aria-label="Back to filters"
              className="p-1 -ml-1 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
          <h3 className="text-sm font-bold text-neutral-900">
            {step === 1 ? "Filters by category's" : "Selected products"}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close drawer"
          className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {step === 1 ? (
          <>
            {/* Step 1 Filters */}
            <div className="space-y-3">
              {/* Product search input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Select product..."
                className="w-full h-9.5 px-3.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-neutral-400 bg-white"
              />

              {/* Category and Subcategory dropdowns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="drawer-category"
                    className="block text-[11px] font-semibold text-neutral-600 mb-1"
                  >
                    Categroy
                  </label>
                  <div className="relative">
                    <select
                      id="drawer-category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-9 px-3 pr-8 rounded-lg border border-neutral-200 text-xs text-neutral-700 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="drawer-subcategory"
                    className="block text-[11px] font-semibold text-neutral-600 mb-1"
                  >
                    Subcategory
                  </label>
                  <div className="relative">
                    <select
                      id="drawer-subcategory"
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="w-full h-9 px-3 pr-8 rounded-lg border border-neutral-200 text-xs text-neutral-700 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
                    >
                      <option value="">Select subcategory...</option>
                      {SUBCATEGORIES.map((sc) => (
                        <option key={sc} value={sc}>
                          {sc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="border border-neutral-100 rounded-xl overflow-hidden mt-3">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="w-10 py-2.5 pl-4 pr-2" />
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3 text-right sm:text-left">Price</th>
                    <th className="py-2.5 pr-4 pl-2 text-right">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => (
                    <CategoryDrawerProductRow
                      key={prod.id}
                      product={prod}
                      isSelected={selectedProductIds.includes(prod.id)}
                      onToggle={handleToggleProduct}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Step 2: Selected Products with Variants matching Image 2 */
          <div className="border border-neutral-100 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="w-10 py-2.5 pl-4 pr-2" />
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3 text-right sm:text-left">Price</th>
                  <th className="py-2.5 pr-4 pl-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {/* Item 1 */}
                <CategoryDrawerProductRow
                  product={CATEGORY_DRAWER_PRODUCTS[0]}
                  isSelected={selectedProductIds.includes("cdp-1")}
                  onToggle={handleToggleProduct}
                />

                {/* Item 2 with nested variants */}
                <CategoryDrawerProductRow
                  product={CATEGORY_DRAWER_PRODUCTS[1]}
                  isSelected={selectedProductIds.includes("cdp-2")}
                  onToggle={handleToggleProduct}
                />
                {CATEGORY_DRAWER_PRODUCTS[1].variants?.map((v) => (
                  <CategoryDrawerVariantRow
                    key={v.id}
                    variant={v}
                    isSelected={selectedVariantIds.includes(v.id)}
                    onToggle={handleToggleVariant}
                  />
                ))}

                {/* Item 3 */}
                <CategoryDrawerProductRow
                  product={CATEGORY_DRAWER_PRODUCTS[6]}
                  isSelected={selectedProductIds.includes("cdp-7")}
                  onToggle={handleToggleProduct}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Drawer Footer Toolbar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50/70 border-t border-neutral-200">
        <span className="text-xs font-semibold text-neutral-700">
          {totalSelectedCount > 0 ? totalSelectedCount : 2} Products selected
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddNow}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Add Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CategoryFilterDrawer;
