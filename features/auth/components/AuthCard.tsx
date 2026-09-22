"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-95 rounded-3xl bg-white p-6 sm:p-7 shadow-lg shadow-black/5 border border-black/5 transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};
