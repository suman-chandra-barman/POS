"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AuthLayout } from "./AuthLayout";
import { AuthCard } from "./AuthCard";
import { AuthHeaderBox } from "./AuthHeaderBox";
import { SignUpForm } from "./SignUpForm";

export const SignUpContainer: React.FC = () => {
  const t = useTranslations("Auth");

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeaderBox
          title={t("brandName")}
          subtitle={t("signUpSubtitle")}
        />
        <SignUpForm />
      </AuthCard>
    </AuthLayout>
  );
};
