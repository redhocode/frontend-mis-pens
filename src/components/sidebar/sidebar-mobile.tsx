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
import logoutUser from "../../features/user/logoutUser";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ModeToggle } from "../mode-dash";
interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}
export function SidebarMobile(props: SidebarMobileProps) {
     const pathname = usePathname();
     const router = useRouter();

     const [user, setUser] = useState<string | null>(null);
     const [role, setRole] = useState<string | null>(null);

     useEffect(() => {
       // Ambil informasi pengguna dari penyimpanan lokal saat komponen dimuat
       const username = localStorage.getItem("username");
       setUser(username);
       const role = localStorage.getItem("role");
       setRole(role);
     }, []);

     const handleLogout = async () => {
       try {
         await logoutUser(router); // Mengirim router sebagai argumen ke logoutUser
       } catch (error) {
         console.error("Error during logout:", error);
       }
     };

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="fixed  top-3 ">
            <Menu size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="px-3 py-4">
          <SheetHeader className="flex flex-row justify-between items-center space-y-0">
            <ModeToggle />
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
          <div className="flex flex-col">
            <Label className="text-foreground ml-20 mb-2 text-xl">{user}</Label>
            <Label className="text-foreground ml-20 font-light text-xs">
              ({role})
            </Label>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-3 w-full cursor-pointer">
              {props.sidebarItems.links.map((link, index) => {
                // Tampilkan semua menu jika peran adalah admin
                if (role === "Admin") {
                  return (
                    <Link key={index} href={link.href}>
                      <SidebarButton
                        variant={pathname === link.href ? "default" : "ghost"}
                        icon={link.icon}
                        className="w-full items-center"
                      >
                        {link.label}
                      </SidebarButton>
                    </Link>
                  );
                }
                // Tampilkan menu "Academics" jika peran adalah akademik
                if (role === "Akademik" && link.label === "Academics") {
                  return (
                    <Link key={index} href={link.href}>
                      <SidebarButton
                        variant={pathname === link.href ? "default" : "ghost"}
                        icon={link.icon}
                        className="w-full items-center"
                      >
                        {link.label}
                      </SidebarButton>
                    </Link>
                  );
                }
                if (
                  role === "Administrasi" &&
                  (link.label === "Scholarships" || link.label === "Activities")
                ) {
                  return (
                    <Link key={index} href={link.href}>
                      <SidebarButton
                        variant={pathname === link.href ? "default" : "ghost"}
                        icon={link.icon}
                        className="w-full items-center"
                      >
                        {link.label}
                      </SidebarButton>
                    </Link>
                  );
                }
                // Jika bukan peran akademik, jangan tampilkan menu apapun
                return null;
              })}
            </div>
            <div className="absolute bottom-3 left-0 w-full px-3">
              <SidebarButton
                icon={LogOut}
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </SidebarButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
}
export default dynamic(() => Promise.resolve(SidebarMobile), { ssr: false });