"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-6 text-center pb-28">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-lime-50 text-lime-600 mb-3.5 shadow-xs border border-lime-100">
        <BarChart3 className="size-7 stroke-[1.8]" />
      </div>
      <h2 className="text-lg font-bold text-neutral-900">Reports & Analytics</h2>
      <p className="mt-1 text-xs text-neutral-500 max-w-sm">
        View detailed sales, inventory valuation, and financial performance reports.
      </p>
    </div>
  );
}
