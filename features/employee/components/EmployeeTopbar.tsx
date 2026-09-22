"use client";

import React from "react";
import { useLocale } from "next-intl";
import { BarChart3, FileSpreadsheet, Settings, ChevronLeft } from "lucide-react";
import { PrimaryNavbar } from "@/features/navigation/components/PrimaryNavbar";

interface EmployeeTopbarProps {
  onBack?: () => void;
}

export const EmployeeTopbar: React.FC<EmployeeTopbarProps> = ({ onBack }) => {
  const locale = useLocale();

  return (
    <PrimaryNavbar
      title="Employee"
      icon={
        onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft className="size-5 text-neutral-900" />
          </button>
        ) : undefined
      }
      navItems={[
        { label: "Home", href: `/${locale}/apps` },
        {
          label: "Report",
          dropdownItems: [
            {
              label: "Employee Attendance",
              href: `/${locale}/employee`,
              icon: BarChart3,
            },
            {
              label: "Payroll Summary",
              href: `/${locale}/employee`,
              icon: FileSpreadsheet,
            },
          ],
        },
        {
          label: "Setup",
          dropdownItems: [
            {
              label: "Departments & Roles",
              href: `/${locale}/employee`,
              icon: Settings,
            },
          ],
        },
      ]}
    />
  );
};
