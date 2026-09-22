"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Settings } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

export const ProductTopbar: React.FC = () => {
  const locale = useLocale();

  return (
    <PrimaryNavbar
      title="Product"
      navItems={[
        { label: "Home", href: `/${locale}/apps` },
        { label: "Category's", href: `/${locale}/product` },
        { label: "Vendor", href: `/${locale}/product` },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "Product Settings",
              href: `/${locale}/product`,
              icon: Settings,
            },
          ],
        },
      ]}
    />
  );
};
