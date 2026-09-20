"use client";

import React from "react";
import { Employee } from "../types/employee.types";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeCardGridProps {
  employees: Employee[];
  onEditEmployee?: (employee: Employee) => void;
}

export const EmployeeCardGrid: React.FC<EmployeeCardGridProps> = ({
  employees,
  onEditEmployee,
}) => {
  if (employees.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl border border-neutral-200/80 p-12 text-center">
        <p className="text-sm font-semibold text-neutral-800">No employees found</p>
        <p className="text-xs text-neutral-500 mt-1">
          Try selecting another location filter or add a new employee.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEditEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeCardGrid;
