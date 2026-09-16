import {
  House,
  LayoutGrid,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { type BottomNavItemConfig } from "../types/navigation.types";

export const BOTTOM_NAV_ITEMS: BottomNavItemConfig[] = [
  {
    key: "home",
    label: "Home",
    href: (locale) => `/${locale}`,
    icon: House,
    matches: (pathname, locale) =>
      pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/",
  },
  {
    key: "apps",
    label: "Apps",
    href: (locale) => `/${locale}/apps`,
    icon: LayoutGrid,
    matches: (pathname, locale) => pathname.startsWith(`/${locale}/apps`),
  },
  {
    key: "chat",
    label: "Chat",
    href: (locale) => `/${locale}/chat`,
    icon: MessageSquare,
    matches: (pathname, locale) => pathname.startsWith(`/${locale}/chat`),
  },
  {
    key: "report",
    label: "Report",
    href: (locale) => `/${locale}/report`,
    icon: BarChart3,
    matches: (pathname, locale) => pathname.startsWith(`/${locale}/report`),
  },
  {
    key: "setting",
    label: "Setting",
    href: (locale) => `/${locale}/settings`,
    icon: Settings,
    matches: (pathname, locale) =>
      pathname.startsWith(`/${locale}/settings`) ||
      pathname.startsWith(`/${locale}/setting`),
  },
];
