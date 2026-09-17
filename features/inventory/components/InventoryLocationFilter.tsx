"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { InventoryLocationNode } from "../types/inventory.types";

interface InventoryLocationFilterProps {
  locations: InventoryLocationNode[];
  selectedLocation: string | null;
  onSelectLocation: (locationName: string | null) => void;
}

export const InventoryLocationFilter: React.FC<InventoryLocationFilterProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
}) => {
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => onSelectLocation(null)}
        className={cn(
          "w-full text-left font-bold text-[15px] tracking-tight transition-colors mb-3 cursor-pointer",
          selectedLocation === null
            ? "text-neutral-900"
            : "text-neutral-800 hover:text-neutral-950"
        )}
      >
        All Locations
      </button>

      <div className="flex flex-col space-y-1.5 pl-3">
        {locations.map((loc) => {
          const isSelected = selectedLocation === loc.name;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => onSelectLocation(isSelected ? null : loc.name)}
              className={cn(
                "text-left text-[13px] font-medium transition-colors py-1 px-2 rounded-md cursor-pointer",
                isSelected
                  ? "bg-neutral-100 text-neutral-900 font-semibold"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              )}
            >
              {loc.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryLocationFilter;
