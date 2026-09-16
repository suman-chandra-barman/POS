"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DatabaseCreatingStepProps {
  onComplete?: () => void;
  className?: string;
  durationMs?: number;
}

export const DatabaseCreatingStep: React.FC<DatabaseCreatingStepProps> = ({
  onComplete,
  className,
  durationMs = 3600,
}) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("Creating...");

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (pct > 35 && pct < 70) {
        setStatusText("Configuring business apps & workspace...");
      } else if (pct >= 70 && pct < 100) {
        setStatusText("Finalizing database setup...");
      } else if (pct >= 100) {
        setStatusText("Ready!");
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  return (
    <div
      className={cn(
        "w-full max-w-107.5 rounded-2xl sm:rounded-3xl border border-neutral-100/90 bg-white p-8 sm:p-10 text-center shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
    >
      {/* Title */}
      <h2 className="text-sm sm:text-[15px] font-bold tracking-tight text-neutral-900">
        Getting start create your database
      </h2>

      {/* Subtitle */}
      <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed max-w-75 mx-auto">
        Thanks to choosing qmona, system scan and create your database on your requirements
      </p>

      {/* Status indicator */}
      <div className="mt-7 sm:mt-8 space-y-3">
        <span className="block text-xs sm:text-[13px] font-semibold text-neutral-800">
          {statusText}
        </span>

        {/* Progress Bar */}
        <div className="relative h-1.5 w-full max-w-72 mx-auto overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 transition-all duration-75 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
