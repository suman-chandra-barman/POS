"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AccountSetupLayout } from "./AccountSetupLayout";
import { NoWorkspaceConnected } from "./NoWorkspaceConnected";
import { BusinessWorkspaceSetupStep1 } from "./BusinessWorkspaceSetupStep1";
import { BusinessWorkspaceSetupStep2 } from "./BusinessWorkspaceSetupStep2";
import { AppSelectionStep } from "./AppSelectionStep";
import { DatabaseCreatingStep } from "./DatabaseCreatingStep";
import { SetupTopNavbar } from "./SetupTopNavbar";
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

const STORAGE_KEY_FORM = "account_setup_form_data";
const STORAGE_KEY_APPS = "account_setup_selected_apps";

export const AccountSetupContainer: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || "en";

  // URL-driven step state
  const stepQuery = searchParams.get("step") as AccountSetupStep | null;
  const validSteps = Object.values(ACCOUNT_SETUP_STEPS);
  const currentStep: AccountSetupStep =
    stepQuery && validSteps.includes(stepQuery)
      ? stepQuery
      : ACCOUNT_SETUP_STEPS.STEP1;

  // Step transition using URL
  const goToStep = (step: AccountSetupStep) => {
    router.push(`/${locale}/account-setup?step=${step}`);
  };

  // Form data state with session storage sync for reload persistence
  const [formData, setFormData] = useState<AccountSetupFormData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY_FORM);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback on error
      }
    }
    return {
      ...INITIAL_STEP1_VALUES,
      ...INITIAL_STEP2_VALUES,
    };
  });

  // Selected apps state with session storage sync
  const [selectedApps, setSelectedApps] = useState<BusinessApp[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY_APPS);
        if (saved) {
          const ids: string[] = JSON.parse(saved);
          return BUSINESS_APPS.filter((a) => ids.includes(a.id));
        }
      } catch {
        // Fallback on error
      }
    }
    return BUSINESS_APPS.filter((a) => DEFAULT_SELECTED_APP_IDS.includes(a.id));
  });

  // Sync to session storage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));
    } catch {
      // Ignore storage quota errors
    }
  }, [formData]);

  useEffect(() => {
    try {
      const ids = selectedApps.map((a) => a.id);
      sessionStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(ids));
    } catch {
      // Ignore storage quota errors
    }
  }, [selectedApps]);

  const handleStep1Next = (step1Data: Step1FormData) => {
    setFormData((prev) => ({ ...prev, ...step1Data }));
    toast.success("Business information saved");
    goToStep(ACCOUNT_SETUP_STEPS.STEP2);
  };

  const handleStep2Submit = (step2Data: Step2FormData) => {
    setFormData((prev) => ({ ...prev, ...step2Data }));
    toast.success("Contact details confirmed");
    goToStep(ACCOUNT_SETUP_STEPS.EMPTY);
  };

  const handleCreateCompany = () => {
    goToStep(ACCOUNT_SETUP_STEPS.APP_SELECTION);
  };

  const handleAppsConfirm = (apps: BusinessApp[]) => {
    setSelectedApps(apps);
    toast.success(`${apps.length} apps selected`);
    goToStep(ACCOUNT_SETUP_STEPS.CREATING);
  };

  const handleDatabaseCreated = () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY_FORM);
        sessionStorage.removeItem(STORAGE_KEY_APPS);
      } catch {
        // Ignore
      }
    }
    toast.success("Workspace setup completed! Welcome to POS.");
    router.push(`/${locale}`);
  };

  const showTopNavbar =
    currentStep === ACCOUNT_SETUP_STEPS.APP_SELECTION ||
    currentStep === ACCOUNT_SETUP_STEPS.CREATING;

  return (
    <AccountSetupLayout
      topNavbar={showTopNavbar ? <SetupTopNavbar /> : undefined}
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-h-0">
        {/* Step 1: Business Info */}
        {currentStep === ACCOUNT_SETUP_STEPS.STEP1 && (
          <BusinessWorkspaceSetupStep1
            initialValues={formData}
            onNext={handleStep1Next}
            onBack={() => router.back()}
          />
        )}

        {/* Step 2: Contact & Localization */}
        {currentStep === ACCOUNT_SETUP_STEPS.STEP2 && (
          <BusinessWorkspaceSetupStep2
            initialValues={formData}
            onSubmit={handleStep2Submit}
            onBack={() => router.back()}
          />
        )}

        {/* Step 3: No Workspace Connected */}
        {currentStep === ACCOUNT_SETUP_STEPS.EMPTY && (
          <NoWorkspaceConnected onCreateCompany={handleCreateCompany} />
        )}

        {/* Step 4: App Selection */}
        {currentStep === ACCOUNT_SETUP_STEPS.APP_SELECTION && (
          <AppSelectionStep
            initialSelectedIds={selectedApps.map((a) => a.id)}
            onConfirm={handleAppsConfirm}
            onBack={() => router.back()}
          />
        )}

        {/* Step 5: Database Creating Progress */}
        {currentStep === ACCOUNT_SETUP_STEPS.CREATING && (
          <DatabaseCreatingStep onComplete={handleDatabaseCreated} />
        )}
      </div>
    </AccountSetupLayout>
  );
};
