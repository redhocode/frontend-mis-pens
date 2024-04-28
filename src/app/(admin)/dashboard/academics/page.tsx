import AuthGuard from "@/components/AuthGuard";
import TableAcademic from "@/layouts/academics/TableAcademics";

const Academic: React.FC = () => {

    return (
        <AuthGuard>

        <section className="mt-32 px-4 py-4 contaiter shadow-inner">
           <TableAcademic/>
        </section>
        </AuthGuard>
    )
}

export default Academic