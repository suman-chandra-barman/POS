"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  EmployeeFormData,
  EMPLOYEE_TABS,
  type EmployeeTab,
} from "../types/employee.types";
import { PhoneInputCustom } from "@/features/accout-setup/components/PhoneInputCustom";
import { TagInput } from "./TagInput";
import { WorkTabContent } from "./WorkTabContent";
import { PersonalTabContent } from "./PersonalTabContent";
import { ResumeTabContent } from "./ResumeTabContent";
import { PayrollTabContent } from "./PayrollTabContent";
import { SettingsTabContent } from "./SettingsTabContent";

interface EmployeeDetailsCardProps {
  formData: EmployeeFormData;
  onChange: (formData: EmployeeFormData) => void;
  activeTab: EmployeeTab;
  onTabChange: (tab: EmployeeTab) => void;
}

const TABS: { key: EmployeeTab; label: string }[] = [
  { key: EMPLOYEE_TABS.WORK, label: "Work" },
  { key: EMPLOYEE_TABS.PERSONAL, label: "Personal" },
  { key: EMPLOYEE_TABS.RESUME, label: "Resume" },
  { key: EMPLOYEE_TABS.PAYROLL, label: "Payroll" },
  { key: EMPLOYEE_TABS.SETTINGS, label: "Settings" },
];

export const EmployeeDetailsCard: React.FC<EmployeeDetailsCardProps> = ({
  formData,
  onChange,
  activeTab,
  onTabChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...formData, avatarUrl: url });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Title */}
      <h3 className="text-sm font-bold text-neutral-900">Employ Details</h3>

      {/* Top Common Form Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Left Side Avatar upload Section */}
        <div className="shrink-0 flex flex-col justify-between w-full sm:w-44 gap-3.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-36 sm:h-38 rounded-3xl bg-[#f8f9fb] hover:bg-[#f1f3f6] border border-dashed border-neutral-300 flex items-center justify-center overflow-hidden relative cursor-pointer group transition-colors shadow-2xs"
          >
            {formData.avatarUrl ? (
              <Image
                src={formData.avatarUrl}
                alt="Uploaded avatar"
                fill
                sizes="176px"
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-neutral-400 group-hover:text-neutral-500 transition-transform group-hover:scale-105 duration-200">
                <svg
                  className="size-16 sm:size-18"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34 14H20C15.5817 14 12 17.5817 12 22V42C12 46.4183 15.5817 50 20 50H44C48.4183 50 52 46.4183 52 42V32"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M48 10V24M41 17H55"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 42.5C18.5 35 25 32 34 34.5C40 36 45 32 49 28V42C49 46.4183 45.4183 50 41 50H20.5C16.3579 50 13 46.6421 13 42.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-11 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer flex items-center justify-center"
          >
            Upload Image
          </button>
        </div>

        {/* Right Side inputs*/}
        <div className="flex-1 w-full space-y-3.5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              placeholder="Enter employ name"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          {/* E-mail & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* E-mail */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  onChange({ ...formData, email: e.target.value })
                }
                placeholder="hello@alignui.com"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            {/* Phone — uses shared PhoneInputCustom with BD default */}
            <PhoneInputCustom
              value={formData.phone}
              onChange={(val) => onChange({ ...formData, phone: val })}
              defaultCountry="BD"
              placeholder="(555) 000-0000"
            />
          </div>

          {/* Tag */}
          <TagInput
            label="Tag"
            value={formData.tag}
            onChange={(tags) => onChange({ ...formData, tag: tags })}
            placeholder="e. g. Sales man, Team Lead"
          />
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="w-full bg-neutral-100/90 p-1 rounded-2xl flex items-center gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "flex-1 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer text-center",
              activeTab === tab.key
                ? "bg-white text-neutral-900 font-bold shadow-xs"
                : "text-neutral-500 hover:text-neutral-800",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Body */}
      <div>
        {activeTab === EMPLOYEE_TABS.WORK && (
          <WorkTabContent
            data={formData.work}
            onChange={(workData) => onChange({ ...formData, work: workData })}
          />
        )}

        {activeTab === EMPLOYEE_TABS.PERSONAL && (
          <PersonalTabContent
            data={formData.personal}
            onChange={(personalData) =>
              onChange({ ...formData, personal: personalData })
            }
          />
        )}

        {activeTab === EMPLOYEE_TABS.RESUME && (
          <ResumeTabContent
            data={formData.resume}
            onChange={(resumeData) =>
              onChange({ ...formData, resume: resumeData })
            }
          />
        )}

        {activeTab === EMPLOYEE_TABS.PAYROLL && (
          <PayrollTabContent
            data={formData.payroll}
            onChange={(payrollData) =>
              onChange({ ...formData, payroll: payrollData })
            }
          />
        )}

        {activeTab === EMPLOYEE_TABS.SETTINGS && (
          <SettingsTabContent
            data={formData.settings}
            onChange={(settingsData) =>
              onChange({ ...formData, settings: settingsData })
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;
