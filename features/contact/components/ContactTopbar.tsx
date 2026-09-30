"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Settings } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

export const ContactTopbar: React.FC = () => {
  const locale = useLocale();

  return (
    <PrimaryNavbar
      title="Contact"
      navItems={[
        { label: "Home", href: `/${locale}/apps` },
        { label: "Category", href: `/${locale}/contact` },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "Contact Settings",
              href: `/${locale}/contact`,
              icon: Settings,
            },
          ],
        },
      ]}
    />
  );
};

export default ContactTopbar;
