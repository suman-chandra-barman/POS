"use client";

import React from "react";
import { type PurchaseOrder } from "../types/purchase.types";
import { PurchaseDetailsToolbar } from "./PurchaseDetailsToolbar";
import { PurchaseDetailsOrderCard } from "./PurchaseDetailsOrderCard";
import { PurchaseDetailsProductsTable } from "./PurchaseDetailsProductsTable";
import { PurchaseDetailsTotalsCard } from "./PurchaseDetailsTotalsCard";

interface PurchaseOrderDetailsViewProps {
  order: PurchaseOrder;
  onNewPurchase: () => void;
}

export const PurchaseOrderDetailsView: React.FC<
  PurchaseOrderDetailsViewProps
> = ({ order, onNewPurchase }) => {
  const items = order.items && order.items.length > 0 ? order.items : [];

  return (
    <div className="space-y-4">
      {/* View identifier subtitle / prompt marker */}
      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider pl-1">
        View - After Complete Purchase Order
      </div>

      {/* Action bar */}
      <PurchaseDetailsToolbar
        onNewPurchase={onNewPurchase}
        orderId={order.orderId}
      />

      {/* Order Info Card */}
      <PurchaseDetailsOrderCard
        orderId={order.orderId}
        date={order.date}
        supplierName={order.supplierDetails || order.vendorName}
        destination={order.destination || "Rampura Banasree"}
        receivedCount={order.receivedCount ?? 600}
        totalCount={order.totalCount ?? 1000}
      />

      {/* Products Table Card */}
      <PurchaseDetailsProductsTable items={items} />

      {/* Totals Summary Card */}
      <PurchaseDetailsTotalsCard
        productAmount={order.totalAmount}
        taxPercent={order.taxPercent ?? 0}
        totalAmount={order.totalAmount}
      />
    </div>
  );
};

export default PurchaseOrderDetailsView;
