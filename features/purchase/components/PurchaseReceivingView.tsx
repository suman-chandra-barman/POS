"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  type PurchaseOrder,
  type PurchaseOrderItem,
} from "../types/purchase.types";
import { CreateBackorderDialog } from "./CreateBackorderDialog";

interface PurchaseReceivingViewProps {
  order: PurchaseOrder;
  onOrderCompleted: (updatedOrder: PurchaseOrder) => void;
  onCreateBackorder: (
    completedOrder: PurchaseOrder,
    backorder: PurchaseOrder
  ) => void;
}

export const PurchaseReceivingView: React.FC<PurchaseReceivingViewProps> = ({
  order,
  onOrderCompleted,
  onCreateBackorder,
}) => {
  // Initialize items with editable quantities
  const [items, setItems] = useState<PurchaseOrderItem[]>(() => {
    if (order.items && order.items.length > 0) {
      return order.items.map((i) => ({
        ...i,
        demand: i.demand ?? i.quantity ?? 120,
        quantity: i.quantity ?? 0,
        difference: (i.quantity ?? 0) - (i.demand ?? i.quantity ?? 120),
      }));
    }
    return [
      {
        id: "recv-1",
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
      },
      {
        id: "recv-2",
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
      },
    ];
  });

  const [isRejected, setIsRejected] = useState(false);
  const [isBackorderDialogOpen, setIsBackorderDialogOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Calculations
  const totalDemand = items.reduce((sum, item) => sum + (item.demand ?? 0), 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalDifference = totalQuantity - totalDemand;

  // Percentage for progress line
  const progressPercent =
    totalDemand > 0
      ? Math.min(100, Math.max(0, Math.round((totalQuantity / totalDemand) * 100)))
      : 0;

  // Update item quantity
  const handleQuantityChange = (id: string, newQty: number) => {
    setIsRejected(false);
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const demand = item.demand ?? 0;
          return {
            ...item,
            quantity: newQty,
            difference: newQty - demand,
            totalAmount: newQty * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  // Reject All: turns progress line 100% red
  const handleRejectAll = () => {
    setIsRejected(true);
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        quantity: 0,
        difference: -(item.demand ?? 0),
        totalAmount: 0,
      }))
    );
    toast.error("All products marked as rejected. Progress bar is 100% red.");
  };

  // Accept All: fills all quantities to demand (100% green line)
  const handleAcceptAll = () => {
    setIsRejected(false);
    setItems((prev) =>
      prev.map((item) => {
        const demand = item.demand ?? 0;
        return {
          ...item,
          quantity: demand,
          difference: 0,
          totalAmount: demand * item.unitPrice,
        };
      })
    );
    toast.success("All products accepted at 100% demand.");
  };

  // Validate Order button clicked
  const handleValidateOrder = () => {
    if (isRejected) {
      toast.error("This order has been rejected.");
      onOrderCompleted({
        ...order,
        status: "Cancel",
        isRejected: true,
        items,
      });
      return;
    }

    // Check if there is any mismatch (quantity < demand)
    const hasMismatch = items.some((i) => i.quantity < (i.demand ?? 0));
    if (hasMismatch) {
      setIsBackorderDialogOpen(true);
    } else {
      toast.success("Order validated and completed successfully!");
      onOrderCompleted({
        ...order,
        status: "Confirmed",
        receivedCount: totalQuantity,
        totalCount: totalDemand,
        items,
      });
    }
  };

  // Handle Create Backorder (Image 5 action)
  const handleConfirmCreateBackorder = () => {
    setIsBackorderDialogOpen(false);

    // Mismatched items for backorder
    const backorderItems: PurchaseOrderItem[] = items
      .filter((i) => (i.demand ?? 0) > i.quantity)
      .map((i) => {
        const remainingDemand = (i.demand ?? 0) - i.quantity;
        return {
          ...i,
          id: `backorder-item-${Date.now()}-${i.id}`,
          demand: remainingDemand,
          quantity: 0,
          difference: -remainingDemand,
          totalAmount: remainingDemand * i.unitPrice,
        };
      });

    const backorder: PurchaseOrder = {
      id: `po-backorder-${Date.now()}`,
      orderId: `${order.orderId}-BO`,
      vendorName: order.vendorName || "JK Fashion",
      vendorAvatar: order.vendorAvatar,
      buyerName: order.buyerName || "Branch California",
      date: "Mar 12, 2026",
      totalAmount: backorderItems.reduce((acc, it) => acc + it.totalAmount, 0),
      status: "Pending",
      supplierDetails: order.supplierDetails || "JK Fashion",
      destination: order.destination || "Rampura Banasree",
      items: backorderItems,
    };

    const completedOrder: PurchaseOrder = {
      ...order,
      status: "Confirmed",
      receivedCount: totalQuantity,
      totalCount: totalDemand,
      items,
    };

    onCreateBackorder(completedOrder, backorder);
    toast.success(
      `Backorder ${backorder.orderId} created for remaining items! Current order completed.`
    );
  };

  // Handle No Backorder (Image 5 action)
  const handleNoBackorder = () => {
    setIsBackorderDialogOpen(false);
    toast.success("Order completed without creating a backorder.");
    onOrderCompleted({
      ...order,
      status: "Confirmed",
      receivedCount: totalQuantity,
      totalCount: totalDemand,
      items,
    });
  };

  return (
    <div className="space-y-4 select-none">
      {/* Action Toolbar matching Image 4 */}
      <div className="flex items-center gap-2.5 py-3">
        <button
          type="button"
          onClick={handleValidateOrder}
          className="h-9 px-4.5 rounded-xl bg-[#007aff] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Validate order
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            className="h-9 px-3.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>More option</span>
            <ChevronDown className="size-3.5 text-neutral-500" />
          </button>

          {moreOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMoreOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in duration-150 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);
                    handleRejectAll();
                  }}
                  className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);
                    handleAcceptAll();
                  }}
                  className="w-full text-left px-3.5 py-2 text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* PO Card with Dynamic Progress Bar matching Image 4 */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-medium text-neutral-500">
              Purchase Order ID:
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
              {order.orderId || "SJ0001"}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
            <Calendar className="size-3.5 text-neutral-500" />
            <span>Date: {order.date || "Mar 12, 2026"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-medium text-neutral-500">
              Supplier Details
            </span>
            <p className="text-base font-bold text-neutral-900 mt-1">
              {order.supplierDetails || order.vendorName || "JK Fashion"}
            </p>
          </div>

          <div className="md:border-l md:border-neutral-100 md:pl-6">
            <span className="text-xs font-medium text-neutral-500">
              Destination
            </span>
            <p className="text-base font-bold text-neutral-900 mt-1">
              {order.destination || "Rampura Banasree"}
            </p>
          </div>
        </div>

        {/* Dynamic Progress Line */}
        <div className="mt-5 space-y-1.5">
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isRejected ? "bg-rose-500 w-full" : "bg-[#16a34a]"
              )}
              style={{
                width: isRejected ? "100%" : `${progressPercent}%`,
              }}
            />
          </div>
          <div className="flex justify-end">
            <span
              className={cn(
                "text-xs font-medium",
                isRejected ? "text-rose-600 font-bold" : "text-neutral-600"
              )}
            >
              {isRejected
                ? "Order Rejected (100% Red)"
                : `Total received: ${totalQuantity} of ${totalDemand}`}
            </span>
          </div>
        </div>
      </div>

      {/* Add Product Card with Reject All & Accept All matching Image 4 */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900">Add product</h3>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={handleRejectAll}
              className="text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="text-[#007aff] hover:text-blue-700 transition-colors cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Products Table with editable quantity inputs */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-500 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3 text-right sm:text-center">Demand</th>
                <th className="py-3 px-3 text-right sm:text-center">Quantity</th>
                <th className="py-3 px-3 text-right">Difference</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const diff = item.difference ?? 0;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-lg overflow-hidden relative border border-neutral-100 shrink-0 bg-neutral-50">
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-800 leading-tight">
                            {item.productName}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right sm:text-center font-medium text-neutral-600">
                      {item.demand}
                    </td>

                    <td className="py-3.5 px-3 text-right sm:text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Math.max(0, Number(e.target.value) || 0)
                          )
                        }
                        className="w-24 h-8 px-2 text-center rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-1.5 focus:ring-blue-500 bg-white"
                      />
                    </td>

                    <td className="py-3.5 px-3 text-right font-bold">
                      <span
                        className={cn(
                          diff < 0
                            ? "text-rose-600"
                            : diff > 0
                            ? "text-emerald-600"
                            : "text-neutral-800"
                        )}
                      >
                        {diff}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-neutral-200/80 font-bold text-neutral-900 bg-neutral-50/40">
                <td className="py-3.5 px-3">Total:</td>
                <td className="py-3.5 px-3 text-right sm:text-center font-bold text-neutral-800">
                  {totalDemand}
                </td>
                <td className="py-3.5 px-3 text-right sm:text-center font-black text-neutral-900">
                  {totalQuantity}
                </td>
                <td className="py-3.5 px-3 text-right font-black">
                  <span
                    className={cn(
                      totalDifference < 0 ? "text-rose-600" : "text-neutral-900"
                    )}
                  >
                    {totalDifference}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Totals Summary Card */}
      <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none">
        <div className="max-w-xs ml-auto space-y-2 text-xs">
          <div className="flex items-center justify-between text-neutral-600">
            <span>All Product Amount:</span>
            <span className="font-semibold text-neutral-900">
              {(125354).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600">
            <span>Tax%:</span>
            <span className="font-semibold text-neutral-900">0.00</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-sm font-bold text-neutral-900">
            <span>Total Amount:</span>
            <span className="text-base font-black">
              {(125354).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Create Backorder Dialog (Image 5) */}
      <CreateBackorderDialog
        isOpen={isBackorderDialogOpen}
        onClose={() => setIsBackorderDialogOpen(false)}
        onCreateBackorder={handleConfirmCreateBackorder}
        onNoBackorder={handleNoBackorder}
      />
    </div>
  );
};

export default PurchaseReceivingView;
