"use client";

import React, { useRef } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { ResumeFormData } from "../types/employee.types";

interface ResumeTabContentProps {
  data: ResumeFormData;
  onChange: (data: ResumeFormData) => void;
}

export const ResumeTabContent: React.FC<ResumeTabContentProps> = ({
  data,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString(),
        fileUrl: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 tracking-wide">
            Upload Resume
          </label>
        </div>
        <div className="md:col-span-9">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-neutral-200/90 rounded-2xl bg-white p-12 flex flex-col items-center justify-center text-center hover:bg-neutral-50/50 hover:border-neutral-300 transition-all cursor-pointer group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.mp4,.mp3"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Cloud Upload Icon */}
            <div className="size-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:scale-105 transition-transform mb-4">
              <UploadCloud className="size-6 stroke-[1.8]" />
            </div>

            <p className="text-xs font-bold text-neutral-900">
              Choose a file or drag &amp; drop it here.
            </p>
            <p className="text-[11px] text-neutral-400 mt-1 mb-5">
              Audio and MP4 formats are supported across the platform.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Browse File
            </button>

            {data.fileName && (
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="size-4" />
                <span>
                  {data.fileName} ({data.fileSize})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTabContent;
