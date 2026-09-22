"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { PrimaryNavbar } from "./PrimaryNavbar";

export const PortalTopbar: React.FC = () => {
  const pathname = usePathname();

  // Derive dynamic page title from pathname
  const getPageTitle = (): string => {
    if (pathname.includes("/apps")) return "Apps";
    if (pathname.includes("/chat")) return "Chat";
    if (pathname.includes("/report")) return "Report";
    if (pathname.includes("/settings") || pathname.includes("/setting"))
      return "Setting";
    return "Home";
  };

  return <PrimaryNavbar title={getPageTitle()} />;
};
