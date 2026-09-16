import React from "react";

export interface BottomNavItemConfig {
  key: string;
  label: string;
  href: (locale: string) => string;
  icon: React.ComponentType<{ className?: string }>;
  matches: (pathname: string, locale: string) => boolean;
}
