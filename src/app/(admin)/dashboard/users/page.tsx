import AuthGuard from "@/components/AuthGuard";
import React from "react";
import TableUser from "@/layouts/user/TableUseer";
import { CustomBreadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { PageWrapper } from "@/components/animate/page-wrapper";

const menu = [{ label: "Dashboard", href: "/dashboard" },
{ label: "Users", href: "/dashboard/users" },
];
const User: React.FC = () => {
  return (
    <AuthGuard>

      <div className="w-full shadow-md rounded-lg px-4 py-4 mx-auto bg-primary">
        <CustomBreadcrumb menu={menu} />
      </div>
      <PageWrapper>
      <section className="mt-32 px-4 py-4 contaiter shadow-inner">
        <TableUser />
      </section>
      </PageWrapper>
    </AuthGuard>
  );
};
export default User;
