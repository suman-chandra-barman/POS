"use client";

import React from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { SUPPLIERS, DESTINATIONS } from "../data/purchaseMockData";

interface NewPurchaseOrderCardProps {
  orderId: string;
  date: string;
  selectedSupplier: string;
  onSupplierChange: (supplier: string) => void;
  selectedDestination: string;
  onDestinationChange: (destination: string) => void;
}

export const NewPurchaseOrderCard: React.FC<NewPurchaseOrderCardProps> = ({
  orderId,
  date,
  selectedSupplier,
  onSupplierChange,
  selectedDestination,
  onDestinationChange,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs select-none">
      {/* Top row: Order ID + Date */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium text-neutral-500">
            Purchase Order ID:
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
            {orderId}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
          <Calendar className="size-3.5 text-neutral-500" />
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Two columns: Supplier Select & Destination Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="supplier-select"
            className="block text-xs font-medium text-neutral-500 mb-1.5"
          >
            Supplier Details
          </label>
          <div className="relative">
            <select
              id="supplier-select"
              value={selectedSupplier}
              onChange={(e) => onSupplierChange(e.target.value)}
              className="w-full h-10 px-3.5 pr-9 rounded-xl border border-neutral-200/90 bg-white text-xs font-medium text-neutral-800 appearance-none focus:outline-none focus:ring-1.5 focus:ring-blue-500 cursor-pointer transition-all"
            >
              <option value="">Select your supplier</option>
              {SUPPLIERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <div className="md:border-l md:border-neutral-100 md:pl-6">
          <label
            htmlFor="destination-select"
            className="block text-xs font-medium text-neutral-500 mb-1.5"
          >
            Destination
          </label>
          <div className="relative">
            <select
              id="destination-select"
              value={selectedDestination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="w-full h-10 px-3.5 pr-9 rounded-xl border border-neutral-200/90 bg-white text-xs font-medium text-neutral-800 appearance-none focus:outline-none focus:ring-1.5 focus:ring-blue-500 cursor-pointer transition-all"
            >
              <option value="">Select your destination</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseOrderCard;
