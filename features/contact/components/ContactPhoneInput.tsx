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

interface ContactPhoneInputProps {
  country?: Country;
  phoneNumber: string;
  onCountryChange?: (country: Country, callingCode: string) => void;
  onPhoneNumberChange: (number: string) => void;
  className?: string;
}

export const ContactPhoneInput: React.FC<ContactPhoneInputProps> = ({
  country = "BD",
  phoneNumber,
  onCountryChange,
  onPhoneNumberChange,
  className,
}) => {
  const [internalCountry, setInternalCountry] = useState<Country>(country);
  const selectedCountry = country ?? internalCountry;
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

  // Click outside to close dropdown
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
    setInternalCountry(c);
    try {
      const code = getCountryCallingCode(c);
      onCountryChange?.(c, `+${code}`);
    } catch {
      onCountryChange?.(c, "+880");
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const countriesList = useMemo(() => {
    const all = getCountries();
    if (!searchQuery.trim()) return all;
    return all.filter((c) => {
      const code = c.toLowerCase();
      let dial = "";
      try {
        dial = getCountryCallingCode(c);
      } catch {}
      return (
        code.includes(searchQuery.toLowerCase()) ||
        dial.includes(searchQuery.replace("+", ""))
      );
    });
  }, [searchQuery]);

  const SelectedFlag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[
    selectedCountry
  ];

  return (
    <div className={cn("relative flex items-center", className)} ref={dropdownRef}>
      {/* Country Selector Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 border border-r-0 border-neutral-300 rounded-l-xl bg-neutral-50/70 hover:bg-neutral-100 transition-colors text-xs font-medium text-neutral-700 shrink-0 cursor-pointer h-10"
      >
        <span className="w-5 h-3.5 rounded-xs overflow-hidden flex items-center justify-center border border-neutral-200">
          {SelectedFlag ? (
            <SelectedFlag className="w-full h-full object-cover" />
          ) : (
            <span className="text-[9px]">{selectedCountry}</span>
          )}
        </span>
        <span className="text-neutral-500 font-normal">+{callingCode}</span>
        <ChevronDown className="size-3 text-neutral-400" />
      </button>

      {/* Phone Number Input */}
      <input
        type="tel"
        id="input-contact-phone"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        placeholder="01700-000000"
        className="flex-1 min-w-0 h-10 px-3.5 py-2 border border-neutral-300 rounded-r-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-white"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col animate-in fade-in-50 zoom-in-95 duration-100">
          {/* Search Header */}
          <div className="p-2 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50">
            <Search className="size-3.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full text-xs bg-transparent focus:outline-none text-neutral-700 placeholder:text-neutral-400"
              autoFocus
            />
          </div>

          {/* Countries list */}
          <div className="overflow-y-auto flex-1 divide-y divide-neutral-50">
            {countriesList.map((c) => {
              const FlagComp = (
                Flags as Record<string, React.ComponentType<{ className?: string }>>
              )[c];
              let dial = "";
              try {
                dial = getCountryCallingCode(c);
              } catch {}
              const isSelected = c === selectedCountry;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-neutral-50 transition-colors cursor-pointer",
                    isSelected && "bg-sky-50 text-sky-700 font-medium"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                      {FlagComp ? (
                        <FlagComp className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[8px]">{c}</span>
                      )}
                    </span>
                    <span className="truncate">{c}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-[11px]">+{dial}</span>
                    {isSelected && <Check className="size-3 text-sky-600" />}
                  </div>
                </button>
              );
            })}
            {countriesList.length === 0 && (
              <div className="p-4 text-center text-xs text-neutral-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPhoneInput;
