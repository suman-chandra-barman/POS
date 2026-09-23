"use client";

import React from "react";
import { Folder } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

export const DiscountTopbar: React.FC = () => {
  return (
    <PrimaryNavbar
      title="Discount"
      leftContent={
        <div className="hidden md:flex items-center gap-4 lg:gap-5 text-xs text-neutral-600 pl-2">
          {["Breadcrumb", "Breadcrumb", "Breadcrumb", "Breadcrumb"].map(
            (b, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer select-none transition-colors"
              >
                <span>{b}</span>
                <Folder className="size-3 text-neutral-400 stroke-[1.8]" />
              </div>
            )
          )}
        </div>
      }
    />
  );
};
