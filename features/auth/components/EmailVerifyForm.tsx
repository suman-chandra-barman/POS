/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { verifyEmailSchema } from "../types/auth.schemas";
import type { VerifyEmailFormData } from "../types/auth.types";
import { Button } from "@/components/ui/button";
import { OtpInputGroup } from "./OtpInputGroup";

interface EmailVerifyFormProps {
  email?: string;
}

export const EmailVerifyForm: React.FC<EmailVerifyFormProps> = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(t("verifySuccess"));
      router.push(`/${locale}/account-setup`);
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    toast.success(t("codeResent"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      {/* 6 Digit OTP Inputs */}
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OtpInputGroup
            value={field.value}
            onChange={field.onChange}
            disabled={isLoading}
            hasError={Boolean(errors.otp)}
          />
        )}
      />

      {errors.otp?.message && (
        <p className="text-center text-[11px] text-red-500 mb-4">
          {t(errors.otp.message as any)}
        </p>
      )}

      {/* Verify Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          t("verifyButton")
        )}
      </Button>

      {/* Resend Code Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-neutral-600">
          {t("dontReceivedCode")}{" "}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendCooldown > 0}
            className="font-bold text-neutral-900 hover:underline cursor-pointer disabled:text-neutral-400 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0
              ? `${t("resend")} (${resendCooldown}s)`
              : t("resend")}
          </button>
        </p>
      </div>
    </form>
  );
};
