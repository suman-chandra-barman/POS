"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PersonalFormData } from "../types/employee.types";
import { RELATION_OPTIONS } from "../data/employeeMockData";
import { PhoneInputCustom } from "@/features/accout-setup/components/PhoneInputCustom";
import { DocumentUploadField } from "./DocumentUploadField";

interface PersonalTabContentProps {
  data: PersonalFormData;
  onChange: (data: PersonalFormData) => void;
}

export const PersonalTabContent: React.FC<PersonalTabContentProps> = ({
  data,
  onChange,
}) => {
  const [relationOpen, setRelationOpen] = useState(false);

  return (
    <div className="space-y-6 pt-2">
      {/* ── EMERGENCY CONTACT SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            EMERGENCY CONTACT
          </label>
        </div>
        <div className="md:col-span-9 space-y-4">
          {/* Select relation */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Select relation
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRelationOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-left text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
              >
                <span
                  className={cn(!data.emergencyRelation && "text-neutral-400")}
                >
                  {data.emergencyRelation || "e. g. Father"}
                </span>
                <ChevronDown className="size-4 text-neutral-400" />
              </button>

              {relationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setRelationOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {RELATION_OPTIONS.map((rel) => (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => {
                          onChange({ ...data, emergencyRelation: rel });
                          setRelationOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                      >
                        <span>{rel}</span>
                        {data.emergencyRelation === rel && (
                          <Check className="size-3.5 text-sky-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Emergency Phone — shared PhoneInputCustom with BD default & full country search */}
          <PhoneInputCustom
            value={data.emergencyPhone}
            onChange={(val) => onChange({ ...data, emergencyPhone: val })}
            defaultCountry="BD"
            placeholder="(555) 000-0000"
          />

          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Address
            </label>
            <input
              type="text"
              value={data.emergencyAddress}
              onChange={(e) =>
                onChange({ ...data, emergencyAddress: e.target.value })
              }
              placeholder="Write full address"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* ── DOCUMENTS SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            DOCUMENTS
          </label>
        </div>
        <div className="md:col-span-9 space-y-4">
          <DocumentUploadField
            label="ID Card Copy"
            placeholder="upload employ national ID copy"
            fileName={data.idCardCopy}
            previewUrl={data.idCardCopyUrl}
            onFileChange={(name, url) =>
              onChange({ ...data, idCardCopy: name, idCardCopyUrl: url })
            }
            onRemove={() =>
              onChange({ ...data, idCardCopy: "", idCardCopyUrl: "" })
            }
          />

          <DocumentUploadField
            label="Driving License"
            placeholder="upload employ driving license copy"
            fileName={data.drivingLicense}
            previewUrl={data.drivingLicenseUrl}
            onFileChange={(name, url) =>
              onChange({ ...data, drivingLicense: name, drivingLicenseUrl: url })
            }
            onRemove={() =>
              onChange({ ...data, drivingLicense: "", drivingLicenseUrl: "" })
            }
          />

          <DocumentUploadField
            label="Passport"
            placeholder="upload employ passport copy"
            fileName={data.passport}
            previewUrl={data.passportUrl}
            onFileChange={(name, url) =>
              onChange({ ...data, passport: name, passportUrl: url })
            }
            onRemove={() =>
              onChange({ ...data, passport: "", passportUrl: "" })
            }
          />
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* ── SOCIAL MEDIA SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 tracking-wide">
            Social Media
          </label>
        </div>
        <div className="md:col-span-9 space-y-4">
          {/* Facebook */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Facebook
            </label>
            <div className="flex rounded-xl border border-neutral-200/90 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
              <span className="px-3.5 py-2.5 bg-neutral-50 text-neutral-400 text-xs border-r border-neutral-200 select-none">
                https://
              </span>
              <input
                type="text"
                value={data.facebook}
                onChange={(e) => onChange({ ...data, facebook: e.target.value })}
                placeholder="www.example.com"
                className="flex-1 px-3.5 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Instagram
            </label>
            <div className="flex rounded-xl border border-neutral-200/90 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
              <span className="px-3.5 py-2.5 bg-neutral-50 text-neutral-400 text-xs border-r border-neutral-200 select-none">
                https://
              </span>
              <input
                type="text"
                value={data.instagram}
                onChange={(e) => onChange({ ...data, instagram: e.target.value })}
                placeholder="www.example.com"
                className="flex-1 px-3.5 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Linkedin */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Linkedin
            </label>
            <div className="flex rounded-xl border border-neutral-200/90 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
              <span className="px-3.5 py-2.5 bg-neutral-50 text-neutral-400 text-xs border-r border-neutral-200 select-none">
                https://
              </span>
              <input
                type="text"
                value={data.linkedin}
                onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
                placeholder="www.example.com"
                className="flex-1 px-3.5 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* ── NOTE SECTION ── */}
      <div>
        <label className="block text-xs font-bold text-neutral-800 mb-2">
          Note
        </label>
        <textarea
          rows={5}
          value={data.note}
          onChange={(e) => onChange({ ...data, note: e.target.value })}
          placeholder=""
          className="w-full p-3.5 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-y"
        />
      </div>
    </div>
  );
};

export default PersonalTabContent;
