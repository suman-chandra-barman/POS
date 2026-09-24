/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signUpSchema } from "../types/auth.schemas";
import type { SignUpFormData } from "../types/auth.types";
import { GoogleAuthButton } from "./GoogleAuthButton";

export const SignUpForm: React.FC = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(t("signUpSuccess"));
      router.push(
        `/${locale}/verify-email?email=${encodeURIComponent(data.email)}`
      );
    } catch {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast.info("Google Sign-Up clicked");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="signup-email"
          className="block text-xs font-semibold text-neutral-800 mb-1.5"
        >
          {t("emailLabel")}
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          className="w-full h-10 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
        />
        {errors.email?.message && (
          <p className="mt-1 text-[11px] text-red-500">
            {t(errors.email.message as any)}
          </p>
        )}
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 rounded-lg bg-[#222222] hover:bg-neutral-800 active:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          t("signUpButton")
        )}
      </button>

      {/* "or" separator */}
      <div className="text-center py-0.5">
        <span className="text-xs text-neutral-400 font-normal">
          {t("or")}
        </span>
      </div>

      {/* Google Sign Up Button */}
      <GoogleAuthButton
        label={t("signUpWithGoogle")}
        onClick={handleGoogleSignUp}
      />

      {/* Sign In Link */}
      <div className="text-center pt-2">
        <p className="text-xs text-neutral-600">
          {t("alreadyHaveAccount")}{" "}
          <Link
            href={`/${locale}/signin`}
            className="hover:underline font-semibold"
          >
            {t("signInLink")}
          </Link>
        </p>
      </div>
    </form>
  );
};
