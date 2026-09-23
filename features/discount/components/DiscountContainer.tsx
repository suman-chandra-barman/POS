"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  DISCOUNT_VIEW_MODES,
  DISCOUNT_STATUS,
  type DiscountViewMode,
  type DiscountItem,
  type DiscountFormValues,
} from "../types/discount.types";
import { INITIAL_DISCOUNTS } from "../data/discountMockData";
import { DiscountTopbar } from "./DiscountTopbar";
import { DiscountSecondaryNavbar } from "./DiscountSecondaryNavbar";
import { DiscountCardView } from "./DiscountCardView";
import { DiscountTableView } from "./DiscountTableView";
import { DiscountFormView } from "./DiscountFormView";
import { DiscountTypeModal } from "./DiscountTypeModal";

export const DiscountContainer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query params
  const viewQuery = searchParams.get("view");
  const initialMode: DiscountViewMode =
    viewQuery === "card" || viewQuery === "empty"
      ? DISCOUNT_VIEW_MODES.CARD
      : viewQuery === "create"
        ? DISCOUNT_VIEW_MODES.CREATE
        : DISCOUNT_VIEW_MODES.LIST;

  const [activeView, setActiveView] = useState<DiscountViewMode>(initialMode);
  const [discounts, setDiscounts] = useState<DiscountItem[]>(INITIAL_DISCOUNTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const updateView = (newView: DiscountViewMode) => {
    setActiveView(newView);
    const params = new URLSearchParams(searchParams.toString());
    if (newView === DISCOUNT_VIEW_MODES.LIST) {
      params.delete("view");
    } else {
      params.set("view", newView);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const handleOpenCreateModal = () => {
    setIsTypeModalOpen(true);
  };

  const handleSelectDiscountType = () => {
    updateView(DISCOUNT_VIEW_MODES.CREATE);
  };

  const handleSelectBuyXGetY = () => {
    toast.info("Buy X - Get X flow will be available in the next update!");
  };

  const handleSaveDiscount = (data: DiscountFormValues) => {
    const newDiscount: DiscountItem = {
      id: `disc-${Date.now()}`,
      title: data.title,
      coupons: "---",
      eligibility: data.eligibility,
      eligibilityLabel:
        data.eligibility === "specific_customer"
          ? "Specific Customer"
          : "All customers",
      typeTime: "Just now",
      status: DISCOUNT_STATUS.ACTIVE,
      usedCount: 0,
      valueType: data.valueType,
      value: parseFloat(data.discountValue) || 10,
    };

    setDiscounts((prev) => [newDiscount, ...prev]);
    toast.success("Discount created successfully!");
    updateView(DISCOUNT_VIEW_MODES.LIST);
  };

  const handleCancelForm = () => {
    updateView(
      discounts.length > 0
        ? DISCOUNT_VIEW_MODES.LIST
        : DISCOUNT_VIEW_MODES.CARD
    );
  };

  const handleTriggerFormSave = () => {
    const form = document.getElementById("discount-form") as HTMLFormElement | null;
    if (form) {
      form.requestSubmit();
    }
  };

  // Filter discounts based on search query
  const filteredDiscounts = useMemo(() => {
    if (!searchQuery.trim()) return discounts;
    const q = searchQuery.toLowerCase();
    return discounts.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (d.coupons && d.coupons.toLowerCase().includes(q)) ||
        d.eligibilityLabel.toLowerCase().includes(q)
    );
  }, [discounts, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb]">
      {/* 1. Primary Reusable Navbar (Title + Breadcrumbs + Sofia + AI) */}
      <DiscountTopbar />

      {/* 2. Secondary Fixed Navbar with Search & Card/Table Filters */}
      <DiscountSecondaryNavbar
        currentView={activeView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewDiscount={handleOpenCreateModal}
        onViewChange={(mode) => updateView(mode)}
        totalCount={discounts.length}
        filteredCount={filteredDiscounts.length}
        onSaveForm={handleTriggerFormSave}
        onCancelForm={handleCancelForm}
      />

      {/* 3. Main Body Content */}
      <main className="w-full min-h-[calc(100vh-8rem)] px-4 sm:px-6 py-6 pb-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Card View (Shows discounts in card grid, or empty state if none) */}
          {activeView === DISCOUNT_VIEW_MODES.CARD && (
            <DiscountCardView
              discounts={filteredDiscounts}
              onCreateOffer={handleOpenCreateModal}
            />
          )}

          {/* Table View */}
          {activeView === DISCOUNT_VIEW_MODES.LIST && (
            <DiscountTableView discounts={filteredDiscounts} />
          )}

          {/* Create Discount Form View (with React Hook Form & Zod) */}
          {activeView === DISCOUNT_VIEW_MODES.CREATE && (
            <DiscountFormView
              formId="discount-form"
              onSave={handleSaveDiscount}
              onCancel={handleCancelForm}
              onAddCoupons={() =>
                toast.info("Add Coupons flow will be added in the next step!")
              }
            />
          )}
        </div>
      </main>

      {/* "Selected to create" Dialog */}
      <DiscountTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSelectDiscount={handleSelectDiscountType}
        onSelectBuyXGetY={handleSelectBuyXGetY}
      />
    </div>
  );
};
