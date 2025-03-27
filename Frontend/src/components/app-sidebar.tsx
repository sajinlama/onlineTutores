import {  LogOutIcon, Home, Settings, SquareDashedBottom,Atom ,Globe ,Variable  } from "lucide-react"
import { Link } from "react-router-dom"

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




// Menu items.
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

const Subjects =[
  {
    title:"Mathematics",
    url:"/home/maths",
    icon:Variable ,
  },
  {
    title:"Science",
    url:"/home/science",
    icon:Atom    ,
  },
  {
    title:"Enlish",
    url:"/home/english",
    icon:Globe ,
  },
]


export function AppSidebar() {
  return (
  
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu className="flex flex-row">
            <h1 className="text-3xl bold p-1">Edu Mentor</h1>
            <div className="h-10 w-10 p-1.5"><ThemeSwitcher/></div>
          </SidebarMenu>
          <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-m semi-bold">Navigation</SidebarGroupLabel>
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
          <SidebarGroupLabel className="text-m semi-bold">
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
        </SidebarHeader >
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem >
           <div className="flex justify-evenly  ">
            <span className="w-full bg-white rounded-md p-2 flex gap-3 cursor-pointer dark:text-white dark:bg-black ">Username  <LogOutIcon className="cursor-pointer"/></span>
           </div>
           
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  
  )
};
