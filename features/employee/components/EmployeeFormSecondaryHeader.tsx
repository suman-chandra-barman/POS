"use client";

import React from "react";

interface EmployeeFormSecondaryHeaderProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const EmployeeFormSecondaryHeader: React.FC<EmployeeFormSecondaryHeaderProps> = ({
  onSave,
  onCancel,
  isSaving = false,
}) => {
  return (
    <div className="w-full bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-98 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          {isSaving ? "Saving..." : "Save Employee"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200/90 rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>


    </div>
  );
};

export default EmployeeFormSecondaryHeader;
