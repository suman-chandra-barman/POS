"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { type Customer } from "../types/customer.types";

interface CustomerTableProps {
  customers: Customer[];
  onSelectCustomer?: (customer: Customer) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSelectCustomer,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(customers.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    customers.length > 0 && selectedIds.length === customers.length;

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-160 sm:min-w-180">
          <thead>
            <tr className="border-b border-neutral-100/90 text-xs font-medium text-neutral-400">
              <th className="py-3 px-4 sm:px-6 w-10">
                <input
                  type="checkbox"
                  id="customer-select-all"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 text-xs font-medium text-neutral-400">
                Name
              </th>
              <th className="py-3 px-4 text-xs font-medium text-neutral-400">
                Email
              </th>
              <th className="py-3 px-4 text-xs font-medium text-neutral-400">
                Phone
              </th>
              <th className="py-3 px-4 text-xs font-medium text-neutral-400">
                Order
              </th>
              <th className="py-3 px-4 text-xs font-medium text-neutral-400 text-right">
                Due amount
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs font-medium text-neutral-400 text-right">
                Amount spent
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm">
            {customers.map((customer) => {
              const isChecked = selectedIds.includes(customer.id);
              return (
                <tr
                  key={customer.id}
                  onClick={() => onSelectCustomer?.(customer)}
                  className="hover:bg-neutral-50/70 transition-colors cursor-pointer group"
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <input
                      type="checkbox"
                      id={`customer-select-${customer.id}`}
                      checked={isChecked}
                      onClick={(e) => handleToggleRow(customer.id, e)}
                      onChange={() => {}}
                      className="rounded-md border-neutral-300 text-sky-500 focus:ring-sky-400 size-4 cursor-pointer"
                    />
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4 font-medium text-neutral-800 whitespace-nowrap">
                    {customer.name}
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                    {customer.email}
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 text-neutral-600 whitespace-nowrap">
                    {customer.phone}
                  </td>

                  {/* Order with shopping cart icon */}
                  <td className="py-3.5 px-4 text-neutral-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <ShoppingCart className="size-3.5 text-neutral-400 shrink-0" />
                      <span>{customer.orderCount}</span>
                    </div>
                  </td>

                  {/* Due amount in reddish color or blank */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {customer.dueAmount > 0 ? (
                      <span className="font-normal text-rose-500">
                        ৳ {formatCurrency(customer.dueAmount)}
                      </span>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>

                  {/* Amount spent */}
                  <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-neutral-800 whitespace-nowrap">
                    ৳ {formatCurrency(customer.amountSpent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
