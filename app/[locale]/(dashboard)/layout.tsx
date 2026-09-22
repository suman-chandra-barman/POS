import { PortalTopbar } from "@/features/navigation/components/PortalTopbar";
import { BottomNavDock } from "@/features/navigation/components/BottomNavDock";

export default function DashboardPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f8f9fb] text-foreground dark:bg-background">
      <PortalTopbar />
      <div className="flex-1 overflow-y-auto min-w-0 relative">
        {children}
        <BottomNavDock />
      </div>
    </div>
  );
}
