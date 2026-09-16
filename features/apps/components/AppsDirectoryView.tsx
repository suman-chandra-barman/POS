"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  APPS_DIRECTORY_ITEMS,
  type DirectoryAppItem,
} from "../data/appsDirectoryData";
import { AppsDirectorySidebar } from "./AppsDirectorySidebar";
import { AppsDirectorySearch } from "./AppsDirectorySearch";
import { AppsDirectoryGrid } from "./AppsDirectoryGrid";
import { AppDetailsDialog } from "./AppDetailsDialog";

export const AppsDirectoryView: React.FC = () => {
  const [apps, setApps] = useState<DirectoryAppItem[]>(APPS_DIRECTORY_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "free">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAppForDetails, setSelectedAppForDetails] = useState<DirectoryAppItem | null>(null);

  const handleToggleInstall = (appId: string) => {
    setApps((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const newStatus = !app.isInstalled;
          if (newStatus) {
            toast.success(`Installed ${app.name} successfully`);
          } else {
            toast.info(`Uninstalled ${app.name}`);
          }
          const updated = { ...app, isInstalled: newStatus };
          if (selectedAppForDetails?.id === appId) {
            setSelectedAppForDetails(updated);
          }
          return updated;
        }
        return app;
      })
    );
  };

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      if (activeTab === "free" && app.pricing !== "Free") {
        return false;
      }
      if (selectedCategory && app.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(query);
        const matchesDesc = app.description?.toLowerCase().includes(query);
        const matchesCategory = app.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [apps, activeTab, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] px-4 py-6 sm:py-8 pb-28">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Sidebar */}
        <AppsDirectorySidebar
          activeTab={activeTab}
          selectedCategory={selectedCategory}
          onSelectTab={setActiveTab}
          onSelectCategory={setSelectedCategory}
        />

        {/* Right Content Area Card */}
        <main className="flex-1 w-full rounded-3xl bg-white p-5 sm:p-6 border border-neutral-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)]">
          {/* Search Bar */}
          <AppsDirectorySearch
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* Grid of Apps */}
          <AppsDirectoryGrid
            apps={filteredApps}
            onToggleInstall={handleToggleInstall}
            onViewDetails={setSelectedAppForDetails}
          />
        </main>
      </div>

      {/* Details Dialog */}
      <AppDetailsDialog
        app={selectedAppForDetails}
        onClose={() => setSelectedAppForDetails(null)}
        onToggleInstall={handleToggleInstall}
      />
    </div>
  );
};

export default AppsDirectoryView;
