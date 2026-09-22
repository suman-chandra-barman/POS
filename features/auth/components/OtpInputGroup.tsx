"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputGroupProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

const OTP_LENGTH = 6;

export const OtpInputGroup: React.FC<OtpInputGroupProps> = ({
  value,
  onChange,
  disabled = false,
  hasError = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] || "");

  const handleDigitChange = (index: number, digitValue: string) => {
    // Only accept numeric inputs
    const cleanDigit = digitValue.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanDigit;
    const combined = newDigits.join("");
    onChange(combined);

    if (cleanDigit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    onChange(pasted);
    const targetFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[targetFocusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-between gap-1.5 sm:gap-2 my-6">
      {Array.from({ length: OTP_LENGTH }).map((_, index) => {
        const val = digits[index] || "";
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            placeholder="-"
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "size-11 sm:size-12 rounded-xl border text-center text-base sm:text-lg font-semibold bg-white placeholder:text-neutral-300 transition-colors focus:outline-none",
              hasError
                ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900",
              disabled && "opacity-50 cursor-not-allowed bg-neutral-50"
            )}
          />
        );
      })}
    </div>
  );
};
