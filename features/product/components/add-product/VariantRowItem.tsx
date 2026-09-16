"use client";

import React, { useState } from "react";
import { Plus, X, Trash2, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantAttribute, type VariantTag } from "../../types/addProduct.types";

interface VariantRowItemProps {
  variant: VariantAttribute;
  onRemoveVariant: (variantId: string) => void;
  onAddTag: (variantId: string, tag: VariantTag) => void;
  onRemoveTag: (variantId: string, tagId: string) => void;
}

const generateTagId = (label: string) =>
  `tag-${label.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

export const VariantRowItem: React.FC<VariantRowItemProps> = ({
  variant,
  onRemoveVariant,
  onAddTag,
  onRemoveTag,
}) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const handleCreateTag = () => {
    if (!newTagInput.trim()) {
      setIsAddingTag(false);
      return;
    }

    const newTag: VariantTag = {
      id: generateTagId(newTagInput.trim()),
      label: newTagInput.trim(),
      colorClass:
        variant.name.toLowerCase() === "colour"
          ? newTagInput.toLowerCase() === "red"
            ? "bg-[#FFE4E6] text-[#E11D48]"
            : newTagInput.toLowerCase() === "green"
            ? "bg-[#DCFCE7] text-[#16A34A]"
            : "bg-sky-50 text-sky-600"
          : "bg-neutral-100 text-neutral-700",
    };

    onAddTag(variant.id, newTag);
    setNewTagInput("");
    setIsAddingTag(false);
  };

  return (
    <div className="p-3.5 border-b border-neutral-100/90 last:border-b-0 hover:bg-neutral-50/40 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Variant Name & Tag List */}
        <div className="space-y-2 flex-1">
          <span className="block text-xs font-semibold text-neutral-800">
            {variant.name}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tag Pills */}
            {variant.tags.map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors shadow-2xs select-none",
                  tag.colorClass || "bg-neutral-100 text-neutral-700"
                )}
              >
                <span>{tag.label}</span>
                <button
                  type="button"
                  onClick={() => onRemoveTag(variant.id, tag.id)}
                  className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                  title="Remove tag"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}

            {/* Inline Add Tag Input / Button */}
            {isAddingTag ? (
              <div className="inline-flex items-center gap-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCreateTag();
                    } else if (e.key === "Escape") {
                      setIsAddingTag(false);
                    }
                  }}
                  autoFocus
                  placeholder="Value..."
                  className="h-6 w-20 rounded-md border border-neutral-300 bg-white px-1.5 text-xs text-neutral-800 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleCreateTag}
                  className="flex size-6 items-center justify-center rounded-md bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <Check className="size-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTag(true)}
                title="Add value"
                className="flex size-6 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 hover:text-neutral-900 hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <Plus className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons (Configure & Delete) */}
        <div className="flex items-center gap-2 text-neutral-400">
          <button
            type="button"
            className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
            title="Configure variant"
          >
            <SlidersHorizontal className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onRemoveVariant(variant.id)}
            className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
            title="Delete variant"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
