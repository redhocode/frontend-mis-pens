
import AuthGuard from '@/components/AuthGuard'
import Student from '@/layouts/students/TableStudents'

const Students : React.FC = () => {
    

 
    return (
        <AuthGuard>
            <section className='mt-32 px-4 py-4 container shadow-inner'>

                <Student />
            </section>
            </AuthGuard>
          
    )
}
export default Students