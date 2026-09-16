"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { SquarePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export const LogoUpload: React.FC<LogoUploadProps> = ({
  value,
  onChange,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(url);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <label className="block text-xs font-semibold text-neutral-800">
        Logo
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-12 w-full cursor-pointer items-center justify-between rounded-xl bg-[#f4f4f6] px-3.5 transition-colors hover:bg-neutral-200/60"
        >
          <div className="flex items-center gap-3">
            <div className="relative size-8 overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <Image
                src={preview}
                alt="Logo preview"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-neutral-700 truncate max-w-50">
              Business Logo Selected
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="flex size-6 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-300/60 hover:text-neutral-700 transition-colors"
            title="Remove logo"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#f4f4f6] text-neutral-700 transition-colors hover:bg-neutral-200/60 active:scale-[0.99]"
        >
          <SquarePlus className="size-4 text-neutral-700" strokeWidth={1.8} />
          <span className="text-xs font-medium tracking-tight">Upload</span>
        </button>
      )}
    </div>
  );
};
