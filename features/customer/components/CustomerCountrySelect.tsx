"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { ChevronDown, Search, Check } from "lucide-react";
import { getCountries, type Country } from "react-phone-number-input";
import { countries } from "countries-list";
import { cn } from "@/lib/utils";

interface CustomerCountrySelectProps {
  selectedCountry?: string; // Country code or name
  onSelect: (countryName: string, countryCode: string) => void;
  className?: string;
}

export const CustomerCountrySelect: React.FC<CustomerCountrySelectProps> = ({
  selectedCountry = "BD",
  onSelect,
  className,
}) => {
  const [currentCountry, setCurrentCountry] = useState<Country>(
    (selectedCountry as Country) || "BD"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCountry) {
      if (selectedCountry.length === 2) {
        setCurrentCountry(selectedCountry.toUpperCase() as Country);
      } else if (selectedCountry.toLowerCase().includes("bangladesh")) {
        setCurrentCountry("BD");
      }
    }
  }, [selectedCountry]);

  // Click outside to close
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

  const allCountries = useMemo(() => getCountries(), []);

  const getCountryName = (code: string) => {
    const countryData = (countries as Record<string, { name: string }>)[code];
    return countryData?.name || code;
  };

  const handleSelect = (code: Country) => {
    setCurrentCountry(code);
    setIsOpen(false);
    setSearchQuery("");
    const name = getCountryName(code);
    onSelect(name, code);
  };

  const FlagComponent = Flags[currentCountry as keyof typeof Flags];

  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allCountries;
    return allCountries.filter((c) => {
      const name = getCountryName(c).toLowerCase();
      return c.toLowerCase().includes(q) || name.includes(q);
    });
  }, [allCountries, searchQuery]);

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-9 px-3 text-xs rounded-xl border border-neutral-200/90 bg-white text-neutral-800 hover:border-neutral-300 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-4.5 h-3 overflow-hidden rounded-2xs shrink-0 flex items-center justify-center">
            {FlagComponent ? (
              <FlagComponent className="size-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold">{currentCountry}</span>
            )}
          </div>
          <span>{getCountryName(currentCountry)}</span>
        </div>
        <ChevronDown
          className={cn(
            "size-3.5 text-neutral-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-full bg-white rounded-xl border border-neutral-200 shadow-xl py-1.5 animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="p-2 border-b border-neutral-100">
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100/80 px-2.5 py-1.5">
              <Search className="size-3.5 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto py-1">
            {filteredCountries.map((c) => {
              const Flag = Flags[c as keyof typeof Flags];
              const name = getCountryName(c);
              const isSelected = currentCountry === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleSelect(c)}
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
                    <span className="truncate">{name}</span>
                  </div>
                  {isSelected && <Check className="size-3 text-neutral-900" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCountrySelect;
