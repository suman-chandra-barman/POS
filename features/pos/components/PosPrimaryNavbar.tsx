"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  ChevronLeft,
  ChevronDown,
  Bell,
  Sparkles,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PosPrimaryNavbarProps {
  onBack?: () => void;
}

export const PosPrimaryNavbar: React.FC<PosPrimaryNavbarProps> = ({ onBack }) => {
  const router = useRouter();
  const locale = useLocale();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((curr) => (curr === menuName ? null : menuName));
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push(`/${locale}/apps`);
    }
  };

  return (
    <header className="h-14 w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left section: Back button + Title & Menus */}
      <div className="flex items-center gap-5 sm:gap-7">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 text-base font-bold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-5 text-neutral-900 stroke-[2.5]" />
          <span>POS</span>
        </button>

        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {/* Home Link */}
          <button
            type="button"
            onClick={() => router.push(`/${locale}`)}
            className="px-2.5 py-1.5 text-xs font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Home
          </button>

          {/* Order Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("order")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer",
                activeMenu === "order" && "bg-neutral-100 text-neutral-900"
              )}
            >
              <span>Order</span>
              <ChevronDown className="size-3.5 text-neutral-500" />
            </button>
            {activeMenu === "order" && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in duration-100">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    All Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    Draft Orders
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Report Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("report")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer",
                activeMenu === "report" && "bg-neutral-100 text-neutral-900"
              )}
            >
              <span>Report</span>
              <ChevronDown className="size-3.5 text-neutral-500" />
            </button>
            {activeMenu === "report" && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in duration-100">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    Sales Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    Register Sessions
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Setup Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("setup")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer",
                activeMenu === "setup" && "bg-neutral-100 text-neutral-900"
              )}
            >
              <span>Setup</span>
              <ChevronDown className="size-3.5 text-neutral-500" />
            </button>
            {activeMenu === "setup" && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in duration-100">
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    POS Terminals
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMenu(null)}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
                  >
                    Payment Methods
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Right section: Ask AI + Bell + Sophia Avatar (Matching Image 1) */}
      <div className="flex items-center gap-3">
        {/* Ask AI Pill */}
        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100 text-xs font-medium text-neutral-700 transition-colors cursor-pointer shadow-2xs"
        >
          <span className="italic font-serif text-[11px] text-neutral-600">
            Ask Ai
          </span>
          <span className="size-4 rounded-full bg-linear-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center text-white">
            <Sparkles className="size-2.5" />
          </span>
        </button>

        {/* Bell Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-1 right-1 size-1.5 bg-rose-500 rounded-full" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="size-7 rounded-full overflow-hidden relative border border-neutral-200">
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
            <ChevronDown className="size-3.5 text-neutral-500" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50">
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-900">
                    Sophia Rahman
                  </p>
                  <p className="text-[11px] text-neutral-500">Store Manager</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  <User className="size-3.5 text-neutral-500" />
                  <span>Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  <Settings className="size-3.5 text-neutral-500" />
                  <span>Settings</span>
                </button>
                <div className="my-1 border-t border-neutral-100" />
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <LogOut className="size-3.5 text-rose-500" />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
