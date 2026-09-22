"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-6 text-center pb-28">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 mb-3.5 shadow-xs border border-neutral-200">
        <Settings className="size-7 stroke-[1.8]" />
      </div>
      <h2 className="text-lg font-bold text-neutral-900">Workspace Settings</h2>
      <p className="mt-1 text-xs text-neutral-500 max-w-sm">
        Configure currency, store terminals, receipts, tax rules, and user roles.
      </p>
    </div>
  );
}
