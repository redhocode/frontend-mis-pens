import Navbar from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SidebarDesktop } from "@/components/sidebar/sidebar-desktop"
import { Toaster } from "@/components/ui/toaster";
import { User } from "lucide-react";
import dynamic from 'next/dynamic'
function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
      <section>
        <main className=" sm:mt-3 mx-5 bg-white dark:bg-inherit">
        {children}
         <Toaster />
        </main>
      </section>

  )
}
export default dynamic(() => Promise.resolve(LoginLayout), { ssr: false });