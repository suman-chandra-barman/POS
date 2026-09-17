"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InventoryItem } from "../types/inventory.types";

interface InventoryHistoryDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InventoryHistoryDialog: React.FC<InventoryHistoryDialogProps> = ({
  item,
  open,
  onOpenChange,
}) => {
  if (!item) return null;

  const mockLogs = [
    {
      id: "log-1",
      date: "Today, 02:45 PM",
      action: "Stock Adjusted",
      details: "+50 pcs added via Purchase Order #PO-8831",
      user: "Admin",
    },
    {
      id: "log-2",
      date: "Yesterday, 11:20 AM",
      action: "POS Sale",
      details: "-2 pcs sold at Banabith Branch",
      user: "Cashier 01",
    },
    {
      id: "log-3",
      date: "14 Sep, 2026",
      action: "Transfer",
      details: "Transferred 30 pcs from Main Warehouse to South Banasree",
      user: "Manager",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-neutral-900">
            Stock Movement History
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            {item.name} ({item.barcode})
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col space-y-3">
          {mockLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-1 p-3 rounded-xl bg-neutral-50/80 border border-neutral-100 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-800">
                  {log.action}
                </span>
                <span className="text-[11px] text-neutral-400">{log.date}</span>
              </div>
              <p className="text-neutral-600 font-normal">{log.details}</p>
              <span className="text-[10px] text-neutral-400 font-medium">
                By: {log.user}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryHistoryDialog;
