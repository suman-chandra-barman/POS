import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Topbar from "@/features/navigation/components/Topbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Left Panel - Sidebar */}

        {/* Right Panel - Topbar & Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto bg-muted/15 p-6">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
};

export default DashboardLayout;
