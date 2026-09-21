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

interface CustomerPhoneInputProps {
  country?: Country;
  phoneNumber: string;
  onCountryChange?: (country: Country, callingCode: string) => void;
  onPhoneNumberChange: (number: string) => void;
  className?: string;
}

export const CustomerPhoneInput: React.FC<CustomerPhoneInputProps> = ({
  country = "BD",
  phoneNumber,
  onCountryChange,
  onPhoneNumberChange,
  className,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(country);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (country && country !== selectedCountry) {
      setSelectedCountry(country);
    }
  }, [country, selectedCountry]);

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
    setSelectedCountry(c);
    setIsOpen(false);
    setSearchQuery("");
    let code = "880";
    try {
      code = getCountryCallingCode(c);
    } catch {
      code = "880";
    }
    onCountryChange?.(c, `+${code}`);
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
    <div
      className={cn(
        "flex items-center rounded-xl border border-neutral-200/90 bg-white overflow-visible relative focus-within:ring-1.5 focus-within:ring-sky-300",
        className
      )}
    >
      {/* Country Selector Trigger */}
      <div ref={dropdownRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 border-r border-neutral-200 bg-neutral-50/60 text-xs text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer select-none"
        >
          <div className="w-4.5 h-3 overflow-hidden rounded-2xs shrink-0 flex items-center justify-center">
            {FlagComponent ? (
              <FlagComponent className="size-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold">{selectedCountry}</span>
            )}
          </div>
          <span className="font-medium text-neutral-800">+{callingCode}</span>
          <ChevronDown
            className={cn(
              "size-3 text-neutral-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Searchable Country Code Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1.5 z-50 w-64 rounded-xl border border-neutral-200 bg-white shadow-xl py-1.5 animate-in fade-in-0 zoom-in-95 duration-100">
            {/* Search Input */}
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
                      <div className="w-4.5 h-3 overflow-hidden rounded-2xs shrink-0 flex items-center justify-center">
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

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        placeholder="01700-000000"
        className="w-full h-9 px-3 text-xs bg-transparent placeholder:text-neutral-400 text-neutral-800 focus:outline-none"
      />
    </div>
  );
};

export default CustomerPhoneInput;
