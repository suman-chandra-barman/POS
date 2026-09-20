"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PayrollFormData,
  WAGE_TYPES,
  WAGE_PERIODS,
  CONTRACT_TYPES,
} from "../types/employee.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface PayrollTabContentProps {
  data: PayrollFormData;
  onChange: (data: PayrollFormData) => void;
}

export const PayrollTabContent: React.FC<PayrollTabContentProps> = ({
  data,
  onChange,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Parse stored contractDate string back to Date for the calendar
  const selectedDate: Date | undefined = data.contractDate
    ? new Date(data.contractDate)
    : undefined;

  return (
    <div className="space-y-6 pt-2">
      {/* CONTRACT OVERVIEW SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            CONTRACT OVERVIEW
          </label>
        </div>

        <div className="md:col-span-9 space-y-4">
          {/* Contract Date — Shadcn Calendar Popover */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Contract
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger
                className="w-full"
                render={
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-left hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer",
                      !selectedDate && "text-neutral-400"
                    )}
                  >
                    <span>
                      {selectedDate
                        ? format(selectedDate, "dd / MM / yyyy")
                        : "DD / MM / YYYY"}
                    </span>
                    <CalendarIcon className="size-4 text-neutral-400 shrink-0" />
                  </button>
                }
              />
              <PopoverContent
                className="w-auto p-0 rounded-2xl border border-neutral-200 shadow-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onChange({
                      ...data,
                      contractDate: date ? date.toISOString() : "",
                    });
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Wage Type — Shadcn Select */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Wage Type
            </label>
            <Select
              value={data.wageType}
              onValueChange={(val) =>
                onChange({ ...data, wageType: val as PayrollFormData["wageType"] })
              }
            >
              <SelectTrigger className="w-full rounded-xl border-neutral-200/90 text-xs h-10 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500">
                <SelectValue placeholder="e. g. Fixed Wage" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-neutral-200 shadow-xl">
                <SelectItem value={WAGE_TYPES.FIXED_WAGE} className="text-xs cursor-pointer">
                  {WAGE_TYPES.FIXED_WAGE}
                </SelectItem>
                <SelectItem value={WAGE_TYPES.DAY_WAGE} className="text-xs cursor-pointer">
                  {WAGE_TYPES.DAY_WAGE}
                </SelectItem>
                <SelectItem value={WAGE_TYPES.HOURLY_WAGE} className="text-xs cursor-pointer">
                  {WAGE_TYPES.HOURLY_WAGE}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Wage Amount + Period Select */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Wage
            </label>
            <div className="flex rounded-xl border border-neutral-200/90 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
              {/* Amount input */}
              <input
                type="text"
                value={data.wageAmount}
                onChange={(e) =>
                  onChange({ ...data, wageAmount: e.target.value })
                }
                placeholder="0.00"
                className="flex-1 px-3.5 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />

              {/* Period Select — attached right side */}
              <div className="border-l border-neutral-200 shrink-0">
                <Select
                  value={data.wagePeriod}
                  onValueChange={(val) =>
                    onChange({ ...data, wagePeriod: val as PayrollFormData["wagePeriod"] })
                  }
                >
                  <SelectTrigger className="h-full border-0 rounded-none bg-neutral-50 hover:bg-neutral-100 text-xs px-3 gap-1 shadow-none focus:ring-0 min-w-28">
                    <span className="text-neutral-400 font-normal">/</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-neutral-200 shadow-xl" align="end">
                    <SelectItem value={WAGE_PERIODS.MONTHLY} className="text-xs cursor-pointer">
                      Monthly
                    </SelectItem>
                    <SelectItem value={WAGE_PERIODS.WEEKLY} className="text-xs cursor-pointer">
                      Weekly
                    </SelectItem>
                    <SelectItem value={WAGE_PERIODS.DAILY} className="text-xs cursor-pointer">
                      Daily
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contract Type — Shadcn Select */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Contract Type
            </label>
            <Select
              value={data.contractType}
              onValueChange={(val) =>
                onChange({ ...data, contractType: val as PayrollFormData["contractType"] })
              }
            >
              <SelectTrigger className="w-full rounded-xl border-neutral-200/90 text-xs h-10 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500">
                <SelectValue placeholder="e. g. Permanent" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-neutral-200 shadow-xl">
                <SelectItem value={CONTRACT_TYPES.PERMANENT} className="text-xs cursor-pointer">
                  {CONTRACT_TYPES.PERMANENT}
                </SelectItem>
                <SelectItem value={CONTRACT_TYPES.INTERN} className="text-xs cursor-pointer">
                  {CONTRACT_TYPES.INTERN}
                </SelectItem>
                <SelectItem value={CONTRACT_TYPES.SESSIONAL} className="text-xs cursor-pointer">
                  {CONTRACT_TYPES.SESSIONAL}
                </SelectItem>
                <SelectItem value={CONTRACT_TYPES.FULL_TIME} className="text-xs cursor-pointer">
                  {CONTRACT_TYPES.FULL_TIME}
                </SelectItem>
                <SelectItem value={CONTRACT_TYPES.PART_TIME} className="text-xs cursor-pointer">
                  {CONTRACT_TYPES.PART_TIME}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100" />

      {/* NOTE SECTION */}
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

export default PayrollTabContent;
