import AuthGuard from "@/components/AuthGuard";
import TableActivies from "@/layouts/activities/TableActivies";
const Activities: React.FC = () => {

    return (
        <AuthGuard>
        <section className="mt-32 px-4 py-4 contaiter shadow-inner">
            <TableActivies/>
        </section>
        </AuthGuard>
    )
}

export default Activities