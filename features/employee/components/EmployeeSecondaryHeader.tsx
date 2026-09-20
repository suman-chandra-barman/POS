"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Menu,
  Download,
  Upload,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EMPLOYEE_VIEWS,
  type EmployeeView,
} from "../types/employee.types";

interface EmployeeSecondaryHeaderProps {
  onNewEmployee: () => void;
  activeView: EmployeeView;
  onViewChange: (view: EmployeeView) => void;
  currentPage?: number;
  totalEmployees?: number;
}

export const EmployeeSecondaryHeader: React.FC<EmployeeSecondaryHeaderProps> = ({
  onNewEmployee,
  activeView,
  onViewChange,
  currentPage = 1,
  totalEmployees = 100,
}) => {
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
      {/* Left side actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* New Employee Primary Button */}
        <button
          type="button"
          onClick={onNewEmployee}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-98"
        >
          New Employee
        </button>

        {/* More Option Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreOptionsOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <span>More Option</span>
            <ChevronDown
              className={cn(
                "size-3.5 text-neutral-500 transition-transform duration-200",
                moreOptionsOpen && "rotate-180"
              )}
            />
          </button>

          {moreOptionsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMoreOptionsOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  type="button"
                  onClick={() => setMoreOptionsOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  <Upload className="size-3.5 text-neutral-500" />
                  <span>Import Employees</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMoreOptionsOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  <Download className="size-3.5 text-neutral-500" />
                  <span>Export Data</span>
                </button>
                <div className="border-t border-neutral-100 my-1" />
                <button
                  type="button"
                  onClick={() => setMoreOptionsOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <Trash2 className="size-3.5 text-rose-500" />
                  <span>Bulk Archive</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side pagination and layout toggles */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Pagination text & buttons */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-700">
          <span>
            1-{totalEmployees} <span className="text-neutral-400">/</span> {totalEmployees}
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
          {/* Card / Grid View Toggle */}
          <button
            type="button"
            onClick={() => onViewChange(EMPLOYEE_VIEWS.GRID)}
            aria-label="Grid View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              activeView === EMPLOYEE_VIEWS.GRID
                ? "text-neutral-900 bg-neutral-100 font-semibold"
                : "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50"
            )}
          >
            <LayoutGrid className="size-4.5 stroke-[1.8]" />
          </button>

          {/* List View Toggle */}
          <button
            type="button"
            onClick={() => onViewChange(EMPLOYEE_VIEWS.LIST)}
            aria-label="List View"
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              activeView === EMPLOYEE_VIEWS.LIST
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

export default EmployeeSecondaryHeader;
