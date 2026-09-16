import Topbar from "@/features/navigation/components/Topbar";
import { BottomNavDock } from "@/features/navigation/components/BottomNavDock";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f8f9fb] text-foreground dark:bg-background">
      <Topbar />
      <div className="flex-1 overflow-y-auto min-w-0 relative">
        {children}
        <BottomNavDock />
      </div>
    </div>
  );
};

export default DashboardLayout;
