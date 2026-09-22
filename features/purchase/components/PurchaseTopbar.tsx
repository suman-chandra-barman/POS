"use client";

import React from "react";
import { useLocale } from "next-intl";
import { FileSpreadsheet, BarChart3, Settings, ChevronLeft } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

interface PurchaseTopbarProps {
  onBack?: () => void;
}

export const PurchaseTopbar: React.FC<PurchaseTopbarProps> = ({ onBack }) => {
  const locale = useLocale();

  return (
    <PrimaryNavbar
      title="Purchase"
      icon={
        onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft className="size-5 text-neutral-900" />
          </button>
        ) : undefined
      }
      navItems={[
        {
          label: "Options",
          dropdownItems: [
            {
              label: "Import Orders",
              href: `/${locale}/purchase`,
              icon: FileSpreadsheet,
            },
            {
              label: "Export All",
              href: `/${locale}/purchase`,
              icon: BarChart3,
            },
          ],
        },
        {
          label: "Report",
          dropdownItems: [
            {
              label: "Purchase Summary",
              href: `/${locale}/purchase`,
            },
            {
              label: "Vendor Performance",
              href: `/${locale}/purchase`,
            },
          ],
        },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "Vendors & Terms",
              href: `/${locale}/purchase`,
              icon: Settings,
            },
          ],
        },
      ]}
    />
  );
};
