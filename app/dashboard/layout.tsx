import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentCreator } from "@/lib/session";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const creator = getCurrentCreator();

  return (
    <SidebarProvider>
      <AppSidebar
        creator={{
          handle: creator.handle,
          displayName: creator.displayName,
          email: creator.email,
        }}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <span className="text-sm text-muted-foreground">
            Demo workspace. Sign-in and saving arrive with Supabase.
          </span>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
