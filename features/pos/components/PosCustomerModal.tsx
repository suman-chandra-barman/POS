"use client";

import React, { useState } from "react";
import { User, Check, X, UserPlus, Search } from "lucide-react";
import { PosCustomer } from "../types/pos.types";
import { MOCK_CUSTOMERS } from "../data/posMockData";

interface PosCustomerModalProps {
  selectedCustomer: PosCustomer;
  onSelectCustomer: (customer: PosCustomer) => void;
  onClose: () => void;
}

export const PosCustomerModal: React.FC<PosCustomerModalProps> = ({
  selectedCustomer,
  onSelectCustomer,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<PosCustomer[]>(MOCK_CUSTOMERS);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newCust: PosCustomer = {
      id: `cust-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim() || "N/A",
      points: 0,
    };
    setCustomers((prev) => [newCust, ...prev]);
    onSelectCustomer(newCust);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200/80 w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900">Select Customer</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="size-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-hidden transition-all"
            />
          </div>

          {/* Customer list */}
          <div className="divide-y divide-neutral-100 border border-neutral-200/80 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
            {filtered.map((cust) => {
              const isSelected = cust.id === selectedCustomer.id;
              return (
                <button
                  key={cust.id}
                  type="button"
                  onClick={() => {
                    onSelectCustomer(cust);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                      <User className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {cust.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">{cust.phone}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="size-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <Check className="size-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Add New Quick Section */}
          {!isAdding ? (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-2 px-3 border border-dashed border-neutral-300 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="size-3.5" />
              <span>Create New Customer</span>
            </button>
          ) : (
            <form
              onSubmit={handleAddNew}
              className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5"
            >
              <p className="text-xs font-semibold text-neutral-800">
                New Customer Info
              </p>
              <input
                type="text"
                placeholder="Full Name *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full h-8 px-3 rounded-lg border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full h-8 px-3 rounded-lg border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden"
              />
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Save & Select
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-600 text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
