"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { PosBranch } from "../types/pos.types";

interface PosUnlockViewProps {
  branch?: PosBranch | null;
  onBack: () => void;
  onUnlockClick: () => void;
}

export const PosUnlockView: React.FC<PosUnlockViewProps> = ({
  branch,
  onBack,
  onUnlockClick,
}) => {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#f8f9fb] px-4">
      {/* Back button & Branch info top left */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/80 px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-4" />
          <span>Back to Branches</span>
        </button>
        {branch && (
          <span className="text-xs font-medium text-neutral-400">
            / {branch.name}
          </span>
        )}
      </div>

      {/* Centered Unlock Card (Image 2) */}
      <button
        type="button"
        onClick={onUnlockClick}
        className="group bg-white rounded-2xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.1)] transition-all transform hover:-translate-y-0.5 size-44 sm:size-48 p-6 flex flex-col items-center justify-center cursor-pointer select-none"
      >
        {/* Unlocked Padlock Illustration */}
        <div className="relative mb-3 flex items-center justify-center">
          <svg
            className="w-14 h-14 transition-transform group-hover:scale-105"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shackle (open position) */}
            <path
              d="M32 14C32 8.47715 36.4772 4 42 4C47.5228 4 52 8.47715 52 14V24"
              stroke="#1e3a8a"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Sparkle lines */}
            <path
              d="M56 12L60 10"
              stroke="#1e3a8a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M58 18L62 19"
              stroke="#1e3a8a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Lock Body */}
            <rect
              x="12"
              y="24"
              width="40"
              height="36"
              rx="8"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="3.5"
            />
            {/* Keyhole */}
            <circle cx="32" cy="38" r="4" fill="#0c4a6e" />
            <path
              d="M30.5 40L29.5 50H34.5L33.5 40H30.5Z"
              fill="#0c4a6e"
            />
          </svg>
        </div>

        {/* Action Label */}
        <span className="text-xs font-semibold text-neutral-800 tracking-tight group-hover:text-[#0284c7] transition-colors">
          Continue to Unlock
        </span>
      </button>
    </div>
  );
};
