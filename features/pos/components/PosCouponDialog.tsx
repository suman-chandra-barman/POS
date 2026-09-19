"use client";

import React, { useState } from "react";
import { Ticket, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PosCouponDialogProps {
  isOpen: boolean;
  onApplyCoupon: (code: string, discountPercent: number) => void;
  onClose: () => void;
}

const AVAILABLE_COUPONS = [
  { code: "SAVE10", discount: 10, label: "10% Off Entire Order" },
  { code: "WELCOME20", discount: 20, label: "20% Off Welcome Voucher" },
  { code: "VIP25", discount: 25, label: "25% VIP Club Voucher" },
];

export const PosCouponDialog: React.FC<PosCouponDialogProps> = ({
  isOpen,
  onApplyCoupon,
  onClose,
}) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    const matched = AVAILABLE_COUPONS.find((c) => c.code === code);
    if (matched) {
      onApplyCoupon(matched.code, matched.discount);
      toast.success(`Coupon "${matched.code}" applied: ${matched.discount}% off!`);
      onClose();
    } else {
      // Allow custom voucher code with default 10%
      onApplyCoupon(code, 10);
      toast.success(`Coupon "${code}" applied with 10% discount!`);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-neutral-200">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60">
              <Ticket className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-neutral-900">
                Apply Coupon / Voucher
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-500">
                Enter a promotional code or pick an active promotion.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="e.g. SAVE10"
              className="flex-1 h-10 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm font-mono uppercase tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <Button
              type="button"
              onClick={() => handleApply()}
              className="h-10 px-4 rounded-xl bg-[#0080ff] hover:bg-[#0070e0] text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Apply
            </Button>
          </div>

          {/* Active Promo Codes */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              Available Promos
            </span>
            <div className="space-y-1.5">
              {AVAILABLE_COUPONS.map((promo) => (
                <div
                  key={promo.code}
                  onClick={() => handleApply(promo.code)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-neutral-900 group-hover:text-blue-600">
                      {promo.code}
                    </span>
                    <p className="text-[11px] text-neutral-500">{promo.label}</p>
                  </div>
                  <span className="size-6 rounded-lg bg-neutral-100 group-hover:bg-blue-600 group-hover:text-white text-neutral-600 flex items-center justify-center transition-colors">
                    <Check className="size-3.5" />
                  </span>
                </div>
              ))}
            </div>
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
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PosCouponDialog;
