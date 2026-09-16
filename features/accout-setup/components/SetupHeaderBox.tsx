"use client";

import React from "react";

interface SetupHeaderBoxProps {
  title?: string;
  subtitle?: string;
}

export const SetupHeaderBox: React.FC<SetupHeaderBoxProps> = ({
  title = "Let’s Set Up Your Business Workspace",
  subtitle = "Tell us a little about your business so we can personalize your ERP experience and recommend the right tools for your workflow.",
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#f4f4f6] px-4 py-3.5 sm:px-5 sm:py-4 text-center">
      <h2 className="text-[14.5px] sm:text-[15px] font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      <p className="mt-1 text-[11px] sm:text-[11.5px] leading-relaxed text-neutral-500 font-normal">
        {subtitle}
      </p>
    </div>
  );
};
