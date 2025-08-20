import { Heart, Shield, Users, FileText, Home } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Health Dashboard", url: "/", icon: Heart },
  { title: "Emergency Services", url: "/emergency", icon: Shield },
  { title: "Family Connect", url: "/family", icon: Users },
  { title: "Insurance Support", url: "/insurance", icon: FileText }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "text-healthcare-gray hover:bg-muted/50 hover:text-primary"

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-healthcare-gray">SeniorCare</h2>
        </div>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 text-sm font-medium text-muted-foreground">
            Quick Access
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-4 mb-1">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {state !== "collapsed" && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}