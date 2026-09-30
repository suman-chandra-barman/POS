"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { ChevronDown, Search, Check } from "lucide-react";
import { getCountries, type Country } from "react-phone-number-input";
import { countries } from "countries-list";
import { cn } from "@/lib/utils";

interface ContactCountrySelectProps {
  selectedCountry?: string; // Country code or name
  onSelect: (countryName: string, countryCode: string) => void;
  className?: string;
}

function parseCountryCode(countryStr?: string): Country {
  if (!countryStr) return "BD";
  if (countryStr.length === 2) return countryStr.toUpperCase() as Country;
  if (countryStr.toLowerCase().includes("bangladesh")) return "BD";
  return "BD";
}

export const ContactCountrySelect: React.FC<ContactCountrySelectProps> = ({
  selectedCountry = "BD",
  onSelect,
  className,
}) => {
  const [internalCountry, setInternalCountry] = useState<Country>("BD");
  const currentCountry = selectedCountry
    ? parseCountryCode(selectedCountry)
    : internalCountry;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return allCountries;
    const q = searchQuery.toLowerCase();
    return allCountries.filter((c) => {
      const name = getCountryName(c).toLowerCase();
      return name.includes(q) || c.toLowerCase().includes(q);
    });
  }, [allCountries, searchQuery]);

  const SelectedFlag = (
    Flags as Record<string, React.ComponentType<{ className?: string }>>
  )[currentCountry];

  const displayName = getCountryName(currentCountry);

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3.5 py-2 border border-neutral-300 rounded-xl bg-white hover:bg-neutral-50/60 transition-colors flex items-center justify-between text-xs text-neutral-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <div className="flex items-center gap-2.5 truncate">
          <span className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
            {SelectedFlag ? (
              <SelectedFlag className="w-full h-full object-cover" />
            ) : (
              <span className="text-[9px]">{currentCountry}</span>
            )}
          </span>
          <span className="truncate">{displayName}</span>
        </div>
        <ChevronDown className="size-3.5 text-neutral-400 shrink-0 ml-2" />
      </button>

      {/* Dropdown popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-64 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col animate-in fade-in-50 zoom-in-95 duration-100">
          {/* Search box */}
          <div className="p-2 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50">
            <Search className="size-3.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full text-xs bg-transparent focus:outline-none text-neutral-700 placeholder:text-neutral-400"
              autoFocus
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 divide-y divide-neutral-50">
            {filteredCountries.map((c) => {
              const FlagComp = (
                Flags as Record<
                  string,
                  React.ComponentType<{ className?: string }>
                >
              )[c];
              const name = getCountryName(c);
              const isSelected = c === currentCountry;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setInternalCountry(c);
                    onSelect(name, c);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-neutral-50 transition-colors cursor-pointer",
                    isSelected && "bg-sky-50 text-sky-700 font-medium"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-5 h-3.5 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                      {FlagComp ? (
                        <FlagComp className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[8px]">{c}</span>
                      )}
                    </span>
                    <span className="truncate">{name}</span>
                  </div>
                  {isSelected && <Check className="size-3 text-sky-600 shrink-0" />}
                </button>
              );
            })}
            {filteredCountries.length === 0 && (
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

export default ContactCountrySelect;
