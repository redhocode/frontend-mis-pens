import { Sidebar } from "@/components/sidebar/sidebar";
import dynamic from "next/dynamic";
import Providers from "@/components/providers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  metadataBase: new URL("https://pjj.pens.ac.id"),
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/public/images/pens.png",
        href: "/public/images/pens.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/public/images/pens.png",
        href: "/public/images/pens.png",
      },
    ],
  },
  title: "Dashboard - D3 PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
  description:
    "Dashboard - SIM PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
};
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
  
        <section>
          <div className="ml-[270px] mt-3 mx-5 md:ml-4 bg-white dark:bg-zinc-800 py-4">
            {/* <Navbar /> */}
            <Sidebar />
            <Providers>
              <div className="flex flex-col flex-1 mx-4 my-4 md:mx-8 md:pl-2">
                {children}
              </div>
            </Providers>
          </div>
        </section>
     
  );
}

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
