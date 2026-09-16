"use client";

import React from "react";
import { type DirectoryAppItem } from "../data/appsDirectoryData";
import { AppDirectoryCard } from "./AppDirectoryCard";

interface AppsDirectoryGridProps {
  apps: DirectoryAppItem[];
  onToggleInstall: (appId: string) => void;
  onViewDetails: (app: DirectoryAppItem) => void;
}

export const AppsDirectoryGrid: React.FC<AppsDirectoryGridProps> = ({
  apps,
  onToggleInstall,
  onViewDetails,
}) => {
  if (apps.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-xs text-neutral-400 font-medium">
          No apps found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
      {apps.map((app) => (
        <AppDirectoryCard
          key={app.id}
          app={app}
          onToggleInstall={onToggleInstall}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
