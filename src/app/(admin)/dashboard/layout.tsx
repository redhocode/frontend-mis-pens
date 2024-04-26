import { Sidebar } from "@/components/sidebar/sidebar";
import dynamic from "next/dynamic";
import Providers from "@/components/providers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="ml-[270px] mt-3 mx-5 md:ml-4 ">
        
        {/* <Navbar /> */}
        <Sidebar />
        <Providers>
          <div className="flex flex-col flex-1 mx-4 my-4 md:mx-8">{children}</div>
        </Providers>
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
