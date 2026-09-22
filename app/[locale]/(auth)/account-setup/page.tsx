import { Suspense } from "react";
import { AccountSetupContainer } from "@/features/accout-setup";

export const metadata = {
  title: "Account Setup | POS",
  description: "Set up your business workspace",
};

const AccountSetupPage = () => {
  return (
    <Suspense fallback={null}>
      <AccountSetupContainer />
    </Suspense>
  );
};

export default AccountSetupPage;