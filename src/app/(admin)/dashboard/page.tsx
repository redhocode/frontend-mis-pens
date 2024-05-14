// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);
//   return (
//     <main className="mt-10">
//       <h1>Hello World</h1>
//       <pre>{JSON.stringify(session)}</pre>
//           </main>
//   );
// }
import AuthGuard from "@/components/AuthGuard";
import Chart from "@/layouts/dashboard/ChartDashboard";
import Link from "next/link";


// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import axios from "axios";
// import { axiosInstance } from "@/lib/axios";

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
import {CustomBreadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Welcome from "@/components/welcome";
import { PageWrapper } from "@/components/animate/page-wrapper";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  
];
const Dashboard: React.FC = () => {
 
  return (
    <>
      <AuthGuard>
        <div className="w-full shadow-md rounded-lg px-4 py-4 mx-auto bg-primary">
          <CustomBreadcrumb menu={menu} />
        </div>
        <PageWrapper>

        <Welcome />
        <div className="w-full">

        <Chart />
        </div>
        </PageWrapper>
      </AuthGuard>
    </>
  );
};

export default Dashboard;
