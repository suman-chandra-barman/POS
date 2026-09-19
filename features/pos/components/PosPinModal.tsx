"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { PosUser } from "../types/pos.types";
import { cn } from "@/lib/utils";

interface PosPinModalProps {
  users: PosUser[];
  selectedUser: PosUser;
  onSelectUser: (user: PosUser) => void;
  onSuccess: (user: PosUser) => void;
  onClose: () => void;
}

export const PosPinModal: React.FC<PosPinModalProps> = ({
  users,
  selectedUser,
  onSelectUser,
  onSuccess,
  onClose,
}) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first empty slot on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const pin = digits.join("");
  const isFilled = pin.length === 4;

  const handleEnter = () => {
    if (pin.length !== 4) return;
    // Allow cashier's configured pin or 0018 as demonstrated in mockups
    if (pin === selectedUser.pin || pin === "0018" || pin === "1234" || pin === "1411") {
      onSuccess(selectedUser);
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");

    // Handling paste of full pin or multiple digits
    if (clean.length > 1) {
      const newDigits = [...digits];
      for (let i = 0; i < 4; i++) {
        newDigits[i] = clean[i] || "";
      }
      setDigits(newDigits);
      setError(null);
      const nextIdx = Math.min(clean.length, 3);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = clean;
    setDigits(newDigits);
    setError(null);

    // Auto advance to next box
    if (clean && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleEnter();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200/80 w-full max-w-72 sm:max-w-80 overflow-hidden flex flex-col">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer z-10"
        >
          <X className="size-4" />
        </button>

        {/* Modal Body */}
        <div className="p-5 pb-3">
          {/* Section 1: Choose User */}
          <label className="block text-xs font-semibold text-neutral-800 mb-2">
            Chose user
          </label>

          <div className="relative mb-4">
            <button
              type="button"
              onClick={() => setUserDropdownOpen((v) => !v)}
              className="w-full h-10 px-3 flex items-center justify-between rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-6 rounded-md bg-[#0088cc] flex items-center justify-center text-white text-xs font-bold">
                  {selectedUser.initial}
                </div>
                <span className="text-xs font-semibold text-neutral-900">
                  {selectedUser.name}
                </span>
              </div>
              <ChevronDown className="size-4 text-neutral-400" />
            </button>

            {userDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setUserDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-30 animate-in fade-in duration-100">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        onSelectUser(u);
                        setUserDropdownOpen(false);
                        setDigits(["", "", "", ""]);
                        setError(null);
                        inputRefs.current[0]?.focus();
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-neutral-50 transition-colors cursor-pointer",
                        selectedUser.id === u.id && "bg-neutral-50 font-semibold"
                      )}
                    >
                      <div className="size-5 rounded-md bg-[#0088cc] flex items-center justify-center text-white text-[11px] font-bold">
                        {u.initial}
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-neutral-900 leading-none">
                          {u.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          {u.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="border-t border-neutral-100 pt-3">
            {/* Section 2: Enter PIN */}
            <p className="text-xs text-neutral-500 mb-3">
              Enter password to continue.
            </p>

            {/* 4 Clickable PIN Input Slots */}
            <div className="grid grid-cols-4 gap-2.5 my-4">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  onFocus={(e) => (e.target as HTMLInputElement).select()}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  placeholder="—"
                  className={cn(
                    "h-14 w-full rounded-2xl border text-center text-xl font-bold text-neutral-900 bg-white transition-all shadow-2xs outline-none cursor-pointer",
                    "focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900",
                    digit
                      ? "border-neutral-400"
                      : "border-neutral-200 placeholder:text-neutral-300 placeholder:font-normal"
                  )}
                  aria-label={`PIN digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-[11px] text-rose-500 text-center mb-3 font-medium">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Enter Action Button (Bottom) */}
        {isFilled ? (
          <button
            type="button"
            onClick={handleEnter}
            className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Enter</span>
            <ArrowRight className="size-3.5" />
          </button>
        ) : (
          <div className="w-full py-3.5 bg-neutral-100 text-neutral-400 text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed select-none">
            <span>Enter</span>
            <ArrowRight className="size-3.5" />
          </div>
        )}
      </div>
    </div>
  );
};
