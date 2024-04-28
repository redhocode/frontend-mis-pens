import AuthGuard from "@/components/AuthGuard";
import TableSholarships from "@/layouts/scholarships/TableScholarships";
import React from "react";

const Scholarship:React.FC = () => {

    return (
        <AuthGuard>
        <section className="mt-32 px-4 py-4 contaiter shadow-inner">
            <TableSholarships/>
        </section>
        </AuthGuard>
    )
}
export default Scholarship