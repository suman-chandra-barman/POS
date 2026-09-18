"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  PURCHASE_STATUS,
  type PurchaseOrder,
  type PurchaseStatus,
} from "../types/purchase.types";

interface PurchaseTableRowProps {
  order: PurchaseOrder;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onViewOrder: (id: string) => void;
}

const getStatusBadge = (status: PurchaseStatus) => {
  switch (status) {
    case PURCHASE_STATUS.CONFIRMED:
      return "bg-[#e8f8ee] text-[#1aa653]";
    case PURCHASE_STATUS.PENDING:
      return "bg-[#fff6e5] text-[#d97706]";
    case PURCHASE_STATUS.CANCEL:
      return "bg-[#fdeeed] text-[#e04f44]";
    case PURCHASE_STATUS.DRAFT:
    default:
      return "bg-[#f1f3f5] text-[#6c757d]";
  }
};

export const PurchaseTableRow: React.FC<PurchaseTableRowProps> = ({
  order,
  isSelected,
  onToggleSelect,
  onViewOrder,
}) => {
  return (
    <tr
      onClick={() => onViewOrder(order.id)}
      className="group hover:bg-neutral-50/70 border-b border-neutral-100 transition-colors cursor-pointer text-xs select-none"
    >
      <td
        className="py-3.5 pl-4 pr-2 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(order.id)}
          aria-label={`Select order ${order.orderId}`}
          className="cursor-pointer"
        />
      </td>

      <td className="py-3.5 px-3 font-medium text-neutral-700">
        {order.orderId}
      </td>

      <td className="py-3.5 px-3">
        <div className="flex items-center gap-2">
          {order.vendorAvatar ? (
            <div className="size-6 rounded-md overflow-hidden relative border border-neutral-100 shrink-0">
              <Image
                src={order.vendorAvatar}
                alt={order.vendorName}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="size-6 rounded-md bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              {order.vendorName.charAt(0)}
            </div>
          )}
          <span className="font-medium text-neutral-800">
            {order.vendorName}
          </span>
        </div>
      </td>

      <td className="py-3.5 px-3 font-medium text-neutral-700">
        {order.buyerName}
      </td>

      <td className="py-3.5 px-3 text-neutral-600">{order.date}</td>

      <td className="py-3.5 px-3 font-medium text-neutral-800">
        {order.totalAmount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>

      <td className="py-3.5 px-3">
        <span
          className={cn(
            "inline-flex items-center justify-center px-3 py-1 rounded-md text-[11px] font-semibold",
            getStatusBadge(order.status)
          )}
        >
          {order.status}
        </span>
      </td>

      <td
        className="py-3.5 pr-4 pl-2 text-center"
        onClick={(e) => {
          e.stopPropagation();
          onViewOrder(order.id);
        }}
      >
        <button
          type="button"
          aria-label="View tracking or location"
          className="p-1 rounded-full text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
        >
          <MapPin className="size-4" />
        </button>
      </td>
    </tr>
  );
};

export default PurchaseTableRow;
