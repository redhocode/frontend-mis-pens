import { SidebarButton } from "./sidebar-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { SidebarItems } from "@/types";
import { Label } from "../ui/label";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export const SidebarDesktop = (props: SidebarDesktopProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
       localStorage.removeItem('accessToken');

      router.push("/");
    } catch (error) {
      console.error("Gagal logout:", error);
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
            <SidebarButton icon={LogOut} className="w-full" onClick={handleSignOut}>
              Logout
            </SidebarButton>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default dynamic(() => Promise.resolve(SidebarDesktop), { ssr: false });
