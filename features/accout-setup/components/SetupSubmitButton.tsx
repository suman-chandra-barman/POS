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
        "mt-4 h-9.5 sm:h-10 w-full rounded-xl text-xs font-semibold tracking-wider uppercase shadow-sm transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
