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
      label: 'Akademik',
      href: '/dashboard/academics',
      icon: BookA
    },
    {
      label: 'Beasiswa',
      href: '/dashboard/scholarships',
      icon: Banknote
    },
    {
      label: 'Kegiatan',
      href: '/dashboard/activities',
      icon: SquareActivity
    },
    {
      label: 'Mahasiswa',
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
