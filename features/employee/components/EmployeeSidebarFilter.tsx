"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  EMPLOYEE_CATEGORIES,
  type EmployeeCategory,
} from "../types/employee.types";

interface EmployeeSidebarFilterProps {
  selectedCategory: EmployeeCategory;
  onSelectCategory: (category: EmployeeCategory) => void;
  locationCounts?: {
    banani: number;
    mirpur: number;
    gulshan: number;
  };
}

export const EmployeeSidebarFilter: React.FC<EmployeeSidebarFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  locationCounts = { banani: 3, mirpur: 3, gulshan: 12 },
}) => {
  return (
    <aside className="w-full md:w-56 shrink-0 bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs">
      {/* Category Section */}
      <h3 className="text-sm font-bold text-neutral-900 mb-3">Employ</h3>

      <div className="space-y-1">
        <button
          type="button"
          onClick={() => onSelectCategory(EMPLOYEE_CATEGORIES.ALL)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
            selectedCategory === EMPLOYEE_CATEGORIES.ALL
              ? "bg-neutral-100/90 text-neutral-900 font-semibold"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          )}
        >
          All Employ
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory(EMPLOYEE_CATEGORIES.ADMIN)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
            selectedCategory === EMPLOYEE_CATEGORIES.ADMIN
              ? "bg-neutral-100/90 text-neutral-900 font-semibold"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          )}
        >
          Administrator
        </button>
      </div>

      {/* Locations Section */}
      <div className="mt-6">
        <h4 className="text-xs font-semibold text-neutral-800 lowercase tracking-wide mb-2.5">
          locations
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory(EMPLOYEE_CATEGORIES.BANANI)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
              selectedCategory === EMPLOYEE_CATEGORIES.BANANI
                ? "bg-neutral-100/90 text-neutral-900 font-semibold"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <span>Banani</span>
            <span className="text-neutral-500 font-normal">
              {locationCounts.banani}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory(EMPLOYEE_CATEGORIES.MIRPUR)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
              selectedCategory === EMPLOYEE_CATEGORIES.MIRPUR
                ? "bg-neutral-100/90 text-neutral-900 font-semibold"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <span>Mirpur</span>
            <span className="text-neutral-500 font-normal">
              {locationCounts.mirpur}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory(EMPLOYEE_CATEGORIES.GULSHAN)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer",
              selectedCategory === EMPLOYEE_CATEGORIES.GULSHAN
                ? "bg-neutral-100/90 text-neutral-900 font-semibold"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <span>Gulshan</span>
            <span className="text-neutral-500 font-normal">
              {locationCounts.gulshan}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default EmployeeSidebarFilter;
