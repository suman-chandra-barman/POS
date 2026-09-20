"use client";

import React from "react";
import Image from "next/image";
import { Employee } from "../types/employee.types";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "./EmployeeSocialIcons";

interface EmployeeCardProps {
  employee: Employee;
  onEdit?: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
}) => {
  return (
    <div
      onClick={() => onEdit?.(employee)}
      className="bg-white rounded-3xl border border-neutral-200/80 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3 group"
    >
      {/* Top Details Section */}
      <div className="flex items-start gap-4">
        {/* Photo with vibrant background matching mockup */}
        <div className="size-24 sm:size-26 rounded-2xl overflow-hidden relative shrink-0 bg-linear-to-b from-sky-400 to-blue-600 shadow-xs">
          <Image
            src={employee.avatarUrl}
            alt={employee.name}
            fill
            sizes="104px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info & Metrics */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
          {/* Name & Role */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 truncate leading-tight">
              {employee.name}
            </h4>
            <p className="text-xs text-neutral-500 truncate mt-0.5 font-medium">
              {employee.role}
            </p>
          </div>

          {/* 3-Column Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-1 border-t border-neutral-100">
            <div>
              <p className="text-xs font-bold text-neutral-900 truncate leading-none">
                {employee.location}
              </p>
              <p className="text-[10px] text-neutral-500 font-medium mt-1 uppercase tracking-wide">
                Location
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 truncate leading-none">
                {employee.salesCount}
              </p>
              <p className="text-[10px] text-neutral-500 font-medium mt-1 uppercase tracking-wide">
                Sales
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 truncate leading-none">
                {employee.branch}
              </p>
              <p className="text-[10px] text-neutral-500 font-medium mt-1 uppercase tracking-wide">
                Sales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Social Media Bar */}
      <div className="w-full bg-neutral-50/90 rounded-2xl py-2 px-4 flex items-center justify-around border border-neutral-100">
        <a
          href={employee.socials.instagram || "#"}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-neutral-600 hover:text-neutral-900 transition-colors p-1 rounded-full hover:bg-neutral-200/60 cursor-pointer"
        >
          <InstagramIcon className="size-4" />
        </a>

        <div className="h-3 w-px bg-neutral-200" />

        <a
          href={employee.socials.linkedin || "#"}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-neutral-600 hover:text-neutral-900 transition-colors p-1 rounded-full hover:bg-neutral-200/60 cursor-pointer"
        >
          <LinkedinIcon className="size-4" />
        </a>

        <div className="h-3 w-px bg-neutral-200" />

        <a
          href={employee.socials.facebook || "#"}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="text-neutral-600 hover:text-neutral-900 transition-colors p-1 rounded-full hover:bg-neutral-200/60 cursor-pointer"
        >
          <FacebookIcon className="size-4" />
        </a>
      </div>
    </div>
  );
};

export default EmployeeCard;
