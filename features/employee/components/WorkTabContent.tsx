"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  WorkFormData,
  WorkingDaysSchedule,
  WORKING_DAY_STATUS,
  type WorkingDayStatus,
} from "../types/employee.types";
import {
  DEPARTMENT_OPTIONS,
  LOCATION_OPTIONS,
} from "../data/employeeMockData";

interface WorkTabContentProps {
  data: WorkFormData;
  onChange: (data: WorkFormData) => void;
}

const DAYS_OF_WEEK: { key: keyof WorkingDaysSchedule; label: string }[] = [
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
];

export const WorkTabContent: React.FC<WorkTabContentProps> = ({
  data,
  onChange,
}) => {
  const [openDayDropdown, setOpenDayDropdown] = useState<string | null>(null);
  const [deptOpen, setDeptOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);

  const handleWorkingDayChange = (
    dayKey: keyof WorkingDaysSchedule,
    status: WorkingDayStatus
  ) => {
    onChange({
      ...data,
      workingDays: {
        ...data.workingDays,
        [dayKey]: status,
      },
    });
    setOpenDayDropdown(null);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* ── WORK SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            WORK
          </label>
        </div>
        <div className="md:col-span-9 space-y-4">
          {/* Department */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Department
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDeptOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-left text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
              >
                <span className={cn(!data.department && "text-neutral-400")}>
                  {data.department || "Select the department"}
                </span>
                <ChevronDown className="size-4 text-neutral-400" />
              </button>

              {deptOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDeptOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {DEPARTMENT_OPTIONS.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          onChange({ ...data, department: dept });
                          setDeptOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                      >
                        <span>{dept}</span>
                        {data.department === dept && (
                          <Check className="size-3.5 text-sky-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Job Position */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Job position
            </label>
            <input
              type="text"
              value={data.jobPosition}
              onChange={(e) => onChange({ ...data, jobPosition: e.target.value })}
              placeholder="e. g. Manager"
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Job title
            </label>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => onChange({ ...data, jobTitle: e.target.value })}
              placeholder=""
              className="w-full px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* ── LOCATION SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 tracking-wide">
            Location
          </label>
        </div>
        <div className="md:col-span-9">
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">
            Work location
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setLocOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-left text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
            >
              <span className={cn(!data.workLocation && "text-neutral-400")}>
                {data.workLocation || "Select the location"}
              </span>
              <ChevronDown className="size-4 text-neutral-400" />
            </button>

            {locOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLocOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {LOCATION_OPTIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        onChange({ ...data, workLocation: loc });
                        setLocOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                    >
                      <span>{loc}</span>
                      {data.workLocation === loc && (
                        <Check className="size-3.5 text-sky-500" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* ── USUAL WORKING DAYS SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 tracking-wide">
            Usual working days
          </label>
        </div>
        <div className="md:col-span-9 space-y-3.5">
          {DAYS_OF_WEEK.map((day) => {
            const currentStatus = data.workingDays[day.key];
            const isOpen = openDayDropdown === day.key;

            return (
              <div key={day.key}>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  {day.label}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDayDropdown((curr) =>
                        curr === day.key ? null : day.key
                      )
                    }
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-left text-neutral-800 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
                  >
                    <span>
                      {currentStatus === WORKING_DAY_STATUS.WORKED_DAY
                        ? "Worked day"
                        : currentStatus === WORKING_DAY_STATUS.WEEKEND
                        ? "Weekend"
                        : "Select status"}
                    </span>
                    <ChevronDown className="size-4 text-neutral-400" />
                  </button>

                  {/* Dropdown Modal matching Screenshot 2 popup */}
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpenDayDropdown(null)}
                      />
                      <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 space-y-2">
                        {/* Worked day Option */}
                        <div
                          onClick={() =>
                            handleWorkingDayChange(
                              day.key,
                              WORKING_DAY_STATUS.WORKED_DAY
                            )
                          }
                          className={cn(
                            "p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-colors",
                            currentStatus === WORKING_DAY_STATUS.WORKED_DAY
                              ? "border-neutral-300 bg-neutral-50/60"
                              : "border-neutral-100 hover:bg-neutral-50/40"
                          )}
                        >
                          <div>
                            <p className="text-xs font-bold text-neutral-900">
                              Worked day
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-normal">
                              If employ are Woking in this day then select it.
                            </p>
                          </div>
                          <div
                            className={cn(
                              "size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                              currentStatus === WORKING_DAY_STATUS.WORKED_DAY
                                ? "border-sky-500 bg-sky-500"
                                : "border-neutral-300 bg-white"
                            )}
                          >
                            {currentStatus === WORKING_DAY_STATUS.WORKED_DAY && (
                              <div className="size-1.5 rounded-full bg-white" />
                            )}
                          </div>
                        </div>

                        {/* Weekend Option */}
                        <div
                          onClick={() =>
                            handleWorkingDayChange(
                              day.key,
                              WORKING_DAY_STATUS.WEEKEND
                            )
                          }
                          className={cn(
                            "p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-colors",
                            currentStatus === WORKING_DAY_STATUS.WEEKEND
                              ? "border-neutral-300 bg-neutral-50/60"
                              : "border-neutral-100 hover:bg-neutral-50/40"
                          )}
                        >
                          <div>
                            <p className="text-xs font-bold text-neutral-900">
                              Weekend
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-normal">
                              If employ are not present in this day then select it.
                            </p>
                          </div>
                          <div
                            className={cn(
                              "size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                              currentStatus === WORKING_DAY_STATUS.WEEKEND
                                ? "border-sky-500 bg-sky-500"
                                : "border-neutral-300 bg-white"
                            )}
                          >
                            {currentStatus === WORKING_DAY_STATUS.WEEKEND && (
                              <div className="size-1.5 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
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

export default WorkTabContent;
