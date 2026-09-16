import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Topbar from "@/features/navigation/components/Topbar";
import { BottomNavDock } from "@/features/navigation/components/BottomNavDock";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f8f9fb] text-foreground dark:bg-background">
        <Topbar />
        <div className="flex-1 overflow-y-auto min-w-0 relative">
          {children}
          <BottomNavDock />
        </div>
      </div>
    </NextIntlClientProvider>
  );
};

export default DashboardLayout;
