"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X, ArrowUpFromLine } from "lucide-react";

interface DocumentUploadFieldProps {
  label: string;
  placeholder: string;
  fileName: string;
  previewUrl: string;
  onFileChange: (fileName: string, previewUrl: string) => void;
  onRemove: () => void;
  accept?: string;
}

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label,
  placeholder,
  fileName,
  previewUrl,
  onFileChange,
  onRemove,
  accept = "image/*,.pdf",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onFileChange(file.name, url);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const isPdf = fileName.toLowerCase().endsWith(".pdf");

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1.5">
        {label}
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Preview state: image uploaded */}
      {previewUrl && !isPdf ? (
        <div className="relative flex items-center gap-2.5 h-10 w-full px-3 bg-white border border-neutral-200/90 rounded-xl group transition-all hover:border-neutral-300">
          {/* Image thumbnail */}
          <div
            className="size-6 rounded-md overflow-hidden relative shrink-0 border border-neutral-200 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <Image
              src={previewUrl}
              alt={fileName}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>

          {/* Filename */}
          <span
            className="flex-1 text-xs text-neutral-800 truncate cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {fileName}
          </span>

          {/* Remove button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="shrink-0 size-6 flex items-center justify-center rounded-md bg-neutral-100 hover:bg-rose-100 text-neutral-500 hover:text-rose-600 transition-colors cursor-pointer"
            aria-label="Remove file"
          >
            <X className="size-3 stroke-[2.5]" />
          </button>
        </div>
      ) : previewUrl && isPdf ? (
        /* PDF uploaded state */
        <div className="relative flex items-center gap-2.5 h-10 w-full px-3 bg-white border border-neutral-200/90 rounded-xl group transition-all hover:border-neutral-300">
          {/* PDF icon */}
          <div
            className="size-6 rounded-md overflow-hidden shrink-0 border border-red-200 bg-red-50 flex items-center justify-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <span className="text-[8px] font-bold text-red-500 uppercase">
              PDF
            </span>
          </div>

          <span
            className="flex-1 text-xs text-neutral-800 truncate cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {fileName}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="shrink-0 size-6 flex items-center justify-center rounded-md bg-neutral-100 hover:bg-rose-100 text-neutral-500 hover:text-rose-600 transition-colors cursor-pointer"
            aria-label="Remove file"
          >
            <X className="size-3 stroke-[2.5]" />
          </button>
        </div>
      ) : (
        /* Empty state: clickable upload field matching the reference design */
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex items-center h-10 w-full pl-3.5 pr-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs cursor-pointer hover:border-neutral-300 transition-all group"
        >
          {/* Placeholder text */}
          <span className="flex-1 text-neutral-400 truncate">{placeholder}</span>

          {/* Upload icon button — matches reference design: rounded square with upload arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="shrink-0 size-7 flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 group-hover:bg-neutral-100 text-neutral-500 group-hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label={`Upload ${label}`}
          >
            <ArrowUpFromLine className="size-3.5 stroke-[1.8]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadField;
