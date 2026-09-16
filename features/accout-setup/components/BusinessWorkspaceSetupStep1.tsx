"use client";

import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormData } from "../types/accountSetup.types";
import {
  DEMO_CATEGORIES,
  DEMO_EMPLOY_OPTIONS,
  INITIAL_STEP1_VALUES,
} from "../data/demoData";
import { SetupHeaderBox } from "./SetupHeaderBox";
import { LogoUpload } from "./LogoUpload";
import { FormSelect } from "./FormSelect";
import { SetupSubmitButton } from "./SetupSubmitButton";
import { BackNavigation } from "@/components/common/BackNavigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BusinessWorkspaceSetupStep1Props {
  initialValues?: Partial<Step1FormData>;
  onNext: (data: Step1FormData) => void;
  onBack?: () => void;
  className?: string;
}

export const BusinessWorkspaceSetupStep1: React.FC<BusinessWorkspaceSetupStep1Props> = ({
  initialValues,
  onNext,
  onBack,
  className,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      ...INITIAL_STEP1_VALUES,
      ...initialValues,
    },
  });

  const selectedCategory = useWatch({ control, name: "category" });

  // Dynamic subcategories based on chosen category
  const activeCategoryObj = DEMO_CATEGORIES.find(
    (cat) => cat.id === selectedCategory || cat.label === selectedCategory
  );
  const subcategoryOptions = activeCategoryObj
    ? activeCategoryObj.subcategories.map((sub) => ({
        value: sub,
        label: sub,
      }))
    : DEMO_CATEGORIES[0].subcategories.map((sub) => ({
        value: sub,
        label: sub,
      }));

  const categoryOptions = DEMO_CATEGORIES.map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  const employOptions = DEMO_EMPLOY_OPTIONS.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const onSubmit = (data: Step1FormData) => {
    onNext(data);
  };

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
        {/* Logo Field */}
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <LogoUpload
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Business Name Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-800">
            Business Name
          </label>
          <Input
            {...register("businessName")}
            placeholder="Enter business name"
            className={cn(
              "h-10 rounded-xl border-neutral-200 px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-neutral-400 focus-visible:ring-neutral-200/70",
              errors.businessName && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            )}
          />
          {errors.businessName && (
            <p className="text-[11px] font-medium text-destructive mt-1">
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Category Field */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Category"
              placeholder="Select Category"
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setValue("subcategory", ""); // reset subcategory on category change
              }}
              options={categoryOptions}
              error={errors.category?.message}
            />
          )}
        />

        {/* Subcategory Field */}
        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Subcategory"
              placeholder="Select Subcategory"
              value={field.value}
              onChange={field.onChange}
              options={subcategoryOptions}
              error={errors.subcategory?.message}
            />
          )}
        />

        {/* Employ Field */}
        <Controller
          name="employ"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Employ"
              placeholder="Select Subcategory"
              value={field.value}
              onChange={field.onChange}
              options={employOptions}
              error={errors.employ?.message}
            />
          )}
        />

        {/* Submit Button */}
        <SetupSubmitButton disabled={isSubmitting}>
          NEXT
        </SetupSubmitButton>

        {/* Back Button */}
        <BackNavigation onClick={onBack} label="← Back" />
      </form>
    </div>
  );
};
