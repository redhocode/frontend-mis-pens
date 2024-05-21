
import AuthGuard from "@/components/AuthGuard";
import Chart from "@/layouts/dashboard/ChartDashboard";
import {CustomBreadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Welcome from "@/components/welcome";
import { PageWrapper } from "@/components/animate/page-wrapper";

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  
];
const Dashboard: React.FC = () => {
 
  return (
    <>
      <AuthGuard >
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
