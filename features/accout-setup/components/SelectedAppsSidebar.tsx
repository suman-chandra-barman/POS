"use client";

import React from "react";
import { CircleDollarSign } from "lucide-react";
import { type BusinessApp } from "../data/appsData";
import { AppIcon } from "./AppIcon";
import { SetupSubmitButton } from "./SetupSubmitButton";
import { cn } from "@/lib/utils";

interface SelectedAppsSidebarProps {
  selectedApps: BusinessApp[];
  onConfirm: () => void;
  className?: string;
}

export const SelectedAppsSidebar: React.FC<SelectedAppsSidebarProps> = ({
  selectedApps,
  onConfirm,
  className,
}) => {
  const freeApps = selectedApps.filter((a) => a.isDefaultFree);
  const paidApps = selectedApps.filter((a) => !a.isDefaultFree);

  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-2xl sm:rounded-3xl border border-neutral-100/90 bg-white p-4 sm:p-5 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {/* Sidebar Header */}
      <h3 className="text-sm font-bold tracking-tight text-neutral-900">
        Selected Apps
      </h3>

      <div className="mt-3.5 space-y-4">
        {/* Free Apps Section */}
        <div>
          <span className="block text-xs font-medium text-neutral-500 mb-2">
            Free Apps
          </span>
          <div className="space-y-1.5">
            {freeApps.length === 0 ? (
              <p className="text-[11px] text-neutral-400 italic">No free apps selected</p>
            ) : (
              freeApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-xl px-1.5 py-1 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AppIcon
                      iconName={app.iconName}
                      bgClass={app.bgClass}
                      size="sm"
                    />
                    <span className="text-xs font-medium text-neutral-800 truncate">
                      {app.name}
                    </span>
                  </div>
                  <span className="rounded-md bg-neutral-100/80 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
                    Free
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Paid Apps Section */}
        {paidApps.length > 0 && (
          <div className="pt-2 border-t border-neutral-100 animate-in fade-in-0 duration-200">
            <span className="block text-xs font-medium text-neutral-500 mb-2">
              Paid Apps
            </span>
            <div className="space-y-1.5">
              {paidApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-xl px-1.5 py-1 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AppIcon
                      iconName={app.iconName}
                      bgClass={app.bgClass}
                      size="sm"
                    />
                    <span className="text-xs font-medium text-neutral-800 truncate">
                      {app.name}
                    </span>
                  </div>
                  {/* Paid Green Currency Badge */}
                  <span
                    className="flex size-4.5 items-center justify-center rounded-full text-emerald-600"
                    title="Paid app"
                  >
                    <CircleDollarSign className="size-3.5" strokeWidth={2.2} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <SetupSubmitButton onClick={onConfirm} type="button">
        CONFIRM
      </SetupSubmitButton>
    </div>
  );
};
