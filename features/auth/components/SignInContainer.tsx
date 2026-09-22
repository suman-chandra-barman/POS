"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AuthLayout } from "./AuthLayout";
import { AuthCard } from "./AuthCard";
import { AuthHeaderBox } from "./AuthHeaderBox";
import { SignInForm } from "./SignInForm";

export const SignInContainer: React.FC = () => {
  const t = useTranslations("Auth");

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeaderBox
          title={t("brandName")}
          subtitle={t("signInSubtitle")}
        />
        <SignInForm />
      </AuthCard>
    </AuthLayout>
  );
};
