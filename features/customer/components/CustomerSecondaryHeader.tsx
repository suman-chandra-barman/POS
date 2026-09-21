"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  FileText,
  CreditCard,
  Layers,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CUSTOMER_VIEWS, type CustomerView } from "../types/customer.types";

interface CustomerSecondaryHeaderProps {
  onNewCustomer: () => void;
  onSaveCustomer?: () => void;
  onCancel?: () => void;
  activeView: CustomerView;
  onViewChange: (view: CustomerView) => void;
  currentPage?: number;
  totalCustomers?: number;
  isSaving?: boolean;
}

export const CustomerSecondaryHeader: React.FC<CustomerSecondaryHeaderProps> = ({
  onNewCustomer,
  onSaveCustomer,
  onCancel,
  activeView,
  onViewChange,
  currentPage = 1,
  totalCustomers = 100,
  isSaving = false,
}) => {
  const isFormMode =
    activeView === CUSTOMER_VIEWS.CREATE || activeView === CUSTOMER_VIEWS.EDIT;

  return (
    <div className="w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
      {/* Left side actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {isFormMode ? (
          <>
            <button
              type="button"
              id="btn-save-customer"
              onClick={onSaveCustomer}
              disabled={isSaving}
              className="px-4 py-2 bg-[#0095FF] hover:bg-sky-600 disabled:opacity-60 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-98"
            >
              {isSaving ? "Saving..." : "Save Customer"}
            </button>
            <button
              type="button"
              id="btn-cancel-customer"
              onClick={onCancel}
              className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200/90 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            id="btn-new-customer"
            onClick={onNewCustomer}
            className="px-4 py-2 bg-[#0095FF] hover:bg-sky-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-98"
          >
            New Customer
          </button>
        )}
      </div>

      {/* Right side: (Stats pill if form mode) + pagination + view switchers */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Form Mode Metric Pill: PoS Orders 56 | Invoiced 30 | Due 17,532.00 */}
        {isFormMode && (
          <div className="hidden md:flex items-center gap-5 px-4 py-1.5 bg-neutral-50/80 border border-neutral-200/80 rounded-xl text-xs font-medium text-neutral-700">
            {/* PoS Orders */}
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-600">
                <ShoppingBag className="size-3.5" />
              </div>
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-neutral-500 font-normal">PoS Orders</span>
                <span className="font-bold text-[#0095FF]">56</span>
              </div>
            </div>

            {/* Invoiced */}
            <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
              <div className="size-6 rounded-md bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-600">
                <FileText className="size-3.5" />
              </div>
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-neutral-500 font-normal">Invoiced</span>
                <span className="font-bold text-[#0095FF]">30</span>
              </div>
            </div>

            {/* Due */}
            <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
              <div className="size-6 rounded-md bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-600">
                <CreditCard className="size-3.5" />
              </div>
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-neutral-500 font-normal">Due</span>
                <span className="font-bold text-[#0095FF]">17,532.00</span>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-700">
          <span>
            1-100 <span className="text-neutral-400 font-normal">/</span> 100
          </span>
          <div className="flex items-center gap-0.5 text-neutral-500">
            <button
              type="button"
              aria-label="Previous Page"
              className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer disabled:opacity-40"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next Page"
              className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1">
          {/* Card View Toggle Icon */}
          <button
            type="button"
            id="btn-customer-card-view"
            onClick={() => onViewChange(CUSTOMER_VIEWS.CARD)}
            aria-label="Card View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              activeView === CUSTOMER_VIEWS.CARD
                ? "text-neutral-900 bg-neutral-100 font-semibold"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
            )}
          >
            {/* Custom Card/Badge SVG icon matching user image */}
            <div className="size-4 border-1.5 border-current rounded-xs flex flex-col justify-center items-center p-0.5">
              <div className="w-full h-0.5 bg-current rounded-xs" />
            </div>
          </button>

          {/* Table View Toggle Icon */}
          <button
            type="button"
            id="btn-customer-table-view"
            onClick={() => onViewChange(CUSTOMER_VIEWS.TABLE)}
            aria-label="Table View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              activeView === CUSTOMER_VIEWS.TABLE
                ? "text-neutral-900 bg-neutral-100 font-semibold"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <Menu className="size-4.5 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSecondaryHeader;
