import { SidebarItems } from "@/types";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { SidebarButton } from "./sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import dynamic from "next/dynamic";

import { Label } from "../ui/label";
import { usePathname } from "next/navigation";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}
export function SidebarMobile(props: SidebarMobileProps) {
     const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className="fixed  top-3 ">

                <Menu size={24}/>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="px-3 py-4">
                <SheetHeader className="flex flex-row justify-between items-center space-y-0">
                <span className="text-2xl font-semibold text-foreground mx-3">
                Dashboard
                </span>
                </SheetHeader>
              <div className="justify-center mt-6 mb-6 ml-16 items-center">
          <Avatar className="w-24 h-24 outline-2 outline cursor-pointer">
            <AvatarImage src="https://github.com/redhocode.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Label className="text-foreground ml-20">Admin</Label>
        <div className="mt-5">
          <div className="flex flex-col gap-3 w-full cursor-pointer">
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "default" : "ghost"}
                  icon={link.icon}
                  className="w-full items-center"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-3 left-0 w-full px-3">
            <SidebarButton icon={LogOut} className="w-full">
              Logout
            </SidebarButton>
          </div>
        </div>
            </SheetContent>
        </Sheet>
    )
}
export default dynamic(() => Promise.resolve(SidebarMobile), { ssr: false });