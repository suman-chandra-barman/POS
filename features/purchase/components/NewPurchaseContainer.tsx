"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  type PurchaseOrderItem,
  type CatalogProduct,
  type PurchaseOrder,
} from "../types/purchase.types";
import { NewPurchaseToolbar } from "./NewPurchaseToolbar";
import { NewPurchaseOrderCard } from "./NewPurchaseOrderCard";
import { NewPurchaseProductSection } from "./NewPurchaseProductSection";
import { NewPurchaseTotalsCard } from "./NewPurchaseTotalsCard";
import { MarkAsOrderedDialog } from "./MarkAsOrderedDialog";
import { PurchaseReceivingView } from "./PurchaseReceivingView";

interface NewPurchaseContainerProps {
  onOrderCreated?: (newOrderId: string) => void;
  onCancel?: () => void;
  onCreateBackorderAndOrder?: (
    completedOrder: PurchaseOrder,
    backorder: PurchaseOrder
  ) => void;
}

export const NewPurchaseContainer: React.FC<NewPurchaseContainerProps> = ({
  onOrderCreated,
  onCancel,
  onCreateBackorderAndOrder,
}) => {
  const [supplier, setSupplier] = useState("JK Fashion");
  const [destination, setDestination] = useState("Rampura Banasree");
  const [items, setItems] = useState<PurchaseOrderItem[]>([
    {
      id: "init-poi-1",
      productId: "prod-zara-1",
      productName: "Zara Half T-shirt",
      sku: "SJ00012345",
      imageUrl:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80",
      demand: 120,
      quantity: 120,
      unitPrice: 1200,
      totalAmount: 144000,
      difference: 0,
      category: "T-shirt",
      subcategory: "Men's T-shirt",
    },
    {
      id: "init-poi-2",
      productId: "prod-zara-2",
      productName: "Zara Full T-shirt",
      sku: "SJ00086124",
      imageUrl:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=150&auto=format&fit=crop&q=80",
      demand: 120,
      quantity: 120,
      unitPrice: 1620,
      totalAmount: 194400,
      difference: 0,
      category: "T-shirt",
      subcategory: "Men's T-shirt",
    },
  ]);

  const [isMarkAsOrderedOpen, setIsMarkAsOrderedOpen] = useState(false);
  const [isReceivingStage, setIsReceivingStage] = useState(false);

  // Add catalog products selected in Step 2 or from Category Drawer
  const handleAddProducts = (selectedProducts: CatalogProduct[]) => {
    const newItems: PurchaseOrderItem[] = selectedProducts.map((p) => {
      const defaultQty = 120;
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

  // Confirm Order button triggers the "Mark as ordered?" dialog (Image 3)
  const handleOpenConfirmDialog = () => {
    if (!supplier) {
      toast.error("Please select a supplier");
      return;
    }
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }
    setIsMarkAsOrderedOpen(true);
  };

  // User confirmed "Mark as ordered" (Image 3 action)
  const handleConfirmMarkAsOrdered = () => {
    setIsMarkAsOrderedOpen(false);
    setIsReceivingStage(true);
    toast.success("Order marked as ordered! Ready for receiving incoming items.");
  };

  const handleValidate = () => {
    if (!supplier || !destination) {
      toast.warning("Incomplete order: Supplier and Destination are required.");
    } else {
      toast.success("Purchase order details validated successfully.");
    }
  };

  const currentOrderData: PurchaseOrder = {
    id: "po-new-sj0001",
    orderId: "SJ0001",
    vendorName: supplier,
    buyerName: "Branch California",
    date: "Mar 12, 2026",
    totalAmount: calculatedProductAmount,
    status: "Pending",
    supplierDetails: supplier,
    destination: destination,
    items,
  };

  // If in receiving/validation stage, render PurchaseReceivingView (Image 4)
  if (isReceivingStage) {
    return (
      <PurchaseReceivingView
        order={currentOrderData}
        onOrderCompleted={(completed) => {
          onOrderCreated?.(completed.orderId);
        }}
        onCreateBackorder={(completed, backorder) => {
          if (onCreateBackorderAndOrder) {
            onCreateBackorderAndOrder(completed, backorder);
          } else {
            onOrderCreated?.(completed.orderId);
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* View identifier subtitle matching Image 4 */}
      <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider pl-1">
        Default - New Purchase
      </div>

      {/* Action Toolbar */}
      <NewPurchaseToolbar
        onConfirmOrder={handleOpenConfirmDialog}
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

      {/* Mark as ordered Confirmation Modal (Image 3) */}
      <MarkAsOrderedDialog
        isOpen={isMarkAsOrderedOpen}
        onClose={() => setIsMarkAsOrderedOpen(false)}
        onConfirm={handleConfirmMarkAsOrdered}
      />
    </div>
  );
};

export default NewPurchaseContainer;
