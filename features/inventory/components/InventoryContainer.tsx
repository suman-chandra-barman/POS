"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  INVENTORY_TABS,
  INVENTORY_STATUS,
  BULK_ACTIONS,
  InventoryTab,
  InventoryItem,
  BulkActionType,
} from "../types/inventory.types";
import {
  INVENTORY_LOCATIONS,
  INVENTORY_CATEGORIES,
  INITIAL_INVENTORY_ITEMS,
} from "../data/inventoryMockData";
import { InventorySidebar } from "./InventorySidebar";
import { InventoryHeaderToolbar } from "./InventoryHeaderToolbar";
import { InventoryTable } from "./InventoryTable";
import { InventoryHistoryDialog } from "./InventoryHistoryDialog";
import { InventoryLocationDialog } from "./InventoryLocationDialog";

export const InventoryContainer: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);
  const [activeTab, setActiveTab] = useState<InventoryTab>(INVENTORY_TABS.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);

  // Dialog states
  const [historyItem, setHistoryItem] = useState<InventoryItem | null>(null);
  const [locationItem, setLocationItem] = useState<InventoryItem | null>(null);

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (
        activeTab === INVENTORY_TABS.INACTIVE &&
        item.status !== INVENTORY_STATUS.INACTIVE
      )
        return false;
      if (
        activeTab === INVENTORY_TABS.ARCHIVED &&
        item.status !== INVENTORY_STATUS.ARCHIVED
      )
        return false;

      // Location filter
      if (selectedLocation && item.location !== selectedLocation) return false;

      // Category filter
      if (selectedCategory && item.category !== selectedCategory) return false;

      // Subcategory filter
      if (selectedSubcategory && item.subcategory !== selectedSubcategory)
        return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBarcode = item.barcode.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBarcode && !matchesCategory) return false;
      }

      return true;
    });
  }, [
    items,
    activeTab,
    selectedLocation,
    selectedCategory,
    selectedSubcategory,
    searchQuery,
  ]);

  // Checkbox Selection
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
      setIsActionDropdownOpen(false);
    } else {
      setSelectedIds(filteredItems.map((item) => item.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      if (next.length === 0) {
        setIsActionDropdownOpen(false);
      }
      return next;
    });
  };

  // Bulk Actions
  const handleSelectBulkAction = (action: BulkActionType) => {
    const count = selectedIds.length;
    if (count === 0) return;

    switch (action) {
      case BULK_ACTIONS.ARCHIVE:
        setItems((prev) =>
          prev.map((item) =>
            selectedIds.includes(item.id)
              ? { ...item, status: INVENTORY_STATUS.ARCHIVED }
              : item
          )
        );
        toast.success(`Archived ${count} item${count > 1 ? "s" : ""}`);
        setSelectedIds([]);
        break;

      case BULK_ACTIONS.DUPLICATE:
        toast.success(`Duplicated ${count} item${count > 1 ? "s" : ""}`);
        break;

      case BULK_ACTIONS.COLLECTION:
        toast.success(
          `Added ${count} item${count > 1 ? "s" : ""} to collection`
        );
        break;

      case BULK_ACTIONS.EXPORT_PDF:
        toast.success(`Exporting ${count} item${count > 1 ? "s" : ""} as PDF`);
        break;

      case BULK_ACTIONS.EDIT_PRODUCT:
        toast.info(`Editing batch of ${count} item${count > 1 ? "s" : ""}`);
        break;

      case BULK_ACTIONS.PRINT_LABEL:
        toast.success(
          `Generating print labels for ${count} item${count > 1 ? "s" : ""}`
        );
        break;
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 sm:px-6 py-6 pb-28">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Filter Sidebar */}
        <InventorySidebar
          locations={INVENTORY_LOCATIONS}
          categories={INVENTORY_CATEGORIES}
          selectedLocation={selectedLocation}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onSelectLocation={setSelectedLocation}
          onSelectCategory={(cat, sub) => {
            setSelectedCategory(cat);
            setSelectedSubcategory(sub ?? null);
          }}
        />

        {/* Right Main Table Card */}
        <main className="flex-1 w-full min-w-0 bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col gap-4">
          {/* Header Toolbar */}
          <InventoryHeaderToolbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Main Inventory Table */}
          <InventoryTable
            items={filteredItems}
            selectedIds={selectedIds}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelectOne={handleToggleSelectOne}
            isActionDropdownOpen={isActionDropdownOpen}
            onToggleActionDropdown={() =>
              setIsActionDropdownOpen((prev) => !prev)
            }
            onCloseActionDropdown={() => setIsActionDropdownOpen(false)}
            onSelectBulkAction={handleSelectBulkAction}
            onViewHistory={(item) => setHistoryItem(item)}
            onViewLocation={(item) => setLocationItem(item)}
          />
        </main>
      </div>

      {/* History Dialog */}
      <InventoryHistoryDialog
        item={historyItem}
        open={Boolean(historyItem)}
        onOpenChange={(open) => !open && setHistoryItem(null)}
      />

      {/* Location Dialog */}
      <InventoryLocationDialog
        item={locationItem}
        open={Boolean(locationItem)}
        onOpenChange={(open) => !open && setLocationItem(null)}
      />
    </div>
  );
};

export default InventoryContainer;
