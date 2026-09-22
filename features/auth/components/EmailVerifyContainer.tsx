"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AuthLayout } from "./AuthLayout";
import { AuthCard } from "./AuthCard";
import { AuthHeaderBox } from "./AuthHeaderBox";
import { EmailVerifyForm } from "./EmailVerifyForm";

export const EmailVerifyContainer: React.FC = () => {
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const rawEmail = searchParams.get("email");

  const maskedEmail = useMemo(() => {
    if (!rawEmail) return ".....m@gmail.com";
    const parts = rawEmail.split("@");
    if (parts.length !== 2) return rawEmail;
    const [user, domain] = parts;
    if (user.length <= 2) {
      return `.....@${domain}`;
    }
    return `${user[0]}.....${user[user.length - 1]}@${domain}`;
  }, [rawEmail]);

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeaderBox
          title={t("emailVerifyTitle")}
          subtitle={t("emailVerifySubtitle", { email: maskedEmail })}
        />
        <EmailVerifyForm email={rawEmail || undefined} />
      </AuthCard>
    </AuthLayout>
  );
};
