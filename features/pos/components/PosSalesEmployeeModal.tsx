"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { PosSalesEmployee } from "../types/pos.types";
import { MOCK_POS_SALES_EMPLOYEES } from "../data/posMockData";

interface PosSalesEmployeeModalProps {
  selectedSalesperson?: PosSalesEmployee | null;
  onSelectSalesperson: (employee: PosSalesEmployee) => void;
  onClose: () => void;
}

export const PosSalesEmployeeModal: React.FC<PosSalesEmployeeModalProps> = ({
  selectedSalesperson,
  onSelectSalesperson,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const employees = MOCK_POS_SALES_EMPLOYEES;

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200/90 w-full max-w-240 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Matching Image 2) */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Sale employ
          </h2>
        </div>

        {/* Search Bar (Matching Image 2) */}
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

        {/* Employee Cards Grid (Matching Image 2) */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 pb-2">
            {filtered.map((emp) => {
              const isSelected = selectedSalesperson?.id === emp.id;

              return (
                <div
                  key={emp.id}
                  onClick={() => {
                    onSelectSalesperson(emp);
                    toast.success(`Sales employee selected: ${emp.name}`);
                    onClose();
                  }}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden bg-white group flex flex-col ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                      : "border-neutral-200 hover:border-blue-400 hover:shadow-md"
                  }`}
                >
                  {/* Top Gradient/Pattern Banner */}
                  <div
                    className={`h-16 w-full bg-gradient-to-r ${emp.bannerGradient} relative shrink-0`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 size-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <UserCheck className="size-3" />
                      </span>
                    )}
                  </div>

                  {/* Body with Overlapping Avatar */}
                  <div className="px-3 pt-0 pb-3 flex flex-col flex-1">
                    {/* Overlapping Avatar */}
                    <div className="size-11 rounded-full border-2 border-white -mt-5.5 relative shadow-xs overflow-hidden bg-neutral-100 shrink-0">
                      <Image
                        src={emp.avatarUrl}
                        alt={emp.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>

                    {/* Name & Role */}
                    <div className="mt-2 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 leading-snug truncate group-hover:text-blue-600 transition-colors">
                        {emp.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {emp.role}
                      </p>
                    </div>

                    {/* Stats Footer (Today Order & Amount) */}
                    <div className="mt-3 pt-2 border-t border-neutral-100 grid grid-cols-2 text-center">
                      <div className="text-left">
                        <span className="block text-xs font-bold text-neutral-900 leading-none">
                          {emp.todayOrders}
                        </span>
                        <span className="text-[10px] text-neutral-400 mt-1 block">
                          Today Order
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-bold text-neutral-900 leading-none">
                          {emp.amount}
                        </span>
                        <span className="text-[10px] text-neutral-400 mt-1 block">
                          Amount
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Cancel Button (Matching Image 2) */}
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

export default PosSalesEmployeeModal;
