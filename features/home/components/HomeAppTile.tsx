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
  MessageSquare,
  Globe,
  BookUser,
  BadgePercent,
  FileSearch,
  Star,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type HomeAppItem } from "../data/homeAppsData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  FileSpreadsheet,
  Warehouse,
  Calculator,
  Tag,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  Globe,
  BookUser,
  BadgePercent,
  FileSearch,
};

interface HomeAppTileProps {
  app: HomeAppItem;
  onClick?: (app: HomeAppItem) => void;
  onToggleMark?: (appId: string, e: React.MouseEvent) => void;
}

export const HomeAppTile: React.FC<HomeAppTileProps> = ({
  app,
  onClick,
  onToggleMark,
}) => {
  const IconComponent = ICON_MAP[app.iconName] || Layers;

  return (
    <div
      onClick={() => onClick?.(app)}
      className="group relative flex flex-col items-center justify-center size-24 sm:size-28 rounded-2xl bg-white p-2.5 shadow-[0_4px_18px_-2px_rgba(0,0,0,0.06)] border border-neutral-100/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] cursor-pointer select-none"
    >
      {/* Star Indicator on top right */}
      {app.isMarked && (
        <button
          type="button"
          onClick={(e) => onToggleMark?.(app.id, e)}
          title="Unmark app"
          className="absolute top-2 right-2 text-neutral-800 hover:text-neutral-950 transition-colors p-0.5"
        >
          <Star className="size-3 fill-neutral-800 stroke-neutral-800" />
        </button>
      )}

      {app.hasStarOutline && !app.isMarked && (
        <button
          type="button"
          onClick={(e) => onToggleMark?.(app.id, e)}
          title="Mark app"
          className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 transition-colors p-0.5"
        >
          <Star className="size-3 stroke-neutral-400 fill-none" />
        </button>
      )}

      {/* App Icon Square */}
      <div
        className={cn(
          "flex size-11 sm:size-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105",
          app.bgClass
        )}
      >
        <IconComponent className="size-5 sm:size-6 stroke-[1.8]" />
      </div>

      {/* App Name */}
      <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-neutral-800 tracking-tight text-center truncate max-w-[90%]">
        {app.name}
      </span>
    </div>
  );
};
