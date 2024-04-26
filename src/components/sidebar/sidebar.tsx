"use client"
import { Banknote, BookA, GraduationCap, SquareActivity, User } from "lucide-react";
import SidebarDesktop from "./sidebar-desktop";
import { SidebarItems } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import dynamic from "next/dynamic";
const sidebarItems: SidebarItems = {
  links: [
    {
      label: 'Users',
      href: '/dashboard/users',
      icon: User
    },
    {
      label: 'Academics',
      href: '/dashboard/academics',
      icon: BookA
    },
    {
      label: 'Scholarships',
      href: '/dashboard/scholarships',
      icon: Banknote
    },
    {
      label: 'Activities',
      href: '/dashboard/activities',
      icon: SquareActivity
    },
    {
      label: 'Students',
      href: '/dashboard/students',
      icon: GraduationCap
    },
  ],
}

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  if (isDesktop) {
    return (
      <SidebarDesktop sidebarItems={sidebarItems}
      />
    )
  }
return <SidebarMobile sidebarItems={sidebarItems} />
}
