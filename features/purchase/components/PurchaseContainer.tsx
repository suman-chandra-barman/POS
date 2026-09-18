"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  PURCHASE_VIEWS,
  PURCHASE_TABS,
  type PurchaseView,
  type PurchaseTab,
  type PurchaseOrder,
} from "../types/purchase.types";
import { INITIAL_PURCHASE_ORDERS } from "../data/purchaseMockData";
import { PurchaseTopbar } from "./PurchaseTopbar";
import { PurchaseListToolbar } from "./PurchaseListToolbar";
import { PurchaseTableCard } from "./PurchaseTableCard";
import { PurchaseCardGridView } from "./PurchaseCardGridView";
import { PurchaseOrderDetailsView } from "./PurchaseOrderDetailsView";
import { NewPurchaseContainer } from "./NewPurchaseContainer";

export const PurchaseContainer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL-driven state
  const viewParam =
    (searchParams.get("view") as PurchaseView) || PURCHASE_VIEWS.LIST;
  const tabParam =
    (searchParams.get("tab") as PurchaseTab) || PURCHASE_TABS.ALL;
  const orderIdParam = searchParams.get("id") || "";

  const [activeView, setActiveView] = useState<PurchaseView>(viewParam);
  const [activeTab, setActiveTab] = useState<PurchaseTab>(tabParam);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orderIdParam);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);

  // Sync state with URL search params
  const updateUrl = (
    view: PurchaseView,
    tab: PurchaseTab = activeTab,
    orderId: string = selectedOrderId
  ) => {
    const params = new URLSearchParams();
    if (view !== PURCHASE_VIEWS.LIST) params.set("view", view);
    if (tab !== PURCHASE_TABS.ALL) params.set("tab", tab);
    if (orderId && view === PURCHASE_VIEWS.DETAILS) params.set("id", orderId);

    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const handleViewChange = (newView: PurchaseView) => {
    setActiveView(newView);
    updateUrl(newView, activeTab, selectedOrderId);
  };

  const handleTabChange = (newTab: PurchaseTab) => {
    setActiveTab(newTab);
    updateUrl(activeView, newTab, selectedOrderId);
  };

  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveView(PURCHASE_VIEWS.DETAILS);
    updateUrl(PURCHASE_VIEWS.DETAILS, activeTab, orderId);
  };

  const handleNewPurchase = () => {
    setActiveView(PURCHASE_VIEWS.NEW);
    updateUrl(PURCHASE_VIEWS.NEW);
  };

  const handleBackNavigation = () => {
    if (activeView !== PURCHASE_VIEWS.LIST) {
      setActiveView(PURCHASE_VIEWS.LIST);
      updateUrl(PURCHASE_VIEWS.LIST);
    } else {
      router.back();
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map((o) => o.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Currently viewed order for details view
  const currentOrder = useMemo(() => {
    const found = orders.find(
      (o) => o.id === selectedOrderId || o.orderId === selectedOrderId
    );
    return found || orders[0];
  }, [orders, selectedOrderId]);

  const handleCreateBackorderAndOrder = (
    completedOrder: PurchaseOrder,
    backorder: PurchaseOrder
  ) => {
    setOrders((prev) => [
      completedOrder,
      backorder,
      ...prev.filter((o) => o.orderId !== completedOrder.orderId),
    ]);
    handleViewOrderDetails(completedOrder.orderId);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Dedicated Purchase Topbar */}
      <PurchaseTopbar onBack={handleBackNavigation} />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 py-4 pb-36">
        {/* 1. Purchase List Table View (Image 1) */}
        {activeView === PURCHASE_VIEWS.LIST && (
          <div className="space-y-4">
            <PurchaseListToolbar
              onNewPurchase={handleNewPurchase}
              searchQuery={globalSearch}
              onSearchChange={setGlobalSearch}
              activeView={activeView}
              onViewChange={handleViewChange}
            />

            <PurchaseTableCard
              orders={orders}
              selectedIds={selectedOrderIds}
              onToggleSelectAll={handleToggleSelectAll}
              onToggleSelectOne={handleToggleSelectOne}
              onViewOrder={handleViewOrderDetails}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              searchQuery={globalSearch}
            />
          </div>
        )}

        {/* 2. Purchase Card Grid View (Image 3) */}
        {activeView === PURCHASE_VIEWS.GRID && (
          <PurchaseCardGridView
            onNewPurchase={handleNewPurchase}
            onViewChange={handleViewChange}
            onSelectProduct={() => handleNewPurchase()}
          />
        )}

        {/* 3. Purchase Order Details View (Image 2) */}
        {activeView === PURCHASE_VIEWS.DETAILS && (
          <PurchaseOrderDetailsView
            order={currentOrder}
            onNewPurchase={handleNewPurchase}
          />
        )}

        {/* 4. New Purchase & Step 2 Flow (Image 4 & Image 5) */}
        {activeView === PURCHASE_VIEWS.NEW && (
          <NewPurchaseContainer
            onOrderCreated={(newId) => {
              handleViewOrderDetails(newId);
            }}
            onCreateBackorderAndOrder={handleCreateBackorderAndOrder}
            onCancel={handleBackNavigation}
          />
        )}
      </main>
    </div>
  );
};

export default PurchaseContainer;
