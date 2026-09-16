"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, RotateCcw, Building2 } from "lucide-react";
import { AccountSetupLayout } from "./AccountSetupLayout";
import { NoWorkspaceConnected } from "./NoWorkspaceConnected";
import { BusinessWorkspaceSetupStep1 } from "./BusinessWorkspaceSetupStep1";
import { BusinessWorkspaceSetupStep2 } from "./BusinessWorkspaceSetupStep2";
import {
  type AccountSetupStep,
  type Step1FormData,
  type Step2FormData,
  type AccountSetupFormData,
} from "../types/accountSetup.types";
import { INITIAL_STEP1_VALUES, INITIAL_STEP2_VALUES } from "../data/demoData";
import { Button } from "@/components/ui/button";

export const AccountSetupContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AccountSetupStep>("empty");
  const [formData, setFormData] = useState<AccountSetupFormData>({
    ...INITIAL_STEP1_VALUES,
    ...INITIAL_STEP2_VALUES,
  });

  const handleCreateCompany = () => {
    setCurrentStep("step1");
  };

  const handleStep1Next = (step1Data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, ...step1Data }));
    toast.success("Business information saved");
    setCurrentStep("step2");
  };

  const handleStep2Submit = (step2Data: Step2FormData) => {
    const finalData = { ...formData, ...step2Data };
    setFormData(finalData);
    toast.success("Business workspace created successfully!");
    setCurrentStep("completed");
  };

  const handleReset = () => {
    setCurrentStep("empty");
    setFormData({
      ...INITIAL_STEP1_VALUES,
      ...INITIAL_STEP2_VALUES,
    });
  };

  return (
    <AccountSetupLayout>
      <div className="flex flex-col items-center w-full">
        {/* Component 1: Empty State */}
        {currentStep === "empty" && (
          <NoWorkspaceConnected onCreateCompany={handleCreateCompany} />
        )}

        {/* Component 2: Step 1 (Business Info) */}
        {currentStep === "step1" && (
          <BusinessWorkspaceSetupStep1
            initialValues={formData}
            onNext={handleStep1Next}
            onBack={() => setCurrentStep("empty")}
          />
        )}

        {/* Component 3: Step 2 (Contact & Localization) */}
        {currentStep === "step2" && (
          <BusinessWorkspaceSetupStep2
            initialValues={formData}
            onSubmit={handleStep2Submit}
            onBack={() => setCurrentStep("step1")}
          />
        )}

        {/* Success / Completed Confirmation */}
        {currentStep === "completed" && (
          <div className="w-full max-w-107.5 rounded-2xl sm:rounded-3xl border border-neutral-100/80 bg-white p-6 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] text-center animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>

            <h2 className="mt-3.5 text-lg font-bold text-neutral-900">
              Workspace Connected!
            </h2>
            <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
              Your business workspace{" "}
              <span className="font-semibold text-neutral-800">
                {formData.businessName || "AlignUI"}
              </span>{" "}
              has been created.
            </p>

            <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-left text-xs space-y-1.5 border border-neutral-100">
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
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-10 rounded-xl text-xs gap-1.5 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset Demo</span>
              </Button>
              <Button
                type="button"
                onClick={() => toast.info("Redirecting to ERP dashboard...")}
                className="flex-1 h-10 rounded-xl bg-[#232323] hover:bg-neutral-800 text-white text-xs gap-1.5 cursor-pointer"
              >
                <Building2 className="size-3.5" />
                <span>Go to Dashboard</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AccountSetupLayout>
  );
};
