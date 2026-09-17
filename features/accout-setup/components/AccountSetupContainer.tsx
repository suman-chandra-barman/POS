"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, RotateCcw, Building2, Layers } from "lucide-react";
import { AccountSetupLayout } from "./AccountSetupLayout";
import { NoWorkspaceConnected } from "./NoWorkspaceConnected";
import { BusinessWorkspaceSetupStep1 } from "./BusinessWorkspaceSetupStep1";
import { BusinessWorkspaceSetupStep2 } from "./BusinessWorkspaceSetupStep2";
import { AppSelectionStep } from "./AppSelectionStep";
import { DatabaseCreatingStep } from "./DatabaseCreatingStep";
import {
  ACCOUNT_SETUP_STEPS,
  type AccountSetupStep,
  type Step1FormData,
  type Step2FormData,
  type AccountSetupFormData,
} from "../types/accountSetup.types";
import {
  BUSINESS_APPS,
  DEFAULT_SELECTED_APP_IDS,
  type BusinessApp,
} from "../data/appsData";
import { INITIAL_STEP1_VALUES, INITIAL_STEP2_VALUES } from "../data/demoData";
import { Button } from "@/components/ui/button";

export const AccountSetupContainer: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [currentStep, setCurrentStep] = useState<AccountSetupStep>(
    ACCOUNT_SETUP_STEPS.EMPTY
  );
  const [formData, setFormData] = useState<AccountSetupFormData>({
    ...INITIAL_STEP1_VALUES,
    ...INITIAL_STEP2_VALUES,
  });
  const [selectedApps, setSelectedApps] = useState<BusinessApp[]>(() =>
    BUSINESS_APPS.filter((a) => DEFAULT_SELECTED_APP_IDS.includes(a.id)),
  );

  const handleCreateCompany = () => {
    setCurrentStep(ACCOUNT_SETUP_STEPS.STEP1);
  };

  const handleStep1Next = (step1Data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, ...step1Data }));
    toast.success("Business information saved");
    setCurrentStep(ACCOUNT_SETUP_STEPS.STEP2);
  };

  const handleStep2Submit = (step2Data: Step2FormData) => {
    setFormData((prev) => ({ ...prev, ...step2Data }));
    toast.success("Contact details confirmed");
    setCurrentStep(ACCOUNT_SETUP_STEPS.APP_SELECTION);
  };

  const handleAppsConfirm = (apps: BusinessApp[]) => {
    setSelectedApps(apps);
    toast.success(`${apps.length} apps selected`);
    setCurrentStep(ACCOUNT_SETUP_STEPS.CREATING);
  };

  const handleDatabaseCreated = () => {
    toast.success("Workspace setup completed! Welcome to POS.");
    router.push(`/${locale}`);
  };

  const handleReset = () => {
    setCurrentStep(ACCOUNT_SETUP_STEPS.EMPTY);
    setFormData({
      ...INITIAL_STEP1_VALUES,
      ...INITIAL_STEP2_VALUES,
    });
    setSelectedApps(
      BUSINESS_APPS.filter((a) => DEFAULT_SELECTED_APP_IDS.includes(a.id)),
    );
  };

  const freeApps = selectedApps.filter((a) => a.isDefaultFree);
  const paidApps = selectedApps.filter((a) => !a.isDefaultFree);

  return (
    <AccountSetupLayout>
      <div className="flex flex-col items-center w-full">
        {/* Step 1: Empty State */}
        {currentStep === ACCOUNT_SETUP_STEPS.EMPTY && (
          <NoWorkspaceConnected onCreateCompany={handleCreateCompany} />
        )}

        {/* Step 2: Setup Step 1 (Business Info) */}
        {currentStep === ACCOUNT_SETUP_STEPS.STEP1 && (
          <BusinessWorkspaceSetupStep1
            initialValues={formData}
            onNext={handleStep1Next}
            onBack={() => setCurrentStep(ACCOUNT_SETUP_STEPS.EMPTY)}
          />
        )}

        {/* Step 3: Setup Step 2 (Contact & Localization) */}
        {currentStep === ACCOUNT_SETUP_STEPS.STEP2 && (
          <BusinessWorkspaceSetupStep2
            initialValues={formData}
            onSubmit={handleStep2Submit}
            onBack={() => setCurrentStep(ACCOUNT_SETUP_STEPS.STEP1)}
          />
        )}

        {/* Step 4: App Selection */}
        {currentStep === ACCOUNT_SETUP_STEPS.APP_SELECTION && (
          <AppSelectionStep
            initialSelectedIds={selectedApps.map((a) => a.id)}
            onConfirm={handleAppsConfirm}
            onBack={() => setCurrentStep(ACCOUNT_SETUP_STEPS.STEP2)}
          />
        )}

        {/* Step 5: Database Creating Progress */}
        {currentStep === ACCOUNT_SETUP_STEPS.CREATING && (
          <DatabaseCreatingStep onComplete={handleDatabaseCreated} />
        )}

        {/* Success / Completed Confirmation */}
        {currentStep === ACCOUNT_SETUP_STEPS.COMPLETED && (
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
                  {freeApps.length} Free{" "}
                  {paidApps.length > 0 && `+ ${paidApps.length} Paid`}
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
                onClick={() => toast.info("Redirecting to POS dashboard...")}
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
