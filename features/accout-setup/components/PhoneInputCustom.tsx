"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { ChevronDown, Search, Check } from "lucide-react";
import {
  getCountryCallingCode,
  getCountries,
  type Country,
} from "react-phone-number-input";
import { cn } from "@/lib/utils";

interface PhoneInputCustomProps {
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  defaultCountry?: Country;
}

export const PhoneInputCustom: React.FC<PhoneInputCustomProps> = ({
  value = "",
  onChange,
  error,
  placeholder = "(555) 000-0000",
  className,
  defaultCountry = "BD",
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const callingCode = useMemo(() => {
    try {
      return getCountryCallingCode(selectedCountry);
    } catch {
      return "880";
    }
  }, [selectedCountry]);

  // Extract national digits from value if value starts with `+${callingCode}`
  const nationalDigits = useMemo(() => {
    if (!value) return "";
    const prefix = `+${callingCode}`;
    if (value.startsWith(prefix)) {
      return value.slice(prefix.length);
    }
    if (value.startsWith("+")) {
      return value.replace(/^\+\d{1,4}/, "");
    }
    return value;
  }, [value, callingCode]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCountrySelect = (c: Country) => {
    setSelectedCountry(c);
    setIsOpen(false);
    setSearchQuery("");
    const newCallingCode = getCountryCallingCode(c);
    const digits = nationalDigits.replace(/\D/g, "");
    const full = digits ? `+${newCallingCode}${digits}` : "";
    onChange?.(full);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digits = rawVal.replace(/\D/g, "");
    const full = digits ? `+${callingCode}${digits}` : "";
    onChange?.(full);
  };

  const FlagComponent = Flags[selectedCountry as keyof typeof Flags];

  const allCountries = useMemo(() => getCountries(), []);
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allCountries;
    return allCountries.filter((c) => {
      try {
        const code = getCountryCallingCode(c);
        return c.toLowerCase().includes(q) || code.includes(q);
      } catch {
        return c.toLowerCase().includes(q);
      }
    });
  }, [allCountries, searchQuery]);

  return (
    <div className={cn("relative w-full space-y-1.5", className)}>
      <label className="block text-xs font-semibold text-neutral-800">
        Phone
      </label>

      {/* Phone Field Container */}
      <div
        className={cn(
          "flex h-9.5 w-full items-center rounded-xl border border-neutral-200 bg-white px-2.5 transition-all focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/70",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
        )}
      >
        {/* Country Selector Trigger */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 py-1 pr-2 pl-0.5 rounded-lg text-xs font-medium text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <div className="size-4 overflow-hidden rounded-xs shrink-0 flex items-center justify-center">
              {FlagComponent ? (
                <FlagComponent className="size-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold">{selectedCountry}</span>
              )}
            </div>
            <span className="text-xs font-medium text-neutral-900">
              +{callingCode}
            </span>
            <ChevronDown className="size-3 text-neutral-400" />
          </button>

          {/* Country Selector Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1.5 z-50 w-64 rounded-xl border border-neutral-200 bg-white shadow-xl shadow-black/10 py-1.5 animate-in fade-in-0 zoom-in-95 duration-100">
              {/* Search Box */}
              <div className="p-2 border-b border-neutral-100">
                <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100/80 px-2.5 py-1.5">
                  <Search className="size-3.5 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country or code..."
                    className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400"
                    autoFocus
                  />
                </div>
              </div>

              {/* Country List */}
              <div className="max-h-48 overflow-y-auto py-1">
                {filteredCountries.map((c) => {
                  const Flag = Flags[c as keyof typeof Flags];
                  let code = "";
                  try {
                    code = getCountryCallingCode(c);
                  } catch {
                    code = "";
                  }
                  const isSelected = selectedCountry === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleCountrySelect(c)}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors text-left cursor-pointer",
                        isSelected && "bg-neutral-100 font-medium text-neutral-900"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="size-4 overflow-hidden rounded-xs shrink-0 flex items-center justify-center">
                          {Flag ? (
                            <Flag className="size-full object-cover" />
                          ) : (
                            <span className="text-[10px]">{c}</span>
                          )}
                        </div>
                        <span className="truncate max-w-32.5">{c}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {code && (
                          <span className="text-neutral-400 text-[11px]">
                            +{code}
                          </span>
                        )}
                        {isSelected && (
                          <Check className="size-3 text-neutral-900" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-neutral-200 mx-1 shrink-0" />

        {/* Phone Input */}
        <input
          type="tel"
          value={nationalDigits}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-2 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
        />
      </div>

      {error && (
        <p className="text-[11px] font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};
