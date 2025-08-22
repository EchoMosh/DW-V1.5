import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { AuroraBackground } from "@/components/ui/aurora-background";

const AppLayout = () => {
  return (
    <AuroraBackground showRadialGradient className="h-dvh w-full overflow-hidden flex flex-row bg-background text-foreground">
      {/* Persistent Sidebar */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* Page content */}
      <main className="flex-1 h-dvh overflow-y-auto relative z-20">
        <div className="p-8 flex flex-col items-center justify-start min-h-full space-y-12 w-full">
          <Outlet />
        </div>
      </main>
    </AuroraBackground>
  );
};

export default AppLayout;
