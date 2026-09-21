"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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
      <DialogContent className="sm:max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200/90 [&>button:last-child]:hidden select-none">
        {/* Title */}
        <DialogHeader className="pb-1">
          <DialogTitle className="text-lg font-bold text-neutral-900 tracking-tight text-left">
            Coupon
          </DialogTitle>
        </DialogHeader>

        {/* Input field */}
        <div className="py-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code..."
            className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white text-center text-sm font-bold uppercase tracking-wider text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal placeholder:capitalize focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Available Promos List */}
        <div className="space-y-2 py-1">
          <span className="text-xs font-semibold text-neutral-500 tracking-wider">
            Available Promos
          </span>
          <div className="space-y-1.5">
            {AVAILABLE_COUPONS.map((promo) => {
              const isSelected = couponCode === promo.code;
              return (
                <div
                  key={promo.code}
                  onClick={() => setCouponCode(promo.code)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                    isSelected
                      ? "border-sky-500 bg-sky-50/50 shadow-2xs"
                      : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                  )}
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-neutral-900">
                      {promo.code}
                    </span>
                    <p className="text-xs text-neutral-500">{promo.label}</p>
                  </div>
                  <span
                    className={cn(
                      "size-6 rounded-lg flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-[#0284c7] text-white"
                        : "bg-neutral-100 text-neutral-400"
                    )}
                  >
                    <Check className="size-3.5" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleApply()}
            className="flex-1 h-11 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PosCouponDialog;
