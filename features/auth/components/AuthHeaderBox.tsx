"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuthHeaderBoxProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const AuthHeaderBox: React.FC<AuthHeaderBoxProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#f4f4f6] px-4 py-3.5 sm:px-5 sm:py-4 text-center select-none",
        className
      )}
    >
      <h1 className="text-xl font-bold tracking-tight text-neutral-900">
        {title}
      </h1>
      <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-normal whitespace-pre-line">
        {subtitle}
      </p>
    </div>
  );
};
