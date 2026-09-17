"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { InventoryBulkActionsDropdown } from "./InventoryBulkActionsDropdown";
import { BulkActionType } from "../types/inventory.types";

interface InventoryTableHeaderProps {
  isAllSelected: boolean;
  selectedCount: number;
  onToggleSelectAll: () => void;
  isActionDropdownOpen: boolean;
  onToggleActionDropdown: () => void;
  onCloseActionDropdown: () => void;
  onSelectBulkAction: (action: BulkActionType) => void;
}

export const InventoryTableHeader: React.FC<InventoryTableHeaderProps> = ({
  isAllSelected,
  selectedCount,
  onToggleSelectAll,
  isActionDropdownOpen,
  onToggleActionDropdown,
  onCloseActionDropdown,
  onSelectBulkAction,
}) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-neutral-100 hover:bg-transparent">
        {/* Master Checkbox */}
        <TableHead className="w-10 pl-4 py-3.5">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onToggleSelectAll}
            aria-label="Select all rows"
          />
        </TableHead>

        {selectedCount > 0 ? (
          /* When rows are selected: Show Selection Badge + Action Dropdown */
          <TableHead colSpan={8} className="py-2.5">
            <div className="flex items-center gap-3">
              {/* Selected Count Indicator */}
              <div className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-neutral-700 bg-neutral-100/90 rounded-md border border-neutral-200/60">
                <span>{selectedCount} Select Action</span>
              </div>

              {/* Action Dropdown Trigger Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={onToggleActionDropdown}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-neutral-800 bg-white border border-neutral-200/80 rounded-md shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>Select Action</span>
                  {isActionDropdownOpen ? (
                    <ChevronUp className="size-3.5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="size-3.5 text-neutral-500" />
                  )}
                </button>

                {/* Dropdown Menu Component */}
                <InventoryBulkActionsDropdown
                  isOpen={isActionDropdownOpen}
                  onClose={onCloseActionDropdown}
                  onSelectAction={onSelectBulkAction}
                />
              </div>
            </div>
          </TableHead>
        ) : (
          /* Normal State: Show Column Headers */
          <>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Product Name
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Barcode
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Selling Price
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Unit Cost
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Stock
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Total value
            </TableHead>
            <TableHead className="font-semibold text-neutral-800 text-xs">
              Profit Margin
            </TableHead>
            <TableHead className="w-24 text-right font-semibold text-neutral-800 text-xs pr-4" />
          </>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default InventoryTableHeader;
