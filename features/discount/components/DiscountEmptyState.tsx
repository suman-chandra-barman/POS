"use client";

import React from "react";
import { Settings } from "lucide-react";
import { GiftIllustration } from "./GiftIllustration";

interface DiscountEmptyStateProps {
  onCreateOffer: () => void;
}

export const DiscountEmptyState: React.FC<DiscountEmptyStateProps> = ({
  onCreateOffer,
}) => {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-[#dcdfe4] border border-neutral-300/40 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden select-none">
      {/* Left Text & Action */}
      <div className="flex flex-col items-start max-w-md">
        <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
          There is no offer history
        </h3>
        <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed font-normal">
          You can create your multiple offer like
          <br />
          Discount, Buy X - Get X, Coupon, Loyalty Offer
        </p>

        <button
          type="button"
          onClick={onCreateOffer}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#232323] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
        >
          <Settings className="size-3.5 stroke-[2]" />
          <span>Create Offer</span>
        </button>
      </div>

      {/* Right Gift Artwork */}
      <div className="shrink-0 flex items-center justify-center">
        <GiftIllustration />
      </div>
    </div>
  );
};
