import { LogOut, Home, Settings, SquareDashedBottom, Atom, Globe, Variable } from "lucide-react" 
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
import ThemeSwitcher from "./themswitcher"

// Menu items
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/home/dashboard",
    icon: SquareDashedBottom,
  },
  {
    title: "Settings",
    url: "/home/setting",
    icon: Settings,
  },
]

const Subjects = [
  {
    title: "Mathematics",
    url: "/home/maths",
    icon: Variable,
  },
  {
    title: "Science",
    url: "/home/science",
    icon: Atom,
  },
  {
    title: "English",
    url: "/home/english",
    icon: Globe,
  },
]

export function AppSidebar() {
  const [username, setUsername] = useState("User")
  
  useEffect(() => {
    // Get username from localStorage when component mounts
    const storedUsername = localStorage.getItem("name")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const handleLogout = () => {
    // Clear data from localStorage
    localStorage.removeItem("username")
    
    // Clear data from cookies (if token is stored in cookies)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    
    // Clear any other auth-related cookies if needed
    // Example: document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    
    // Redirect to login page
    window.location.href = "/login";
  }

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu >
         
        </SidebarMenu>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-m font-semibold">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
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
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-m font-semibold">
                Subject
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Subjects.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
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
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-evenly">
              <div className="w-full bg-white rounded-md p-2 flex justify-between items-center cursor-pointer dark:text-white dark:bg-black">
                <span>{username}</span>
                <LogOut className="cursor-pointer" onClick={handleLogout} />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}