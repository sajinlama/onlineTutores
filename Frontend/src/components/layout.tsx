import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 p-4">
          <SidebarTrigger className="cursor-pointer"/>
         <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
