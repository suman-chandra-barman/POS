"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PlusSquare, Check } from "lucide-react";
import { toast } from "sonner";
import {
  type AddProductFormData,
  type VariantAttribute,
  type VariantTag,
} from "../../types/addProduct.types";
import { VariantRowItem } from "./VariantRowItem";

interface VariantsTabProps {
  form: UseFormReturn<AddProductFormData>;
}

const generateVariantId = (name: string) =>
  `var-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

export const VariantsTab: React.FC<VariantsTabProps> = ({ form }) => {
  const { watch, setValue } = form;
  const variants = watch("variants") || [];

  const [isAddingAttribute, setIsAddingAttribute] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState("");

  const handleRemoveVariant = (variantId: string) => {
    const updated = variants.filter((v) => v.id !== variantId);
    setValue("variants", updated);
    toast.success("Variant removed");
  };

  const handleAddTag = (variantId: string, tag: VariantTag) => {
    const updated = variants.map((v) => {
      if (v.id === variantId) {
        return { ...v, tags: [...v.tags, tag] };
      }
      return v;
    });
    setValue("variants", updated);
  };

  const handleRemoveTag = (variantId: string, tagId: string) => {
    const updated = variants.map((v) => {
      if (v.id === variantId) {
        return { ...v, tags: v.tags.filter((t) => t.id !== tagId) };
      }
      return v;
    });
    setValue("variants", updated);
  };

  const handleCreateAttribute = () => {
    if (!newAttributeName.trim()) {
      setIsAddingAttribute(false);
      return;
    }

    const newVariant: VariantAttribute = {
      id: generateVariantId(newAttributeName.trim()),
      name: newAttributeName.trim(),
      tags: [],
    };

    setValue("variants", [...variants, newVariant]);
    setNewAttributeName("");
    setIsAddingAttribute(false);
    toast.success(`Added ${newVariant.name} variant`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Gray Header Banner */}
        <div className="bg-[#F7F7F7] px-5 py-3.5 border-b border-neutral-200/90">
          <h3 className="text-xs font-bold text-neutral-800 tracking-tight">
            Variants
          </h3>
        </div>

        {/* White Body */}
        <div className="p-5">
          {/* Variants List Box */}
          <div className="rounded-xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
            {/* Table Header Row */}
            <div className="bg-[#F7F7F7] px-4 py-2.5 border-b border-neutral-200/90">
              <span className="text-xs font-semibold text-neutral-700">Title</span>
            </div>

            {/* Variant Rows */}
            <div className="divide-y divide-neutral-100/90">
              {variants.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No variants added yet. Click below to add variant options.
                </div>
              ) : (
                variants.map((variant) => (
                  <VariantRowItem
                    key={variant.id}
                    variant={variant}
                    onRemoveVariant={handleRemoveVariant}
                    onAddTag={handleAddTag}
                    onRemoveTag={handleRemoveTag}
                  />
                ))
              )}
            </div>

            {/* Footer Add Attribute Row */}
            <div className="p-3 bg-[#F7F7F7] border-t border-neutral-200/90">
              {isAddingAttribute ? (
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={newAttributeName}
                    onChange={(e) => setNewAttributeName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateAttribute();
                      } else if (e.key === "Escape") {
                        setIsAddingAttribute(false);
                      }
                    }}
                    autoFocus
                    placeholder="Variant name (e.g. Material, Pattern)..."
                    className="flex-1 h-8 rounded-lg border border-neutral-300 bg-white px-2.5 text-xs text-neutral-900 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleCreateAttribute}
                    className="flex size-8 items-center justify-center rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-medium cursor-pointer"
                  >
                    <Check className="size-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingAttribute(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 hover:text-sky-600 transition-colors cursor-pointer select-none"
                >
                  <PlusSquare className="size-4 text-neutral-700" />
                  <span>Add more colours, sizes, and other product variants.</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
