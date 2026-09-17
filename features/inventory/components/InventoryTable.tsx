"use client";

import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { InventoryTableHeader } from "./InventoryTableHeader";
import { InventoryTableRow } from "./InventoryTableRow";
import { InventoryTableFooter } from "./InventoryTableFooter";
import { InventoryItem, BulkActionType } from "../types/inventory.types";

interface InventoryTableProps {
  items: InventoryItem[];
  selectedIds: string[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (id: string) => void;
  isActionDropdownOpen: boolean;
  onToggleActionDropdown: () => void;
  onCloseActionDropdown: () => void;
  onSelectBulkAction: (action: BulkActionType) => void;
  onViewHistory: (item: InventoryItem) => void;
  onViewLocation: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectOne,
  isActionDropdownOpen,
  onToggleActionDropdown,
  onCloseActionDropdown,
  onSelectBulkAction,
  onViewHistory,
  onViewLocation,
}) => {
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-180">
        <InventoryTableHeader
          isAllSelected={isAllSelected}
          selectedCount={selectedIds.length}
          onToggleSelectAll={onToggleSelectAll}
          isActionDropdownOpen={isActionDropdownOpen}
          onToggleActionDropdown={onToggleActionDropdown}
          onCloseActionDropdown={onCloseActionDropdown}
          onSelectBulkAction={onSelectBulkAction}
        />

        <TableBody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-16 text-center text-xs text-neutral-400 font-medium"
              >
                No inventory items found matching your filters.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <InventoryTableRow
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onToggleSelect={onToggleSelectOne}
                onViewHistory={onViewHistory}
                onViewLocation={onViewLocation}
              />
            ))
          )}
        </TableBody>

        {items.length > 0 && <InventoryTableFooter items={items} />}
      </Table>
    </div>
  );
};

export default InventoryTable;
