"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BackNavigationProps {
  onClick?: () => void;
  href?: string;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

export const BackNavigation: React.FC<BackNavigationProps> = ({
  onClick,
  href,
  label = "← Back",
  showIcon = false,
  className,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 w-full text-center text-xs text-neutral-400 hover:text-neutral-700 transition-colors pt-1 cursor-pointer select-none",
        className
      )}
    >
      {showIcon && <ArrowLeft className="size-3.5" />}
      <span>{label}</span>
    </button>
  );
};

export default BackNavigation;
