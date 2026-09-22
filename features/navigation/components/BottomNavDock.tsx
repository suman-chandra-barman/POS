"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { BOTTOM_NAV_ITEMS } from "../data/navigationData";
import { BottomNavItem } from "./BottomNavItem";

export const BottomNavDock: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      aria-label="Main floating navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-4 sm:gap-6 rounded-3xl bg-white/95 px-5 py-2.5 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12)] border border-neutral-200/80 backdrop-blur-md">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <BottomNavItem
            key={item.key}
            item={item}
            isActive={item.matches(pathname, locale)}
            locale={locale}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavDock;
