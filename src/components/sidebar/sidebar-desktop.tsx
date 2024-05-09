import { SidebarButton } from "./sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { SidebarItems } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Label } from "../ui/label";
import logoutUser from "../../features/user/logoutUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export const SidebarDesktop = (props: SidebarDesktopProps) => {
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
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r bg-background">
      <div className="w-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">
          Dashboard
        </h3>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <SidebarButton icon={LogOut} className="w-full">
                  Logout
                </SidebarButton>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default dynamic(() => Promise.resolve(SidebarDesktop), { ssr: false });