"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoWorkspaceConnectedProps {
  onCreateCompany?: () => void;
}

export const NoWorkspaceConnected: React.FC<NoWorkspaceConnectedProps> = ({
  onCreateCompany,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
      {/* Title */}
      <h1 className="text-xl sm:text-[22px] font-bold tracking-tight text-neutral-900">
        No Business Workspace Connected Yet
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-[13px] text-neutral-500 max-w-120 mt-2 sm:mt-2.5 leading-relaxed font-normal">
        Connect or create your business workspace to start managing your sales,
        inventory, customers, accounting, and daily operations from one place.
      </p>

      {/* Action Button */}
      <Button
        onClick={onCreateCompany}
        type="button"
        className="mt-6 sm:mt-7 h-9 px-4 rounded-lg bg-[#232323] hover:bg-neutral-800 text-white text-xs font-medium gap-1.5 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
      >
        <Plus className="size-3.5" />
        <span>Create Company</span>
      </Button>
    </div>
  );
};
