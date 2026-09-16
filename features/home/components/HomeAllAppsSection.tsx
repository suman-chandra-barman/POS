"use client";

import React from "react";
import { type HomeAppItem } from "../data/homeAppsData";
import { HomeAppTile } from "./HomeAppTile";

interface HomeAllAppsSectionProps {
  apps: HomeAppItem[];
  onAppClick: (app: HomeAppItem) => void;
  onToggleMark: (appId: string, e: React.MouseEvent) => void;
}

export const HomeAllAppsSection: React.FC<HomeAllAppsSectionProps> = ({
  apps,
  onAppClick,
  onToggleMark,
}) => {
  return (
    <section aria-label="All Apps" className="w-full">
      <div className="inline-flex items-center rounded-md bg-neutral-100/90 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 mb-4 border border-neutral-200/40">
        All Apps
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-5.5 items-start">
        {apps.map((app) => (
          <HomeAppTile
            key={app.id}
            app={app}
            onClick={onAppClick}
            onToggleMark={onToggleMark}
          />
        ))}
      </div>
    </section>
  );
};
