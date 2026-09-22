"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
  LayoutGrid,
  Sparkles,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PortalTopbar: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const [profileOpen, setProfileOpen] = useState(false);

  // Derive dynamic page title from pathname
  const getPageTitle = (): string => {
    if (pathname.includes("/apps")) return "Apps";
    if (pathname.includes("/chat")) return "Chat";
    if (pathname.includes("/report")) return "Report";
    if (pathname.includes("/settings") || pathname.includes("/setting"))
      return "Setting";
    return "Home";
  };

  const pageTitle = getPageTitle();

  return (
    <header className="h-14 sm:h-15 w-full border-b border-neutral-200/80 bg-white px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
      {/* ── Left: Grid Icon + Page Title ── */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex items-center justify-center text-neutral-800">
          <LayoutGrid className="size-5" />
        </div>
        <h1 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900">
          {pageTitle}
        </h1>
      </div>

      {/* ── Right: Ask AI + Bell Notification + Sophia Profile ── */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Ask AI Pill */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-neutral-200/90 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors cursor-pointer shadow-2xs"
        >
          <span className="italic font-serif text-[11px] sm:text-xs text-neutral-600">
            Ask Ai
          </span>
          <span className="size-4.5 rounded-full bg-linear-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center text-white shadow-2xs">
            <Sparkles className="size-2.5" />
          </span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-1.5 right-1.5 size-1.5 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-neutral-200/80 bg-white hover:bg-neutral-50 transition-colors cursor-pointer shadow-2xs"
          >
            <div className="size-6 sm:size-7 rounded-full overflow-hidden relative border border-neutral-100 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Sophia"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-neutral-800 hidden sm:inline">
              Sophia
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 text-neutral-500 transition-transform duration-150",
                profileOpen && "rotate-180"
              )}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-bold text-neutral-900">
                    Sophia Miller
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    sophia@example.com
                  </p>
                </div>
                <Link
                  href={`/${locale}/settings`}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <User className="size-3.5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href={`/${locale}/settings`}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <Settings className="size-3.5" />
                  <span>Settings</span>
                </Link>
                <div className="my-1 border-t border-neutral-100" />
                <Link
                  href={`/${locale}/signin`}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
