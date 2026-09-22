"use client";

import React from "react";
import { useLocale } from "next-intl";
import { BarChart3, Settings, FileSpreadsheet, Package } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

export const InventoryTopbar: React.FC = () => {
  const locale = useLocale();

  return (
    <PrimaryNavbar
      title="Inventory"
      navItems={[
        { label: "Home", href: `/${locale}/apps` },
        {
          label: "Operations",
          dropdownItems: [
            {
              label: "Transfers",
              href: `/${locale}/inventory`,
              icon: Package,
            },
            {
              label: "Adjustments",
              href: `/${locale}/inventory`,
              icon: FileSpreadsheet,
            },
          ],
        },
        {
          label: "Report",
          dropdownItems: [
            {
              label: "Stock Valuation",
              href: `/${locale}/inventory`,
              icon: BarChart3,
            },
            {
              label: "Stock Movement",
              href: `/${locale}/inventory`,
              icon: BarChart3,
            },
          ],
        },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "Warehouse Settings",
              href: `/${locale}/inventory`,
              icon: Settings,
            },
          ],
        },
      ]}
    />
  );
};
