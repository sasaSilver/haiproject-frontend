import Link from "next/link";

import { Home, Tv2, Film, Clock, History } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"

const navigationItems = [
    {
      title: "Popular",
      url: "/popular",
      icon: Home,
    },
    {
      title: "TV Shows",
      url: "/tv-shows",
      icon: Tv2,
    },
    {
      title: "Movies",
      url: "/movies",
      icon: Film,
    },
    {
      title: "Watch Later",
      url: "/watch-later",
      icon: Clock,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
]

export default function MovieSidebar(props: {className?: string}) {
  return (
    <Sidebar className={props.className}>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" className="text-xl font-bold p-4">MovieApp</Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
