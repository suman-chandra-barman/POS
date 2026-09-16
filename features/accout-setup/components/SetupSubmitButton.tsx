"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SetupSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const SetupSubmitButton: React.FC<SetupSubmitButtonProps> = ({
  children = "NEXT",
  className,
  type = "submit",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={cn(
        "mt-5 h-11 w-full rounded-xl bg-[#232323] hover:bg-neutral-800 text-white text-xs font-semibold tracking-wider uppercase shadow-sm transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
