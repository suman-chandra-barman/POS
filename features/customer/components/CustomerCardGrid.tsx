"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, ShoppingCart } from "lucide-react";
import { type Customer } from "../types/customer.types";

interface CustomerCardGridProps {
  customers: Customer[];
  onSelectCustomer?: (customer: Customer) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const CustomerCardGrid: React.FC<CustomerCardGridProps> = ({
  customers,
  onSelectCustomer,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {customers.map((customer) => (
        <div
          key={customer.id}
          onClick={() => onSelectCustomer?.(customer)}
          className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs hover:shadow-sm hover:border-sky-200 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            {/* Top row: Name & Avatar */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-sky-600 transition-colors">
                  {customer.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {customer.city || "Dhaka"}
                </p>
              </div>

              {customer.avatarUrl ? (
                <div className="size-10 rounded-full overflow-hidden relative border border-neutral-100 shrink-0">
                  <Image
                    src={customer.avatarUrl}
                    alt={customer.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-semibold text-xs shrink-0">
                  {customer.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-1.5 text-xs text-neutral-600 mb-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <Mail className="size-3.5 text-neutral-400 shrink-0" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-500">
                <Phone className="size-3.5 text-neutral-400 shrink-0" />
                <span>{customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Bottom stats row */}
          <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-neutral-50/80 rounded-lg p-2">
              <span className="text-[10px] text-neutral-400 block">Orders</span>
              <div className="flex items-center justify-center gap-1 font-semibold text-neutral-800 mt-0.5">
                <ShoppingCart className="size-3 text-neutral-400" />
                <span>{customer.orderCount}</span>
              </div>
            </div>

            <div className="bg-neutral-50/80 rounded-lg p-2">
              <span className="text-[10px] text-neutral-400 block">Due</span>
              <span
                className={`font-semibold mt-0.5 block ${
                  customer.dueAmount > 0 ? "text-rose-500" : "text-neutral-500"
                }`}
              >
                {customer.dueAmount > 0
                  ? `৳${customer.dueAmount.toLocaleString()}`
                  : "—"}
              </span>
            </div>

            <div className="bg-neutral-50/80 rounded-lg p-2">
              <span className="text-[10px] text-neutral-400 block">Spent</span>
              <span className="font-semibold text-neutral-800 mt-0.5 block truncate">
                ৳{formatCurrency(customer.amountSpent)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerCardGrid;
