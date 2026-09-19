"use client";

import React from "react";
import { Delete } from "lucide-react";
import { POS_KEYPAD_MODES, PosKeypadMode } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosKeypadProps {
  currentMode: PosKeypadMode;
  onModeChange: (mode: PosKeypadMode) => void;
  onDigitPress: (digit: string) => void;
  onToggleSign: () => void;
  onBackspace: () => void;
}

export const PosKeypad: React.FC<PosKeypadProps> = ({
  currentMode,
  onModeChange,
  onDigitPress,
  onToggleSign,
  onBackspace,
}) => {
  return (
    <div className="grid grid-cols-4 gap-1.5 p-2 bg-neutral-50/80 border-t border-neutral-200 select-none">
      {/* Row 1 */}
      <button
        type="button"
        onClick={() => onDigitPress("1")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        1
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("2")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        2
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("3")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        3
      </button>
      <button
        type="button"
        onClick={() => onModeChange(POS_KEYPAD_MODES.QTY)}
        className={cn(
          "h-11 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs",
          currentMode === POS_KEYPAD_MODES.QTY
            ? "bg-[#c8e3f8] text-[#0369a1] border-[#93c5fd]"
            : "bg-white text-neutral-700 border-neutral-200/80 hover:bg-neutral-100"
        )}
      >
        Qty
      </button>

      {/* Row 2 */}
      <button
        type="button"
        onClick={() => onDigitPress("4")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        4
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("5")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        5
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("6")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        6
      </button>
      <button
        type="button"
        onClick={() => onModeChange(POS_KEYPAD_MODES.DISCOUNT)}
        className={cn(
          "h-11 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs",
          currentMode === POS_KEYPAD_MODES.DISCOUNT
            ? "bg-[#c8e3f8] text-[#0369a1] border-[#93c5fd]"
            : "bg-white text-neutral-700 border-neutral-200/80 hover:bg-neutral-100"
        )}
      >
        %
      </button>

      {/* Row 3 */}
      <button
        type="button"
        onClick={() => onDigitPress("7")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        7
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("8")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        8
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("9")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        9
      </button>
      <button
        type="button"
        onClick={() => onModeChange(POS_KEYPAD_MODES.PRICE)}
        className={cn(
          "h-11 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs",
          currentMode === POS_KEYPAD_MODES.PRICE
            ? "bg-[#c8e3f8] text-[#0369a1] border-[#93c5fd]"
            : "bg-white text-neutral-700 border-neutral-200/80 hover:bg-neutral-100"
        )}
      >
        Price
      </button>

      {/* Row 4 */}
      <button
        type="button"
        onClick={onToggleSign}
        className="h-11 rounded-lg bg-[#fde68a] hover:bg-[#fcd34d] border border-[#fcd34d] text-sm font-bold text-neutral-900 shadow-2xs active:bg-[#f59e0b] transition-colors cursor-pointer flex items-center justify-center"
      >
        +/-
      </button>
      <button
        type="button"
        onClick={() => onDigitPress("0")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        0
      </button>
      <button
        type="button"
        onClick={() => onDigitPress(".")}
        className="h-11 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200/80 text-sm font-semibold text-neutral-800 shadow-2xs active:bg-neutral-200 transition-colors cursor-pointer"
      >
        .
      </button>
      <button
        type="button"
        onClick={onBackspace}
        aria-label="Delete"
        className="h-11 rounded-lg bg-[#fca5a5] hover:bg-[#f87171] border border-[#f87171] text-neutral-900 shadow-2xs active:bg-rose-400 transition-colors cursor-pointer flex items-center justify-center"
      >
        <Delete className="size-4.5 stroke-[2]" />
      </button>
    </div>
  );
};
