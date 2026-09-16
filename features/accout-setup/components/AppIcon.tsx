"use client";

import React from "react";
import {
  ShoppingBag,
  Coins,
  RefreshCw,
  Calculator,
  FileText,
  Files,
  MessageSquare,
  Tag,
  Package,
  Hammer,
  Receipt,
  Send,
  Compass,
  Mail,
  User,
  Users,
  Contact,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag,
  Coins,
  RefreshCw,
  Calculator,
  FileText,
  Files,
  MessageSquare,
  Tag,
  Package,
  Hammer,
  Receipt,
  Send,
  Compass,
  Mail,
  User,
  Users,
  Contact,
};

interface AppIconProps {
  iconName: string;
  bgClass: string;
  className?: string;
  size?: "sm" | "md";
}

export const AppIcon: React.FC<AppIconProps> = ({
  iconName,
  bgClass,
  className,
  size = "md",
}) => {
  const IconComponent = ICON_MAP[iconName] || Package;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        bgClass,
        size === "sm" ? "size-6.5 rounded-lg" : "size-8.5 rounded-xl",
        className
      )}
    >
      <IconComponent
        className={cn(size === "sm" ? "size-3.5" : "size-4.5")}
        strokeWidth={2}
      />
    </div>
  );
};
