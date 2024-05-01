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


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const Dashboard: React.FC = () => {
  return (
    <>
      <AuthGuard>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/dashboard">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Chart />
      </AuthGuard>
    </>
  );
};

export default Dashboard;
