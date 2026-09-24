"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LayoutGrid, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import aiIcon from "@/public/icons/omona-ai.png";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

export interface NavDropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface PrimaryNavItem {
  label: string;
  href?: string;
  dropdownItems?: NavDropdownItem[];
  isActive?: boolean;
  onClick?: () => void;
}

export interface PrimaryNavbarProps {
  title: string;
  icon?: React.ReactNode;
  navItems?: PrimaryNavItem[];
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export const PrimaryNavbar: React.FC<PrimaryNavbarProps> = ({
  title,
  icon,
  navItems,
  leftContent,
  rightContent,
  className,
}) => {
  const locale = useLocale();
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setActiveDropdownIndex((prev) => (prev === index ? null : index));
  };

  const closeAllDropdowns = () => {
    setActiveDropdownIndex(null);
    setProfileOpen(false);
  };

  return (
    <header
      className={cn(
        "h-14 sm:h-15 w-full border-b border-neutral-200/80 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 select-none",
        className
      )}
    >
      {/* ── Left Section: Icon + Title + Nav Items / Links ── */}
      <div className="flex items-center gap-4 sm:gap-6 min-w-0">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {icon !== undefined ? (
            <>
              <div className="flex items-center justify-center text-neutral-800">
                {icon}
              </div>
              <Link
                href={`/${locale}`}
                className="hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span className="text-base sm:text-[17px] font-bold tracking-tight text-neutral-900">
                  {title}
                </span>
              </Link>
            </>
          ) : (
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 sm:gap-2.5 hover:opacity-75 transition-opacity cursor-pointer"
            >
              <div className="flex items-center justify-center text-neutral-800">
                <LayoutGrid className="size-4.5 sm:size-5" />
              </div>
              <span className="text-base sm:text-[17px] font-bold tracking-tight text-neutral-900">
                {title}
              </span>
            </Link>
          )}
        </div>

        {/* Custom Left Content (if provided) */}
        {leftContent}

        {/* Standard Navigation Items */}
        {navItems && navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs text-neutral-600">
            {navItems.map((item, idx) => {
              const hasDropdown = Boolean(
                item.dropdownItems && item.dropdownItems.length > 0
              );
              const isDropdownOpen = activeDropdownIndex === idx;

              if (hasDropdown) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(idx)}
                      className={cn(
                        "flex items-center gap-1 hover:text-neutral-900 transition-colors font-medium cursor-pointer py-1",
                        (item.isActive || isDropdownOpen) &&
                          "text-neutral-900 font-semibold"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3 text-neutral-400 transition-transform duration-150",
                          isDropdownOpen && "rotate-180 text-neutral-800"
                        )}
                      />
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={closeAllDropdowns}
                        />
                        <div className="absolute left-0 top-full mt-1.5 w-44 rounded-xl border border-neutral-200 bg-white py-1.5 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          {item.dropdownItems?.map((sub) => {
                            const SubIcon = sub.icon;
                            if (sub.href) {
                              return (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={closeAllDropdowns}
                                  className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                >
                                  {SubIcon && (
                                    <SubIcon className="size-3.5 text-neutral-400" />
                                  )}
                                  <span>{sub.label}</span>
                                </Link>
                              );
                            }
                            return (
                              <button
                                key={sub.label}
                                type="button"
                                onClick={() => {
                                  sub.onClick?.();
                                  closeAllDropdowns();
                                }}
                                className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer"
                              >
                                {SubIcon && (
                                  <SubIcon className="size-3.5 text-neutral-400" />
                                )}
                                <span>{sub.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "hover:text-neutral-900 transition-colors font-medium py-1",
                      item.isActive && "text-neutral-900 font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className={cn(
                    "hover:text-neutral-900 transition-colors font-medium cursor-pointer py-1",
                    item.isActive && "text-neutral-900 font-semibold"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* ── Right Section: Extra Actions + Ask AI + Bell + Sophia Profile ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Custom Right Content (if provided) */}
        {rightContent}

        {/* Ask AI Pill */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-neutral-200/90 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors cursor-pointer shadow-2xs"
        >
          <span className="italic font-serif text-[11px] sm:text-xs text-neutral-600">
            Ask Ai
          </span>
          <Image src={aiIcon} alt="AI Icon" width={20} height={20} />
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
          <ProfileDropdownMenu
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};
