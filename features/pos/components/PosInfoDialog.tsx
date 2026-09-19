"use client";

import React from "react";
import { Info, Monitor, User, Clock, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PosInfoDialogProps {
  isOpen: boolean;
  orderNumber: string;
  itemCount: number;
  totalAmount: number;
  cashierName: string;
  onClose: () => void;
}

export const PosInfoDialog: React.FC<PosInfoDialogProps> = ({
  isOpen,
  orderNumber,
  itemCount,
  totalAmount,
  cashierName,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-neutral-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200/60">
              <Info className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Order & Register Info
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-500">
                Detailed register status and active session metadata.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2.5 py-2 divide-y divide-neutral-100 text-xs">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Monitor className="size-3.5 text-neutral-400" />
              Order Number
            </span>
            <span className="font-mono font-bold text-neutral-900">
              #{orderNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <User className="size-3.5 text-neutral-400" />
              Active Cashier
            </span>
            <span className="font-semibold text-neutral-900">
              {cashierName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <ShoppingCart className="size-3.5 text-neutral-400" />
              Total Items in Cart
            </span>
            <span className="font-semibold text-neutral-900">
              {itemCount} items
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Clock className="size-3.5 text-neutral-400" />
              Active Total Amount
            </span>
            <span className="font-bold text-neutral-900">
              {totalAmount.toLocaleString("en-US")} ৳
            </span>
          </div>
        </div>

        <DialogFooter className="pt-2 border-t border-neutral-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full text-xs cursor-pointer rounded-xl"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PosInfoDialog;
