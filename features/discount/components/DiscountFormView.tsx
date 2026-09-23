"use client";

import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import {
  DISCOUNT_CHANNELS,
  DISCOUNT_VALUE_TYPES,
  DISCOUNT_APPLIES_TO,
  DISCOUNT_ELIGIBILITY,
  discountFormSchema,
  type DiscountFormValues,
  type DiscountChannel,
} from "../types/discount.types";
import { SAMPLE_PRODUCTS, SAMPLE_CUSTOMERS } from "../data/discountMockData";
import { DiscountProductSelector } from "./DiscountProductSelector";
import { DiscountCustomerSelector } from "./DiscountCustomerSelector";
import { cn } from "@/lib/utils";

interface DiscountFormViewProps {
  onSave: (data: DiscountFormValues) => void;
  onCancel: () => void;
  onAddCoupons?: () => void;
  formId?: string;
}

export const DiscountFormView: React.FC<DiscountFormViewProps> = ({
  onSave,
  onCancel,
  onAddCoupons,
  formId = "discount-form",
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      channels: [DISCOUNT_CHANNELS.POS],
      title: "",
      posBranch: "All POS",
      startDate: "2026-05-12",
      startTime: "09:25",
      hasEndDate: false,
      endDate: "2026-06-12",
      endTime: "23:59",
      valueType: "percentage",
      discountValue: "20",
      appliesTo: "selected_products",
      selectedProducts: SAMPLE_PRODUCTS.slice(0, 4),
      eligibility: "specific_customer",
      selectedCustomers: SAMPLE_CUSTOMERS.slice(0, 4),
      minRequirementType: "amount",
      minPurchaseAmount: "00.00",
      limitTotalUses: true,
      totalUsesCount: "0",
      limitOnePerCustomer: true,
    },
  });

  const selectedChannels = useWatch({ control, name: "channels" });
  const hasEndDate = useWatch({ control, name: "hasEndDate" });
  const valueType = useWatch({ control, name: "valueType" });
  const appliesTo = useWatch({ control, name: "appliesTo" });
  const eligibility = useWatch({ control, name: "eligibility" });
  const minRequirementType = useWatch({ control, name: "minRequirementType" });
  const limitTotalUses = useWatch({ control, name: "limitTotalUses" });

  const toggleChannel = (channel: DiscountChannel) => {
    const current = selectedChannels || [];
    const updated = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    setValue("channels", updated, { shouldValidate: true });
  };

  const onSubmit = (data: DiscountFormValues) => {
    onSave(data);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      {/* Action Buttons for Mobile or In-Form view */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          type="submit"
          className="h-8.5 px-4 rounded-xl bg-[#0080f6] hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-8.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Main Discount Form Card */}
      <div className="w-full max-w-3xl mx-auto rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-6">
        {/* Card Header: Title + Add Coupons Button */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
            Discount / Gift
          </h2>
          <button
            type="button"
            onClick={
              onAddCoupons ||
              (() => toast.info("Add Coupons flow will be configured next!"))
            }
            className="h-8 px-3.5 rounded-lg bg-[#f4f4f6] hover:bg-neutral-200/80 text-neutral-700 text-xs font-medium transition-colors cursor-pointer"
          >
            Add Coupons
          </button>
        </div>

        {/* ── Section 1: Apply on, Title, POS, Dates ── */}
        <div className="space-y-4">
          {/* Apply on channels */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-semibold text-neutral-800">
              Apply on
            </label>
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-neutral-600">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedChannels?.includes(DISCOUNT_CHANNELS.POS)}
                  onChange={() => toggleChannel(DISCOUNT_CHANNELS.POS)}
                  className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
                />
                <span>Point of sale</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedChannels?.includes(DISCOUNT_CHANNELS.SALES)}
                  onChange={() => toggleChannel(DISCOUNT_CHANNELS.SALES)}
                  className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
                />
                <span>Sales</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedChannels?.includes(DISCOUNT_CHANNELS.WEBSITE)}
                  onChange={() => toggleChannel(DISCOUNT_CHANNELS.WEBSITE)}
                  className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
                />
                <span>Website</span>
              </label>
            </div>
          </div>
          {errors.channels && (
            <p className="text-[11px] font-medium text-destructive">
              {errors.channels.message}
            </p>
          )}

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="e.g. 10% Summer Discount"
              className={cn(
                "h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70",
                errors.title &&
                  "border-destructive focus:border-destructive focus:ring-destructive/20"
              )}
            />
            {errors.title && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Point of sale dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Point of sale
            </label>
            <div className="relative">
              <select
                {...register("posBranch")}
                className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 pr-8 cursor-pointer"
              >
                <option value="All POS">All POS</option>
                <option value="Dhaka Main Branch">Dhaka Main Branch</option>
                <option value="Chittagong Hub">Chittagong Hub</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 size-3.5 text-neutral-400" />
            </div>
            {errors.posBranch && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.posBranch.message}
              </p>
            )}
          </div>

          {/* Start Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-800">
                Start date
              </label>
              <input
                type="date"
                {...register("startDate")}
                className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 cursor-pointer"
              />
              {errors.startDate && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-800">
                Time
              </label>
              <input
                type="time"
                {...register("startTime")}
                className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 cursor-pointer"
              />
              {errors.startTime && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.startTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Set end date checkbox */}
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
              <input
                type="checkbox"
                {...register("hasEndDate")}
                className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
              />
              <span>Set end date</span>
            </label>

            {hasEndDate && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 animate-in fade-in-0 duration-150">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-800">
                    End date
                  </label>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-800">
                    End time
                  </label>
                  <input
                    type="time"
                    {...register("endTime")}
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

        {/* ── Section 2: Discount value & Select applies ── */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Discount value
            </label>
            <div className="flex items-center gap-3">
              {/* Type Dropdown */}
              <div className="relative flex-1">
                <select
                  {...register("valueType")}
                  className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 pr-8 cursor-pointer"
                >
                  <option value={DISCOUNT_VALUE_TYPES.PERCENTAGE}>
                    Percentage
                  </option>
                  <option value={DISCOUNT_VALUE_TYPES.FIXED}>
                    Fixed amount
                  </option>
                </select>
                <ChevronsUpDown className="pointer-events-none absolute right-3 top-3.5 size-3.5 text-neutral-400" />
              </div>

              {/* Number Value input */}
              <div className="relative w-28 sm:w-32">
                <input
                  type="number"
                  {...register("discountValue")}
                  placeholder="--"
                  className={cn(
                    "h-10 w-full rounded-xl border border-neutral-200 bg-white pl-3.5 pr-7 text-xs text-neutral-900 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 text-right",
                    errors.discountValue &&
                      "border-destructive focus:border-destructive"
                  )}
                />
                <span className="pointer-events-none absolute right-3 top-3 text-xs text-neutral-500 font-medium">
                  {valueType === "percentage" ? "%" : "৳"}
                </span>
              </div>
            </div>
            {errors.discountValue && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.discountValue.message}
              </p>
            )}
          </div>

          {/* Select applies */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Select applies
            </label>
            <div className="relative">
              <select
                {...register("appliesTo")}
                className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 pr-8 cursor-pointer"
              >
                <option value={DISCOUNT_APPLIES_TO.ALL_PRODUCTS}>
                  All Products
                </option>
                <option value={DISCOUNT_APPLIES_TO.SPECIFIC_COLLECTION}>
                  Specific Collection
                </option>
                <option value={DISCOUNT_APPLIES_TO.SELECTED_PRODUCTS}>
                  Selected Products
                </option>
              </select>
              <ChevronsUpDown className="pointer-events-none absolute right-3 top-3.5 size-3.5 text-neutral-400" />
            </div>

            {/* Product Selector with Browse & Tags */}
            {appliesTo === "selected_products" && (
              <Controller
                control={control}
                name="selectedProducts"
                render={({ field }) => (
                  <DiscountProductSelector
                    selectedProducts={field.value}
                    onChange={field.onChange}
                    className="mt-2.5"
                  />
                )}
              />
            )}
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

        {/* ── Section 3: Eligibility ── */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Eligibility
            </label>
            <div className="relative">
              <select
                {...register("eligibility")}
                className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 text-xs text-neutral-800 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70 pr-8 cursor-pointer"
              >
                <option value={DISCOUNT_ELIGIBILITY.ALL_CUSTOMERS}>
                  All customer
                </option>
                <option value={DISCOUNT_ELIGIBILITY.SPECIFIC_CUSTOMER}>
                  Specific customer
                </option>
              </select>
              <ChevronsUpDown className="pointer-events-none absolute right-3 top-3.5 size-3.5 text-neutral-400" />
            </div>

            {/* Customer Selector with Browse & Tags */}
            {eligibility === "specific_customer" && (
              <Controller
                control={control}
                name="selectedCustomers"
                render={({ field }) => (
                  <DiscountCustomerSelector
                    selectedCustomers={field.value}
                    onChange={field.onChange}
                    className="mt-2.5"
                  />
                )}
              />
            )}
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

        {/* ── Section 4: Minimum purchase requirements ── */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-neutral-800">
            Minimum purchase requirements
          </label>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
              <input
                type="radio"
                value="none"
                {...register("minRequirementType")}
                className="size-3.5 text-sky-600 focus:ring-sky-500"
              />
              <span>No minimum requirements</span>
            </label>

            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                <input
                  type="radio"
                  value="amount"
                  {...register("minRequirementType")}
                  className="size-3.5 text-sky-600 focus:ring-sky-500"
                />
                <span>Minimum purchase amount (৳)</span>
              </label>

              {minRequirementType === "amount" && (
                <div className="ml-5.5 mt-2 space-y-1">
                  <div className="relative w-36">
                    <span className="pointer-events-none absolute left-3 top-2.5 text-xs text-neutral-400">
                      ৳
                    </span>
                    <input
                      type="text"
                      {...register("minPurchaseAmount")}
                      className="h-9 w-full rounded-xl border border-neutral-200 bg-white pl-7 pr-3 text-xs text-neutral-900 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Applies only to selected collections.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

        {/* ── Section 5: Maximum discount uses ── */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-neutral-800">
            Maximum discount uses
          </label>

          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                <input
                  type="checkbox"
                  {...register("limitTotalUses")}
                  className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
                />
                <span>
                  Limit number of times this discount can be used in total
                </span>
              </label>

              {limitTotalUses && (
                <div className="ml-5.5 mt-2 space-y-1">
                  <input
                    type="number"
                    {...register("totalUsesCount")}
                    className="h-9 w-28 rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900 outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200/70"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Applies only to selected collections.
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
              <input
                type="checkbox"
                {...register("limitOnePerCustomer")}
                className="rounded border-neutral-300 text-sky-600 focus:ring-sky-500 size-3.5"
              />
              <span>Limit to one use per customer</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
