/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signInSchema } from "../types/auth.schemas";
import type { SignInFormData } from "../types/auth.types";
import { Button } from "@/components/ui/button";
import { GoogleAuthButton } from "./GoogleAuthButton";

export const SignInForm: React.FC = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Mock / extensible sign-in action
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(t("signInSuccess"));
      router.push(`/${locale}/account-setup`);
    } catch {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google Sign-In clicked");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-neutral-800 mb-1.5"
        >
          {t("emailLabel")}
        </label>
        <input
          id="email"
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

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-neutral-800 mb-1.5"
        >
          {t("passwordLabel")}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            {...register("password")}
            className="w-full h-10 rounded-lg border border-neutral-200 bg-white pl-3 pr-10 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password?.message && (
          <p className="mt-1 text-[11px] text-red-500">
            {t(errors.password.message as any)}
          </p>
        )}
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer mt-2"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          t("signInButton")
        )}
      </Button>

      {/* "or" separator */}
      <div className="text-center py-0.5">
        <span className="text-xs text-neutral-400 font-normal">{t("or")}</span>
      </div>

      {/* Google Login Button */}
      <GoogleAuthButton
        label={t("loginWithGoogle")}
        onClick={handleGoogleLogin}
      />

      {/* Sign Up Link */}
      <div className="text-center pt-2">
        <p className="text-xs text-neutral-600">
          {t("dontHaveAccount")}{" "}
          <Link
            href={`/${locale}/signup`}
            className="hover:underline font-semibold"
          >
            {t("signUpLink")}
          </Link>
        </p>
      </div>
    </form>
  );
};
