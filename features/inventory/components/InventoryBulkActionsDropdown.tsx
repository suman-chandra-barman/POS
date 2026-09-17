"use client";

import React, { useEffect, useRef } from "react";
import {
  Archive,
  Copy,
  Tag,
  FileUp,
  Pencil,
  Printer,
  ChevronUp,
} from "lucide-react";
import { BULK_ACTIONS, BulkActionType } from "../types/inventory.types";

interface InventoryBulkActionsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: BulkActionType) => void;
}

export const InventoryBulkActionsDropdown: React.FC<
  InventoryBulkActionsDropdownProps
> = ({ isOpen, onClose, onSelectAction }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions: { id: BulkActionType; label: string; icon: React.ElementType }[] = [
    { id: BULK_ACTIONS.ARCHIVE, label: "Archive", icon: Archive },
    { id: BULK_ACTIONS.DUPLICATE, label: "Duplicate", icon: Copy },
    { id: BULK_ACTIONS.COLLECTION, label: "Collection", icon: Tag },
    { id: BULK_ACTIONS.EXPORT_PDF, label: "Export PDF", icon: FileUp },
    { id: BULK_ACTIONS.EDIT_PRODUCT, label: "Edit Product", icon: Pencil },
    { id: BULK_ACTIONS.PRINT_LABEL, label: "Print Label", icon: Printer },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1.5 w-48 rounded-xl bg-white border border-neutral-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.05)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Dropdown Header */}
      <button
        type="button"
        onClick={onClose}
        className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-neutral-800 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer"
      >
        <span>Select Action</span>
        <ChevronUp className="size-3.5 text-neutral-500" />
      </button>

      {/* Action items */}
      <div className="py-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => {
                onSelectAction(act.id);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <Icon className="size-3.5 text-neutral-500 stroke-[1.7]" />
              <span className="font-normal">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryBulkActionsDropdown;
