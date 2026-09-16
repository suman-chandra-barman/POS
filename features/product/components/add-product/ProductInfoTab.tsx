"use client";

import React, { useRef, useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { ImageIcon, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { type AddProductFormData } from "../../types/addProduct.types";

interface ProductInfoTabProps {
  form: UseFormReturn<AddProductFormData>;
}

export const ProductInfoTab: React.FC<ProductInfoTabProps> = ({ form }) => {
  const { register, control, setValue, watch } = form;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isSale = watch("isSale");
  const isInventory = watch("isInventory");
  const isPOS = watch("isPOS");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setValue("image", url);
      toast.success("Image selected");
    }
  };

  const handleGenerateBarcode = () => {
    const randomBarcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setValue("barcode", randomBarcode);
    toast.success("Barcode generated");
  };

  return (
    <div className="space-y-4">
      {/* ─── Card 1: Product Information ─── */}
      <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Gray Heading Banner */}
        <div className="bg-[#F7F7F7] px-5 py-3.5 border-b border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h3 className="text-xs font-bold text-neutral-800 tracking-tight">
            Product Information
          </h3>

          <div className="flex items-center gap-4 text-xs font-medium text-neutral-700">
            {/* Sale Checkbox */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("isSale")}
                className="sr-only peer"
              />
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-sm border border-neutral-400 bg-white transition-all",
                  isSale && "bg-neutral-900 border-neutral-900 text-white"
                )}
              >
                {isSale && <Check className="size-3 stroke-[2.5]" />}
              </div>
              <span className={cn(isSale ? "text-neutral-900 font-semibold" : "text-neutral-500")}>
                Sale
              </span>
            </label>

            <span className="text-neutral-300">|</span>

            {/* Inventory Checkbox */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("isInventory")}
                className="sr-only peer"
              />
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-sm border border-neutral-400 bg-white transition-all",
                  isInventory && "bg-neutral-900 border-neutral-900 text-white"
                )}
              >
                {isInventory && <Check className="size-3 stroke-[2.5]" />}
              </div>
              <span className={cn(isInventory ? "text-neutral-900 font-semibold" : "text-neutral-500")}>
                Inventory
              </span>
            </label>

            <span className="text-neutral-300">|</span>

            {/* POS Checkbox */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("isPOS")}
                className="sr-only peer"
              />
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-sm border border-neutral-400 bg-white transition-all",
                  isPOS && "bg-neutral-900 border-neutral-900 text-white"
                )}
              >
                {isPOS && <Check className="size-3 stroke-[2.5]" />}
              </div>
              <span className={cn(isPOS ? "text-neutral-900 font-semibold" : "text-neutral-500")}>
                POS
              </span>
            </label>
          </div>
        </div>

        {/* White Body Form Fields */}
        <div className="p-5 space-y-4">
          {/* Product Name/Title & Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Product Name/Title
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                {...register("name")}
                placeholder="Mne's Jeans Pant"
                className="flex-1 h-10 rounded-xl border border-neutral-200/90 bg-white px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all shadow-2xs"
              />

              {/* Image Upload Box */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Upload product image"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/50 hover:bg-neutral-100/70 hover:border-neutral-400 text-neutral-500 hover:text-neutral-800 transition-all cursor-pointer overflow-hidden shadow-2xs"
              >
                {previewImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-5 stroke-[1.8]" />
                )}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Enter product description..."
              className="w-full rounded-xl border border-neutral-200/90 bg-white p-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all resize-none shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* ─── Card 2: Stock/Inventory ─── */}
      <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Gray Heading Banner */}
        <div className="bg-[#F7F7F7] px-5 py-3.5 border-b border-neutral-200/90">
          <h3 className="text-xs font-bold text-neutral-800 tracking-tight">
            Stock/Inventory
          </h3>
        </div>

        {/* White Body Form */}
        <div className="p-5">
          <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
            Quantity on hand
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              {...register("quantityOnHand", { valueAsNumber: true })}
              placeholder="0.00"
              className="w-full h-10 rounded-xl border border-neutral-200/90 bg-white pl-8 pr-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all shadow-2xs"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-medium">
              €
            </span>
          </div>
        </div>
      </div>

      {/* ─── Card 3: Category ─── */}
      <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Gray Heading Banner */}
        <div className="bg-[#F7F7F7] px-5 py-3.5 border-b border-neutral-200/90">
          <h3 className="text-xs font-bold text-neutral-800 tracking-tight">
            Category
          </h3>
        </div>

        {/* White Body Form */}
        <div className="p-5 space-y-4">
          {/* Row 1: Category, Subcategory, Collection selects with Add + buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Category
              </label>
              <div className="flex items-center rounded-xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <div className="relative flex-1">
                      <select
                        {...field}
                        className="w-full h-9 bg-transparent pl-3 pr-7 text-xs text-neutral-800 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        <option value="Men's Pant">Men&apos;s Pant</option>
                        <option value="Boy's Shirt">Boy&apos;s Shirt</option>
                        <option value="Kid's Pant">Kid&apos;s Pant</option>
                        <option value="Ladies T-shirt">Ladies T-shirt</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={() => toast.info("Add new category modal")}
                  className="h-9 px-3 border-l border-neutral-200 bg-neutral-50/70 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                >
                  Add +
                </button>
              </div>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Subcategory
              </label>
              <div className="flex items-center rounded-xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
                <Controller
                  control={control}
                  name="subcategory"
                  render={({ field }) => (
                    <div className="relative flex-1">
                      <select
                        {...field}
                        className="w-full h-9 bg-transparent pl-3 pr-7 text-xs text-neutral-800 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Casual">Casual</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={() => toast.info("Add new subcategory modal")}
                  className="h-9 px-3 border-l border-neutral-200 bg-neutral-50/70 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                >
                  Add +
                </button>
              </div>
            </div>

            {/* Collection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                Collection
              </label>
              <div className="flex items-center rounded-xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
                <Controller
                  control={control}
                  name="collection"
                  render={({ field }) => (
                    <div className="relative flex-1">
                      <select
                        {...field}
                        className="w-full h-9 bg-transparent pl-3 pr-7 text-xs text-neutral-800 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Collection</option>
                        <option value="Summer 2026">Summer 2026</option>
                        <option value="Winter Special">Winter Special</option>
                        <option value="New Arrival">New Arrival</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400" />
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={() => toast.info("Add new collection modal")}
                  className="h-9 px-3 border-l border-neutral-200 bg-neutral-50/70 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Barcode & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Barcode */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-800">
                  Barcode
                </label>
                <button
                  type="button"
                  onClick={handleGenerateBarcode}
                  className="text-xs font-semibold text-[#0095FF] hover:underline cursor-pointer"
                >
                  Generate
                </button>
              </div>
              <input
                type="text"
                {...register("barcode")}
                placeholder="120010065000"
                className="w-full h-10 rounded-xl border border-neutral-200/90 bg-white px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                SKU
              </label>
              <input
                type="text"
                {...register("sku")}
                placeholder="12001006501"
                className="w-full h-10 rounded-xl border border-neutral-200/90 bg-white px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-sky-500 focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
