"use client";

import React from "react";
import { X } from "lucide-react";

interface CreateBackorderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBackorder: () => void;
  onNoBackorder: () => void;
}

export const CreateBackorderDialog: React.FC<CreateBackorderDialogProps> = ({
  isOpen,
  onClose,
  onCreateBackorder,
  onNoBackorder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 sm:p-6 z-10 animate-in fade-in zoom-in-95 duration-150 select-none">
        {/* Header with Title & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900">
            Create Backorder?
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-2 text-xs">
          <p className="font-bold text-neutral-900">
            You have processed less products than the initial demand.
          </p>
          <p className="text-neutral-500 leading-relaxed">
            Create a backorder if you expect to process the remaining products
            later. Do not create a backorder if you will not process the
            remaining products.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreateBackorder}
            className="px-3.5 py-1.5 rounded-lg bg-[#007aff] hover:bg-blue-600 text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
          >
            Create Backorder
          </button>
          <button
            type="button"
            onClick={onNoBackorder}
            className="px-3.5 py-1.5 rounded-lg bg-[#800020] hover:bg-[#66001a] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
          >
            No Backorder
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBackorderDialog;
