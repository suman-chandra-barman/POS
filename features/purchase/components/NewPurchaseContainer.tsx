"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  type PurchaseOrderItem,
  type CatalogProduct,
} from "../types/purchase.types";
import { NewPurchaseToolbar } from "./NewPurchaseToolbar";
import { NewPurchaseOrderCard } from "./NewPurchaseOrderCard";
import { NewPurchaseProductSection } from "./NewPurchaseProductSection";
import { NewPurchaseTotalsCard } from "./NewPurchaseTotalsCard";

interface NewPurchaseContainerProps {
  onOrderCreated?: (newOrderId: string) => void;
  onCancel?: () => void;
}

export const NewPurchaseContainer: React.FC<NewPurchaseContainerProps> = ({
  onOrderCreated,
  onCancel,
}) => {
  const [supplier, setSupplier] = useState("");
  const [destination, setDestination] = useState("");
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);

  // Add catalog products selected in Step 2
  const handleAddProducts = (selectedProducts: CatalogProduct[]) => {
    const newItems: PurchaseOrderItem[] = selectedProducts.map((p) => {
      // Default demand & quantity to realistic values like 120 or 100
      const defaultQty = p.price > 2000 ? 10 : 20;
      return {
        id: `new-poi-${Date.now()}-${p.id}`,
        productId: p.id,
        productName: p.name,
        sku: p.code || p.sku,
        imageUrl: p.imageUrl,
        demand: defaultQty,
        quantity: defaultQty,
        unitPrice: p.price,
        totalAmount: defaultQty * p.price,
        difference: 0,
        category: p.category,
        subcategory: p.subcategory,
      };
    });

    setItems((prev) => [...prev, ...newItems]);
    toast.success(`${selectedProducts.length} product(s) added to order`);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: qty,
              totalAmount: qty * item.unitPrice,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculatedProductAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  const handleConfirmOrder = () => {
    if (!supplier) {
      toast.error("Please select a supplier");
      return;
    }
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }
    toast.success("Purchase order SJ0001 created successfully!");
    onOrderCreated?.("SJ0001");
  };

  const handleValidate = () => {
    if (!supplier || !destination) {
      toast.warning("Incomplete order: Supplier and Destination are required.");
    } else {
      toast.success("Purchase order details validated successfully.");
    }
  };

  return (
    <div className="space-y-4">
      {/* View identifier subtitle matching Image 4 */}
      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider pl-1">
        Default - New Purchase
      </div>

      {/* Action Toolbar */}
      <NewPurchaseToolbar
        onConfirmOrder={handleConfirmOrder}
        onValidate={handleValidate}
        onCancelOrder={onCancel || (() => {})}
      />

      {/* PO Info Card */}
      <NewPurchaseOrderCard
        orderId="SJ0001"
        date="Mar 12, 2026"
        selectedSupplier={supplier}
        onSupplierChange={setSupplier}
        selectedDestination={destination}
        onDestinationChange={setDestination}
      />

      {/* Add Product Section (with Step 2 selection modal and table) */}
      <NewPurchaseProductSection
        items={items}
        onAddProducts={handleAddProducts}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Totals Summary Card */}
      <NewPurchaseTotalsCard productAmount={calculatedProductAmount} />
    </div>
  );
};

export default NewPurchaseContainer;
