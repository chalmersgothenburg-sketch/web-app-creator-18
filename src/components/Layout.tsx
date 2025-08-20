import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Button } from "@/components/ui/button"
import { EmergencyAlert } from "./EmergencyAlert"
import { EmergencyCard } from "./EmergencyCard"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-healthcare-gray">SeniorCare Health Watch</h1>
            </div>
            
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              Customer Login
            </Button>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 flex">
            <div className="flex-1 p-6">
              {children}
            </div>
            
            {/* Right Sidebar */}
            <div className="w-80 p-6 space-y-4 border-l bg-card/30">
              <EmergencyCard />
            </div>
          </main>
        </div>
        
        <EmergencyAlert />
      </div>
    </SidebarProvider>
  )
}