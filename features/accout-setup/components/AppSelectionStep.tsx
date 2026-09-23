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
        "flex w-full container h-full max-h-full flex-col justify-center animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
    >
      {/* Main Two-Column Layout */}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch h-full max-h-[calc(100vh-5rem)] min-h-0">
        {/* Left Side: Category App Selector Card */}
        <div className="flex-1 min-h-0 flex flex-col rounded-2xl sm:rounded-3xl border border-neutral-100/90 bg-white p-4 sm:p-5 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Scrollable Categories Grid Area */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-2 space-y-3.5">
            {APP_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className={cn(
                  "space-y-2",
                  idx !== APP_CATEGORIES.length - 1 && "border-b border-neutral-100 pb-3"
                )}
              >
                {/* Category Title */}
                <h4 className="text-xs font-bold tracking-tight text-neutral-900">
                  {cat.title}
                </h4>

                {/* Category Apps Grid */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
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
          </div>

          {onBack && (
            <div className="pt-2 mt-2 border-t border-neutral-100 shrink-0">
              <BackNavigation onClick={onBack} label="← Back to Step 2" />
            </div>
          )}
        </div>

        {/* Right Side: Selected Apps Sidebar Card */}
        <div className="w-full lg:w-64 xl:w-70 shrink-0 flex flex-col min-h-0">
          <SelectedAppsSidebar
            selectedApps={selectedApps}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};
