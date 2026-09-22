"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SetupTopNavbarProps {
  className?: string;
}

export const SetupTopNavbar: React.FC<SetupTopNavbarProps> = ({
  className,
}) => {
  return (
    <header
      className={cn(
        "w-full bg-[#1c78b4] py-2 sm:py-2.5 px-4 sm:px-6 text-white text-xs sm:text-[13px] font-normal flex items-center justify-center gap-2 shadow-xs select-none z-30 transition-all",
        className
      )}
    >
      <Sparkles className="size-3.5 sm:size-4 text-white fill-white shrink-0" />
      <p className="text-center tracking-tight">
        Choose the apps your business needs. We&apos;ll set up your workspace based on your selection.
        <span className="mx-1.5 opacity-80">•</span>
        Any 2 apps are free for your business.
      </p>
    </header>
  );
};
