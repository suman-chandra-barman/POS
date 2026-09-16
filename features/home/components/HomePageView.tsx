"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { MARKED_APPS, ALL_APPS, type HomeAppItem } from "../data/homeAppsData";
import { HomeMarkedSection } from "./HomeMarkedSection";
import { HomeAllAppsSection } from "./HomeAllAppsSection";

export const HomePageView: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();

  const [markedList, setMarkedList] = useState<HomeAppItem[]>(MARKED_APPS);
  const [allList, setAllList] = useState<HomeAppItem[]>(ALL_APPS);

  const handleAppClick = (app: HomeAppItem) => {
    if (app.href) {
      toast.info(`Opening ${app.name}...`);
      router.push(`/${locale}${app.href}`);
    } else {
      toast.info(`Launching ${app.name}...`);
    }
  };

  const handleToggleMark = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const isCurrentlyMarked = markedList.some((a) => a.id === appId);

    if (isCurrentlyMarked) {
      const appToUnmark = markedList.find((a) => a.id === appId);
      if (appToUnmark) {
        setMarkedList((prev) => prev.filter((a) => a.id !== appId));
        setAllList((prev) => [
          ...prev,
          { ...appToUnmark, isMarked: false, hasStarOutline: true },
        ]);
        toast.success(`Removed ${appToUnmark.name} from Marked apps`);
      }
    } else {
      const appToMark = allList.find((a) => a.id === appId);
      if (appToMark) {
        setAllList((prev) => prev.filter((a) => a.id !== appId));
        setMarkedList((prev) => [
          ...prev,
          { ...appToMark, isMarked: true, hasStarOutline: false },
        ]);
        toast.success(`Added ${appToMark.name} to Marked apps`);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-start px-4 pt-6 sm:pt-10 pb-40">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-start">
        {/* Section 1: Marked Apps */}
        <HomeMarkedSection
          apps={markedList}
          onAppClick={handleAppClick}
          onToggleMark={handleToggleMark}
        />

        {/* Subtle Horizontal Divider */}
        <div className="w-full my-6 sm:my-8 border-t border-neutral-200/80" />

        {/* Section 2: All Apps */}
        <HomeAllAppsSection
          apps={allList}
          onAppClick={handleAppClick}
          onToggleMark={handleToggleMark}
        />
      </div>
    </div>
  );
};

export default HomePageView;
