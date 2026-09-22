"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { User, Settings, LogOut } from "lucide-react";

export interface ProfileDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

export const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  isOpen,
  onClose,
  userName = "Sophia Miller",
  userEmail = "sophia@example.com",
}) => {
  const locale = useLocale();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        <div className="px-3.5 py-2 border-b border-neutral-100 mb-1">
          <p className="text-xs font-bold text-neutral-900">{userName}</p>
          <p className="text-[11px] text-neutral-500 truncate">{userEmail}</p>
        </div>
        <Link
          href={`/${locale}/settings`}
          onClick={onClose}
          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer transition-colors"
        >
          <User className="size-3.5" />
          <span>Profile</span>
        </Link>
        <Link
          href={`/${locale}/settings`}
          onClick={onClose}
          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer transition-colors"
        >
          <Settings className="size-3.5" />
          <span>Settings</span>
        </Link>
        <div className="my-1 border-t border-neutral-100" />
        <Link
          href={`/${locale}/signin`}
          onClick={onClose}
          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
        >
          <LogOut className="size-3.5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
};
