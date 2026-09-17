"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import { InventoryItem } from "../types/inventory.types";

interface InventoryLocationDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InventoryLocationDialog: React.FC<InventoryLocationDialogProps> = ({
  item,
  open,
  onOpenChange,
}) => {
  if (!item) return null;

  const locationBreakdown = [
    {
      branch: "South Banasree",
      quantity: item.location === "South Banasree" ? item.stock : 80,
      shelf: "Aisle 3 - Shelf B2",
    },
    {
      branch: "Banabith Branch",
      quantity: item.location === "Banabith Branch" ? item.stock : 140,
      shelf: "Aisle 1 - Shelf D4",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-neutral-900">
            <MapPin className="size-4 text-[#0095FF]" />
            Location & Stock Distribution
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            {item.name} ({item.barcode})
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col space-y-2.5">
          {locationBreakdown.map((loc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50/80 border border-neutral-100 text-xs"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-800">
                  {loc.branch}
                </span>
                <span className="text-[11px] text-neutral-400">{loc.shelf}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-neutral-900">
                  {loc.quantity} {item.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryLocationDialog;
