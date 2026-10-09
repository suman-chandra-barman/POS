"use client";

import React from "react";
import { useLocale } from "next-intl";
import {
  ChevronLeft,
  Receipt,
  FileText,
  BarChart3,
  Calendar,
  Monitor,
  CreditCard,
} from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";
import { cn } from "@/lib/utils";

export interface PosPrimaryNavbarProps {
  title?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
  className?: string;
}

export const PosPrimaryNavbar: React.FC<PosPrimaryNavbarProps> = ({
  title = "POS",
  icon,
  onBack,
  className,
}) => {
  const locale = useLocale();

  const resolvedIcon =
    icon !== undefined ? (
      icon
    ) : onBack ? (
      <button
        type="button"
        onClick={onBack}
        className="hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
        aria-label="Back"
      >
        <ChevronLeft className="size-5 text-neutral-900" />
      </button>
    ) : undefined;

  return (
    <PrimaryNavbar
      title={title}
      icon={resolvedIcon}
      className={cn("border-b border-neutral-200/80", className)}
      navItems={[
        { label: "Home", href: `/${locale}/pos` },
        {
          label: "Order",
          dropdownItems: [
            {
              label: "All Orders",
              href: `/${locale}/pos`,
              icon: Receipt,
            },
            {
              label: "Draft Orders",
              href: `/${locale}/pos`,
              icon: FileText,
            },
          ],
        },
        {
          label: "Report",
          dropdownItems: [
            {
              label: "Sales Report",
              href: `/${locale}/pos`,
              icon: BarChart3,
            },
            {
              label: "Register Sessions",
              href: `/${locale}/pos`,
              icon: Calendar,
            },
          ],
        },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "POS Terminals",
              href: `/${locale}/pos`,
              icon: Monitor,
            },
            {
              label: "Payment Methods",
              href: `/${locale}/pos`,
              icon: CreditCard,
            },
          ],
        },
      ]}
    />
  );
};

