"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  LayoutGrid,
  ChevronDown,
  Bell,
  Sparkles,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CustomerTopbar: React.FC = () => {
  const locale = useLocale();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((curr) => (curr === menuName ? null : menuName));
  };

  return (
    <header className="h-14 w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: 4-dot Grid Icon + "Contact" Title + Navigation Links */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-4.5 text-neutral-800" />
          <h1 className="text-base font-semibold text-neutral-900 tracking-tight">
            Contact
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-xs font-normal text-neutral-600">
          <Link
            href={`/${locale}/apps`}
            className="hover:text-neutral-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href={`/${locale}/customer`}
            className="hover:text-neutral-900 transition-colors"
          >
            Category
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("setup")}
              className={cn(
                "flex items-center gap-1 hover:text-neutral-900 transition-colors cursor-pointer",
                activeMenu === "setup" && "text-neutral-900 font-medium"
              )}
            >
              <span>Setup</span>
              <ChevronDown className="size-3 text-neutral-500" />
            </button>
            {activeMenu === "setup" && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    <Settings className="size-3.5 text-neutral-500" />
                    <span>Customer Settings</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Right: Ask AI + Bell + Sophia Profile Avatar */}
      <div className="flex items-center gap-3">
        {/* Ask AI Pill */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200/90 bg-white hover:bg-neutral-50 text-xs font-normal text-neutral-700 transition-colors cursor-pointer shadow-2xs"
        >
          <span className="italic font-serif text-[11.5px] text-neutral-600">
            Ask Ai
          </span>
          <span className="size-3.5 rounded-full bg-linear-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center text-white">
            <Sparkles className="size-2" />
          </span>
        </button>

        {/* Bell Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
        >
          <Bell className="size-4 text-neutral-600" />
          <span className="absolute top-1 right-1 size-1.5 bg-rose-500 rounded-full" />
        </button>

        {/* Sophia Profile Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="size-6.5 rounded-full overflow-hidden relative border border-neutral-200">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Sophia"
                fill
                sizes="26px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-neutral-800 hidden sm:inline">
              Sophia
            </span>
            <ChevronDown className="size-3 text-neutral-500" />
          </button>

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
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                >
                  <User className="size-3.5" />
                  <span>Profile</span>
                </button>
                <div className="border-t border-neutral-100 my-1" />
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer text-left"
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerTopbar;
