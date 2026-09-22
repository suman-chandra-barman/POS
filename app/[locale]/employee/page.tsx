import { Suspense } from "react";
import { EmployeeContainer } from "@/features/employee/components/EmployeeContainer";

export default function EmployeePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-neutral-400">Loading employee...</div>
      }
    >
      <EmployeeContainer />
    </Suspense>
  );
}
