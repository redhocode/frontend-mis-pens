import AuthGuard from "@/components/AuthGuard";
import TableAcademic from "@/layouts/academics/TableAcademics";
import { CustomBreadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { PageWrapper } from "@/components/animate/page-wrapper";
const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Academic", href: "/dashboard/academic" },
];
const Academic: React.FC = () => {

    return (
      <AuthGuard>
        <div className="w-full shadow-md rounded-lg px-4 py-4 mx-auto bg-primary">
          <CustomBreadcrumb menu={menu} />
        </div>
        <PageWrapper>

        <section className="mt-32 px-4 py-4 contaiter shadow-inner">
          <TableAcademic />
        </section>
        </PageWrapper>
      </AuthGuard>
    );
}

export default Academic