"use client";

import React, { useState } from "react";
import {
  BUSINESS_APPS,
  APP_CATEGORIES,
  DEFAULT_SELECTED_APP_IDS,
  type BusinessApp,
} from "../data/appsData";
import { AppCard } from "./AppCard";
import { SelectedAppsSidebar } from "./SelectedAppsSidebar";
import { BackNavigation } from "@/components/common/BackNavigation";
import { cn } from "@/lib/utils";

interface AppSelectionStepProps {
  initialSelectedIds?: string[];
  onConfirm: (selectedApps: BusinessApp[]) => void;
  onBack?: () => void;
  className?: string;
}

export const AppSelectionStep: React.FC<AppSelectionStepProps> = ({
  initialSelectedIds = DEFAULT_SELECTED_APP_IDS,
  onConfirm,
  onBack,
  className,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

  const handleToggleApp = (appId: string) => {
    setSelectedIds((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  };

  const selectedApps = BUSINESS_APPS.filter((app) => selectedIds.includes(app.id));

  const handleConfirm = () => {
    onConfirm(selectedApps);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
    >
      {/* Top Banner Notice */}
      <div className="mb-5 w-full rounded-2xl border border-neutral-200/80 bg-white/95 px-5 py-3 text-center shadow-xs backdrop-blur-xs">
        <p className="text-xs text-neutral-600 leading-relaxed">
          We’ve already selected some essential apps for your business to help you get started quickly. These apps are completely{" "}
          <span className="font-semibold text-neutral-900">free to use for a lifetime</span> for businesses.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start">
        {/* Left Side: Category App Selector Card */}
        <div className="flex-1 rounded-2xl sm:rounded-3xl border border-neutral-100/90 bg-white p-5 sm:p-6 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.05)] space-y-5">
          {APP_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={cn(
                "space-y-2.5",
                idx !== APP_CATEGORIES.length - 1 && "border-b border-neutral-100 pb-4"
              )}
            >
              {/* Category Title */}
              <h4 className="text-xs font-bold tracking-tight text-neutral-900">
                {cat.title}
              </h4>

              {/* Category Apps Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
                {cat.apps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    isSelected={selectedIds.includes(app.id)}
                    onToggle={handleToggleApp}
                  />
                ))}
              </div>
            </div>
          ))}

          {onBack && (
            <div className="pt-2 border-t border-neutral-100">
              <BackNavigation onClick={onBack} label="← Back to Step 2" />
            </div>
          )}
        </div>

        {/* Right Side: Selected Apps Sidebar Card */}
        <div className="w-full lg:w-64 xl:w-70 shrink-0 lg:sticky lg:top-6">
          <SelectedAppsSidebar
            selectedApps={selectedApps}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};
