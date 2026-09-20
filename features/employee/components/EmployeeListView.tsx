"use client";

import React from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Employee } from "../types/employee.types";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "./EmployeeSocialIcons";

interface EmployeeListViewProps {
  employees: Employee[];
  onEditEmployee?: (employee: Employee) => void;
}

export const EmployeeListView: React.FC<EmployeeListViewProps> = ({
  employees,
  onEditEmployee,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              <th className="py-3 px-4">Employee</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Sales Metric</th>
              <th className="py-3 px-4">Branch</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4 text-center">Socials</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => onEditEmployee?.(employee)}
                className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl overflow-hidden relative shrink-0 bg-sky-500">
                      <Image
                        src={employee.avatarUrl}
                        alt={employee.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 leading-tight">
                        {employee.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {employee.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-700 font-medium">
                  {employee.location}
                </td>
                <td className="py-3 px-4 font-bold text-neutral-900">
                  {employee.salesCount}
                </td>
                <td className="py-3 px-4 text-neutral-600">
                  {employee.branch}
                </td>
                <td className="py-3 px-4 text-neutral-600">
                  <p>{employee.email}</p>
                  <p className="text-[11px] text-neutral-400">{employee.phone}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2 text-neutral-500">
                    <InstagramIcon className="size-3.5 hover:text-neutral-900" />
                    <LinkedinIcon className="size-3.5 hover:text-neutral-900" />
                    <FacebookIcon className="size-3.5 hover:text-neutral-900" />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEmployee?.(employee);
                    }}
                    className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
                  >
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeListView;
