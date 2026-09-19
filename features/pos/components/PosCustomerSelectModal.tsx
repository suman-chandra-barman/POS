"use client";

import React, { useState } from "react";
import { Search, Plus, MoreVertical, User, ReceiptText, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { PosCustomer } from "../types/pos.types";
import { MOCK_CUSTOMERS } from "../data/posMockData";

interface PosCustomerSelectModalProps {
  selectedCustomer?: PosCustomer | null;
  onSelectCustomer: (customer: PosCustomer) => void;
  onClose: () => void;
}

export const PosCustomerSelectModal: React.FC<PosCustomerSelectModalProps> = ({
  selectedCustomer,
  onSelectCustomer,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<PosCustomer[]>(MOCK_CUSTOMERS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDiscount, setNewDiscount] = useState("0");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.type && c.type.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const discountVal = parseFloat(newDiscount) || 0;
    const initials = newName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newCust: PosCustomer = {
      id: `cust-${Date.now()}`,
      name: newName.trim(),
      type: "Customer",
      discountPercent: discountVal,
      phone: newPhone.trim() || "01636964581",
      initials: initials || "CU",
      avatarColor: "bg-sky-100 text-sky-700",
    };

    setCustomers((prev) => [newCust, ...prev]);
    onSelectCustomer(newCust);
    toast.success(`Customer ${newCust.name} created and selected!`);
    onClose();
  };

  const handleActionClick = (e: React.MouseEvent, action: string, customer: PosCustomer) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (action === "all_orders") {
      toast.info(`Viewing order history for ${customer.name}`);
    } else if (action === "edit_details") {
      toast.info(`Editing customer details for ${customer.name}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200/90 w-full max-w-220 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={() => setActiveMenuId(null)}
      >
        {/* Header (Matching Image 1) */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Insert page title here
          </h2>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreating((v) => !v);
            }}
            className="h-10 px-4 rounded-xl bg-[#0080ff] hover:bg-[#0070e0] text-white text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span>Create Customer</span>
          </button>
        </div>

        {/* Quick Create Dropdown / Form */}
        {isCreating && (
          <form
            onSubmit={handleCreateCustomer}
            onClick={(e) => e.stopPropagation()}
            className="mx-6 mb-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <p className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              New Customer Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Contact Phone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Discount %"
                min="0"
                max="100"
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
                className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#0080ff] hover:bg-[#0070e0] text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Save Customer
              </button>
            </div>
          </form>
        )}

        {/* Search Bar (Matching Image 1) */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="size-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300 transition-all"
            />
          </div>
        </div>

        {/* Table Column Headers (Matching Image 1) */}
        <div className="px-6">
          <div className="w-full h-10 px-4 rounded-lg bg-neutral-100/70 grid grid-cols-12 items-center text-xs font-semibold text-neutral-500">
            <span className="col-span-5 sm:col-span-5">Company Name</span>
            <span className="col-span-3 sm:col-span-3 text-center sm:text-left">
              Discount value
            </span>
            <span className="col-span-3 sm:col-span-3">Contact</span>
            <span className="col-span-1 text-right"></span>
          </div>
        </div>

        {/* Customer List Rows (Matching Image 1) */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No customers found.
            </div>
          ) : (
            filtered.map((cust) => {
              const isSelected = selectedCustomer?.id === cust.id;
              const hasDiscount = (cust.discountPercent || 0) > 0;

              return (
                <div
                  key={cust.id}
                  onClick={() => {
                    onSelectCustomer(cust);
                    toast.success(`Selected customer: ${cust.name}`);
                    onClose();
                  }}
                  className={`relative grid grid-cols-12 items-center py-3.5 px-4 rounded-xl transition-colors cursor-pointer group ${
                    isSelected
                      ? "bg-blue-50/60"
                      : "hover:bg-neutral-50/80"
                  }`}
                >
                  {/* Company Name & Avatar */}
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-3 pr-2 min-w-0">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                        cust.avatarColor || "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {cust.initials ? (
                        <span>{cust.initials}</span>
                      ) : (
                        <User className="size-5 text-neutral-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {cust.name}
                      </p>
                      <p className="text-xs text-neutral-400 capitalize">
                        {cust.type || "Customer"}
                      </p>
                    </div>
                  </div>

                  {/* Discount Value */}
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-center sm:justify-start">
                    {hasDiscount ? (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border border-orange-400/80 bg-orange-50/60 text-orange-600 text-xs font-semibold">
                        {cust.discountPercent}%
                      </span>
                    ) : (
                      <span className="text-neutral-400 text-xs font-mono select-none">
                        -----
                      </span>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="col-span-3 sm:col-span-3 text-xs text-neutral-600 font-normal">
                    {cust.phone}
                  </div>

                  {/* Three-Dot Actions Dropdown */}
                  <div className="col-span-1 flex items-center justify-end relative">
                    <button
                      type="button"
                      aria-label="Customer actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === cust.id ? null : cust.id);
                      }}
                      className="size-8 rounded-lg hover:bg-neutral-200/60 text-neutral-400 hover:text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <MoreVertical className="size-4" />
                    </button>

                    {/* Popover Dropdown (Matching Image 1: "All order", "Edit Details") */}
                    {activeMenuId === cust.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                      >
                        <button
                          type="button"
                          onClick={(e) => handleActionClick(e, "all_orders", cust)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                        >
                          <ReceiptText className="size-3.5 text-neutral-400" />
                          <span>All order</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleActionClick(e, "edit_details", cust)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                        >
                          <Edit3 className="size-3.5 text-neutral-400" />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Cancel Button (Matching Image 1) */}
        <div className="p-6 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosCustomerSelectModal;
