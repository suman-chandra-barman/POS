"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type BottomNavItemConfig } from "../types/navigation.types";

interface BottomNavItemProps {
  item: BottomNavItemConfig;
  isActive: boolean;
  locale: string;
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  item,
  isActive,
  locale,
}) => {
  const IconComponent = item.icon;

  return (
    <Link
      href={item.href(locale)}
      className={cn(
        "group flex flex-col items-center gap-1 transition-all duration-150 select-none",
        isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
      )}
    >
      {/* Icon Container with active blue outline border */}
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-xl transition-all duration-150",
          isActive
            ? "border-2 border-[#0095FF] bg-sky-50/50 text-[#0095FF] shadow-xs"
            : "border-2 border-transparent text-neutral-500 group-hover:bg-neutral-100/70 group-hover:text-neutral-700"
        )}
      >
        <IconComponent
          className={cn(
            "size-5 transition-transform duration-150 group-hover:scale-105",
            isActive ? "stroke-[2.25]" : "stroke-[1.75]"
          )}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-[11px] tracking-tight transition-colors",
          isActive
            ? "font-semibold text-neutral-900"
            : "font-normal text-neutral-500 group-hover:text-neutral-700"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
};
