"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AddProductFormSchema,
  type AddProductFormData,
  type AddProductActiveTab,
} from "../../types/addProduct.types";
import { AddProductTabsHeader } from "./AddProductTabsHeader";
import { ProductInfoTab } from "./ProductInfoTab";
import { PriceTaxTab } from "./PriceTaxTab";
import { VariantsTab } from "./VariantsTab";

const INITIAL_VARIANT_DATA = [
  {
    id: "variant-1",
    name: "Colour",
    tags: [
      { id: "c1", label: "Red", colorClass: "bg-[#FFE4E6] text-[#E11D48]" },
      { id: "c2", label: "Green", colorClass: "bg-[#DCFCE7] text-[#16A34A]" },
    ],
  },
  {
    id: "variant-2",
    name: "Fabric",
    tags: [
      { id: "f1", label: "Cotton", colorClass: "bg-neutral-100 text-neutral-700" },
      { id: "f2", label: "Pilaster", colorClass: "bg-neutral-100 text-neutral-700" },
    ],
  },
  {
    id: "variant-3",
    name: "Size",
    tags: [
      { id: "s1", label: "XS", colorClass: "bg-neutral-100 text-neutral-700" },
      { id: "s2", label: "S", colorClass: "bg-neutral-100 text-neutral-700" },
      { id: "s3", label: "M", colorClass: "bg-neutral-100 text-neutral-700" },
      { id: "s4", label: "L", colorClass: "bg-neutral-100 text-neutral-700" },
    ],
  },
];

export const AddProductContainer: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<AddProductActiveTab>("product");

  const form = useForm<AddProductFormData>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isSale: true,
      isInventory: false,
      isPOS: true,
      quantityOnHand: 0,
      category: "",
      subcategory: "",
      collection: "",
      barcode: "",
      sku: "",
      sellingPrice: 0,
      taxPercent: 0,
      cost: 0,
      variants: INITIAL_VARIANT_DATA,
    },
  });

  const onSubmit = (data: AddProductFormData) => {
    toast.success(`Product "${data.name}" created successfully!`);
    router.push(`/${locale}/product`);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] px-4 sm:px-6 py-6 pb-36">
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push(`/${locale}/product`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Tab Selector Card */}
        <AddProductTabsHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Form Form Body */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {activeTab === "product" && <ProductInfoTab form={form} />}
          {activeTab === "price-tax" && <PriceTaxTab form={form} />}
          {activeTab === "variants" && <VariantsTab form={form} />}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/${locale}/product`)}
              className="rounded-xl h-10 px-5 text-xs font-semibold cursor-pointer"
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-10 px-6 text-xs font-semibold bg-[#232323] hover:bg-neutral-800 text-white gap-2 cursor-pointer shadow-xs"
            >
              <Save className="size-3.5" />
              <span>Save Product</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductContainer;
