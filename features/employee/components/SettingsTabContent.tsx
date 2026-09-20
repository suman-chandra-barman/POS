"use client";

import React from "react";
import { SettingsFormData } from "../types/employee.types";

interface SettingsTabContentProps {
  data: SettingsFormData;
  onChange: (data: SettingsFormData) => void;
}

export const SettingsTabContent: React.FC<SettingsTabContentProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-3">
          <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            SYSTEM ACCESS
          </label>
        </div>
        <div className="md:col-span-9 space-y-4">
          {/* Active Status Switch */}
          <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200/90 rounded-xl">
            <div>
              <p className="text-xs font-bold text-neutral-900">
                Employee Active Status
              </p>
              <p className="text-[11px] text-neutral-500">
                Enable or disable employee account access to POS and backend.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...data, isActive: !data.isActive })}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                data.isActive ? "bg-sky-500" : "bg-neutral-200"
              }`}
            >
              <div
                className={`bg-white size-4 rounded-full shadow-md transform transition-transform ${
                  data.isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Portal Access */}
          <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200/90 rounded-xl">
            <div>
              <p className="text-xs font-bold text-neutral-900">Portal Login</p>
              <p className="text-[11px] text-neutral-500">
                Allow employee to log in via mobile and web application.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  allowPortalAccess: !data.allowPortalAccess,
                })
              }
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                data.allowPortalAccess ? "bg-sky-500" : "bg-neutral-200"
              }`}
            >
              <div
                className={`bg-white size-4 rounded-full shadow-md transform transition-transform ${
                  data.allowPortalAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200/90 rounded-xl">
            <div>
              <p className="text-xs font-bold text-neutral-900">
                Email Notifications
              </p>
              <p className="text-[11px] text-neutral-500">
                Send schedule updates, wage receipts and shift alerts via email.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  notificationEmail: !data.notificationEmail,
                })
              }
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                data.notificationEmail ? "bg-sky-500" : "bg-neutral-200"
              }`}
            >
              <div
                className={`bg-white size-4 rounded-full shadow-md transform transition-transform ${
                  data.notificationEmail ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
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

export default SettingsTabContent;
