"use client";

import React from "react";
import { InventoryLocationFilter } from "./InventoryLocationFilter";
import { InventoryCategoryTree } from "./InventoryCategoryTree";
import {
  InventoryCategoryNode,
  InventoryLocationNode,
} from "../types/inventory.types";

interface InventorySidebarProps {
  locations: InventoryLocationNode[];
  categories: InventoryCategoryNode[];
  selectedLocation: string | null;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectLocation: (locationName: string | null) => void;
  onSelectCategory: (
    categoryName: string | null,
    subcategoryName?: string | null
  ) => void;
}

export const InventorySidebar: React.FC<InventorySidebarProps> = ({
  locations,
  categories,
  selectedLocation,
  selectedCategory,
  selectedSubcategory,
  onSelectLocation,
  onSelectCategory,
}) => {
  return (
    <aside className="w-full lg:w-60 xl:w-64 shrink-0 flex flex-col gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)]">
      {/* Locations Section */}
      <InventoryLocationFilter
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
      />

      <hr className="border-t border-neutral-100" />

      {/* Categories Section */}
      <InventoryCategoryTree
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelectCategory={onSelectCategory}
      />
    </aside>
  );
};

export default InventorySidebar;
