"use client";

import React from "react";
import { SecondaryNavbar } from "@/components/common";

export interface AddProductSecondaryNavbarProps {
  onCancel?: () => void;
  formId?: string;
  isSubmitting?: boolean;
  className?: string;
}

export const AddProductSecondaryNavbar: React.FC<AddProductSecondaryNavbarProps> = ({
  onCancel,
  formId = "add-product-form",
  isSubmitting = false,
  className,
}) => {
  return (
    <SecondaryNavbar
      className={className}
      leftSlot={
        <div className="flex items-center gap-2.5">
          <button
            type="submit"
            form={formId}
            disabled={isSubmitting}
            id="btn-save-product-top"
            className="px-4 py-2 bg-brand hover:bg-brand/90 disabled:opacity-50 text-white rounded-lg text-xs font-medium shadow-xs transition-all cursor-pointer select-none active:scale-98"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            id="btn-cancel-product-top"
            className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium shadow-xs transition-all cursor-pointer select-none active:scale-98"
          >
            Cancel
          </button>
        </div>
      }
    />
  );
};

export default AddProductSecondaryNavbar;
