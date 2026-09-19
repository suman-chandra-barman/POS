"use client";

import React from "react";
import { Search, User, Lock, Menu, Plus } from "lucide-react";
import { PosUser, PosBranch } from "../types/pos.types";

interface PosTerminalHeaderProps {
  currentBranch?: PosBranch | null;
  currentUser?: PosUser | null;
  orderNumber: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLock: () => void;
  onNewTicket?: () => void;
  onOpenMenu?: () => void;
  onOpenReport?: () => void;
}

export const PosTerminalHeader: React.FC<PosTerminalHeaderProps> = ({
  currentBranch,
  currentUser,
  orderNumber,
  searchQuery,
  onSearchChange,
  onLock,
  onNewTicket,
  onOpenMenu,
  onOpenReport,
}) => {
  return (
    <header className="h-14 w-full bg-white border-b border-neutral-200/80 px-4 flex items-center justify-between gap-4 select-none shrink-0">
      {/* Left side: Tabs and Order Pill */}
      <div className="flex items-center gap-2">
        {/* Sale Pill (Active) */}
        <button
          type="button"
          className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold shadow-2xs cursor-pointer"
        >
          Sale
        </button>

        {/* Report Pill */}
        <button
          type="button"
          onClick={onOpenReport}
          className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 text-xs font-medium transition-colors cursor-pointer"
        >
          Report
        </button>

        {/* New Order (+) */}
        <button
          type="button"
          onClick={onNewTicket}
          aria-label="New order tab"
          className="size-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
        </button>

        {/* Order ID Pill */}
        <div className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-mono font-medium">
          {orderNumber}
        </div>

        {currentBranch && (
          <span className="hidden xl:inline-block text-[11px] font-medium text-neutral-400 ml-2">
            ({currentBranch.name})
          </span>
        )}
      </div>

      {/* Middle: Search Products Input */}
      <div className="flex-1 max-w-sm mx-2">
        <div className="relative w-full">
          <Search className="size-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8.5 pl-8.5 pr-3 rounded-lg border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Right side: Cashier Profile, Lock, Menu */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Cashier Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
          <div className="size-6 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700">
            <User className="size-3.5" />
          </div>
          {currentUser && (
            <span className="hidden md:inline text-xs font-medium text-neutral-700">
              {currentUser.name}
            </span>
          )}
        </div>

        {/* Lock Terminal Button (Returns to Image 2) */}
        <button
          type="button"
          onClick={onLock}
          title="Lock Terminal"
          aria-label="Lock POS"
          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <Lock className="size-4.5" />
        </button>

        {/* Hamburger Menu */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Menu"
          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <Menu className="size-4.5" />
        </button>
      </div>
    </header>
  );
};
