import { LogOut, Settings, SquareDashedBottom, Atom, Globe, Variable } from "lucide-react" 
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { title: "Dashboard", url: "/home", icon: SquareDashedBottom },
  { title: "Settings", url: "/home/setting", icon: Settings },
]

const SUBJECTS = [
  { title: "Mathematics", url: "/home/quiz/maths", icon: Variable },
  { title: "Science", url: "/home/quiz/science", icon: Atom },
  { title: "English", url: "/home/quiz/english", icon: Globe },
]

export function AppSidebar() {
  const [username, setUsername] = useState("User")
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("name")
    if (storedUsername) setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("username")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "/login"
  }

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* 1. Header: Keeps a clean top section (add a logo here if needed later) */}
      <SidebarHeader>
        <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          MyApp
        </div>
      </SidebarHeader>

      {/* 2. Content: Consolidated everything into a single Content container */}
      <SidebarContent>
        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subjects Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SUBJECTS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer: Clean user profile & logout toggle */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full p-2 bg-white rounded-md dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 text-sm">
              <span className="font-medium truncate max-w-[120px]">{username}</span>
              <button 
                onClick={handleLogout}
                className="hover:text-destructive transition-colors p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}