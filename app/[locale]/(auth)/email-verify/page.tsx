import { Suspense } from "react";
import { EmailVerifyContainer } from "@/features/auth";

export const metadata = {
  title: "Verify Email | POS",
  description: "Verify your email to continue",
};

const EmailVerifyPage = () => {
  return (
    <Suspense fallback={null}>
      <EmailVerifyContainer />
    </Suspense>
  );
};

export default EmailVerifyPage;
