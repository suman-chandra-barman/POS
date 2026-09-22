"use client";

import React from "react";
import { CheckCircle2, Layers, RotateCcw, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AccountSetupFormData } from "../types/accountSetup.types";

interface AccountSetupCompletedStepProps {
  formData: AccountSetupFormData;
  freeAppsCount: number;
  paidAppsCount: number;
  onReset: () => void;
  onGoToDashboard: () => void;
}

export const AccountSetupCompletedStep: React.FC<
  AccountSetupCompletedStepProps
> = ({
  formData,
  freeAppsCount,
  paidAppsCount,
  onReset,
  onGoToDashboard,
}) => {
  return (
    <div className="w-full max-w-107.5 rounded-2xl sm:rounded-3xl border border-neutral-100/80 bg-white p-6 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] text-center animate-in fade-in-0 zoom-in-95 duration-200">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="size-6" />
      </div>

      <h2 className="mt-3.5 text-lg font-bold text-neutral-900">
        Workspace & Database Ready!
      </h2>
      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
        Your business workspace{" "}
        <span className="font-semibold text-neutral-800">
          {formData.businessName || "AlignUI"}
        </span>{" "}
        has been created with all selected apps.
      </p>

      {/* Configured Summary */}
      <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-left text-xs space-y-2 border border-neutral-100">
        <div className="flex justify-between">
          <span className="text-neutral-400">Email:</span>
          <span className="font-medium text-neutral-800">
            {formData.email}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Phone:</span>
          <span className="font-medium text-neutral-800">
            {formData.phone}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Country:</span>
          <span className="font-medium text-neutral-800">
            {formData.country}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Language:</span>
          <span className="font-medium text-neutral-800">
            {formData.language}
          </span>
        </div>
        <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
          <span className="text-neutral-500 font-medium flex items-center gap-1">
            <Layers className="size-3 text-neutral-400" />
            Installed Apps:
          </span>
          <span className="font-semibold text-neutral-800">
            {freeAppsCount} Free{" "}
            {paidAppsCount > 0 && `+ ${paidAppsCount} Paid`}
          </span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button
          type="button"
          onClick={onReset}
          variant="outline"
          className="flex-1 h-10 rounded-xl text-xs gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset Demo</span>
        </Button>
        <Button
          type="button"
          onClick={onGoToDashboard}
          className="flex-1 h-10 rounded-xl bg-[#232323] hover:bg-neutral-800 text-white text-xs gap-1.5 cursor-pointer"
        >
          <Building2 className="size-3.5" />
          <span>Go to Dashboard</span>
        </Button>
      </div>
    </div>
  );
};
