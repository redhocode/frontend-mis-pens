
import AuthGuard from '@/components/AuthGuard'
import Student from '@/layouts/students/TableStudents'
import { CustomBreadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { PageWrapper } from '@/components/animate/page-wrapper';
const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Students", href: "/dashboard/students" },
];
const Students : React.FC = () => {
    

 
    return (
      <AuthGuard>
        <div className="w-full shadow-md rounded-lg px-4 py-4 mx-auto bg-primary">
          <CustomBreadcrumb menu={menu} />
        </div>
        <PageWrapper>
        <section className="mt-32 px-4 py-4 container shadow-inner">
          <Student />
        </section>
        </PageWrapper>
      </AuthGuard>
    );
}
export default Students