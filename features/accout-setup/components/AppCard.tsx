"use client";

import React from "react";
import { X } from "lucide-react";
import { type BusinessApp } from "../data/appsData";
import { AppIcon } from "./AppIcon";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: BusinessApp;
  isSelected: boolean;
  onToggle: (appId: string) => void;
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  isSelected,
  onToggle,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(app.id)}
      className={cn(
        "group relative flex h-12 w-full max-w-44 sm:max-w-48 items-center gap-2.5 rounded-2xl border px-2.5 py-1.5 text-left transition-all cursor-pointer select-none active:scale-[0.98]",
        isSelected
          ? "border-sky-500 bg-white shadow-xs ring-1 ring-sky-500/20"
          : "border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100/60 hover:border-neutral-300",
        className
      )}
    >
      {/* App Icon */}
      <AppIcon iconName={app.iconName} bgClass={app.bgClass} size="md" />

      {/* App Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-semibold text-neutral-800 truncate leading-tight">
          {app.name}
        </span>
        {app.isDefaultFree && (
          <span className="text-[10px] text-neutral-400 font-normal leading-tight mt-0.5">
            Free
          </span>
        )}
      </div>

      {/* Top Right "X" Badge when selected */}
      {isSelected && (
        <span
          className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-[#1c1c1c] text-white shadow-xs transition-transform group-hover:scale-110"
          title="Remove app"
        >
          <X className="size-2.5" strokeWidth={3} />
        </span>
      )}
    </button>
  );
};
