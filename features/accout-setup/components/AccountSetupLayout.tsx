"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AccountSetupLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AccountSetupLayout: React.FC<AccountSetupLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#f2f2f2] overflow-hidden select-none",
        className
      )}
    >
      {/* Left Decorative Ribbon/Chevron Background Image (Top Left, exact scale & position) */}
      <div className="pointer-events-none absolute left-0 -top-6 sm:-top-8 md:-top-9 w-[17vw] min-w-36 max-w-65 h-auto select-none z-0">
        <Image
          src="/images/setup-bg-left.png"
          alt="Setup background left pattern"
          width={249}
          height={282}
          priority
          sizes="(max-width: 768px) 140px, 260px"
          className="w-full h-auto object-contain object-top-left"
        />
      </div>

      {/* Right Decorative G-Shape Background Image (Bottom Right, 91vh height scale) */}
      <div className="pointer-events-none absolute -right-3 sm:-right-4 md:-right-5 -bottom-3 sm:-bottom-4 md:-bottom-5 h-[91vh] max-h-230 w-[39vw] min-w-75 max-w-160 flex items-end justify-end select-none z-0">
        <Image
          src="/images/setup-bg-right.png"
          alt="Setup background right pattern"
          width={492}
          height={704}
          priority
          sizes="(max-width: 768px) 300px, 620px"
          className="h-full w-auto max-w-none object-contain object-bottom-right"
        />
      </div>

      {/* Main Content Card Container */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
