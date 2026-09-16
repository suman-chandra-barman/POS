"use client";

import React from "react";
import {
  ShoppingBag,
  FileSpreadsheet,
  Warehouse,
  Calculator,
  Tag,
  Users,
  CreditCard,
  FileText,
  Globe,
  BookUser,
  BadgePercent,
  Database,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type DirectoryAppItem } from "../data/appsDirectoryData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  FileSpreadsheet,
  Warehouse,
  Calculator,
  Tag,
  Users,
  CreditCard,
  FileText,
  Globe,
  BookUser,
  BadgePercent,
  Database,
};

interface AppDirectoryCardProps {
  app: DirectoryAppItem;
  onToggleInstall?: (appId: string) => void;
  onViewDetails?: (app: DirectoryAppItem) => void;
}

export const AppDirectoryCard: React.FC<AppDirectoryCardProps> = ({
  app,
  onToggleInstall,
  onViewDetails,
}) => {
  const IconComponent = ICON_MAP[app.iconName] || Layers;

  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white p-3.5 border border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.08)] transition-all duration-200">
      {/* Top Section: Icon + Title + Pricing */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl shrink-0 transition-transform duration-200 group-hover:scale-105",
            app.bgClass
          )}
        >
          <IconComponent className="size-5 stroke-[1.9]" />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900 truncate">
            {app.name}
          </h3>
          <span className="text-[11px] font-medium text-neutral-400">
            {app.pricing}
          </span>
        </div>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="mt-4 flex items-center gap-2">
        {app.isInstalled ? (
          <button
            type="button"
            onClick={() => onToggleInstall?.(app.id)}
            className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50/80 px-2.5 py-1 text-center text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-colors cursor-pointer"
            title="Click to uninstall"
          >
            Installed
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onToggleInstall?.(app.id)}
            className="flex-1 rounded-lg bg-[#0095FF] px-2.5 py-1 text-center text-xs font-semibold text-white shadow-xs hover:bg-sky-600 transition-colors cursor-pointer"
          >
            Install
          </button>
        )}

        <button
          type="button"
          onClick={() => onViewDetails?.(app)}
          className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-center text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
};
