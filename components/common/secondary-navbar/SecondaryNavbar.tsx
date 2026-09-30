"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SecondaryNavbarProps {
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const SecondaryNavbar: React.FC<SecondaryNavbarProps> = ({
  leftSlot,
  centerSlot,
  rightSlot,
  children,
  className,
}) => {
  return (
    <nav
      aria-label="Secondary navigation"
      className={cn(
        "w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 select-none min-h-13.5",
        className
      )}
    >
      {/* ── Left Action Slot (Buttons, Stepper, Title, etc.) ── */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {leftSlot}
      </div>

      {/* ── Center Slot (Search Bar, Filter Pill, etc.) ── */}
      <div className="flex-1 flex justify-center max-w-md mx-2 sm:mx-4 min-w-0">
        {centerSlot}
      </div>

      {/* ── Right Slot (Pagination, View Switcher, Actions) ── */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {rightSlot}
      </div>

      {children}
    </nav>
  );
};

export default SecondaryNavbar;
