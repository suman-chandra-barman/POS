"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2FormData } from "../types/accountSetup.types";
import {
  DEMO_COUNTRIES,
  DEMO_LANGUAGES,
  INITIAL_STEP2_VALUES,
} from "../data/demoData";
import { SetupHeaderBox } from "./SetupHeaderBox";
import { PhoneInputCustom } from "./PhoneInputCustom";
import { FormSelect } from "./FormSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BusinessWorkspaceSetupStep2Props {
  initialValues?: Partial<Step2FormData>;
  onSubmit: (data: Step2FormData) => void;
  onBack?: () => void;
  className?: string;
}

export const BusinessWorkspaceSetupStep2: React.FC<BusinessWorkspaceSetupStep2Props> = ({
  initialValues,
  onSubmit,
  onBack,
  className,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ...INITIAL_STEP2_VALUES,
      ...initialValues,
    },
  });

  const countryOptions = DEMO_COUNTRIES.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const languageOptions = DEMO_LANGUAGES.map((l) => ({
    value: l.label,
    label: l.label,
  }));

  return (
    <div
      className={cn(
        "w-full max-w-107.5 rounded-2xl sm:rounded-3xl border border-neutral-100/80 bg-white p-5 sm:p-6 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
    >
      {/* Header Box */}
      <SetupHeaderBox
        title="Let’s Set Up Your Business Workspace"
        subtitle="Tell us a little about your business so we can personalize your ERP experience and recommend the right tools for your workflow."
      />

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3.5">
        {/* E-mail Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-800">
            E-mail
          </label>
          <Input
            type="email"
            {...register("email")}
            placeholder="hello@alignui.com"
            className={cn(
              "h-10 rounded-xl border-neutral-200 px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-neutral-400 focus-visible:ring-neutral-200/70",
              errors.email && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            )}
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInputCustom
              value={field.value}
              onChange={field.onChange}
              error={errors.phone?.message}
            />
          )}
        />

        {/* Cuontry Field */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Cuontry"
              placeholder="Select Country"
              value={field.value}
              onChange={field.onChange}
              options={countryOptions}
              error={errors.country?.message}
            />
          )}
        />

        {/* Language Field */}
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Language"
              placeholder="Select Language"
              value={field.value}
              onChange={field.onChange}
              options={languageOptions}
              error={errors.language?.message}
            />
          )}
        />

        {/* Confirm Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 h-11 w-full rounded-xl bg-[#232323] hover:bg-neutral-800 text-white text-xs font-semibold tracking-wider uppercase shadow-sm transition-all active:scale-[0.99] cursor-pointer"
        >
          CONFIRM
        </Button>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full text-center text-xs text-neutral-400 hover:text-neutral-700 transition-colors pt-1 cursor-pointer"
          >
            ← Back to Step 1
          </button>
        )}
      </form>
    </div>
  );
};
