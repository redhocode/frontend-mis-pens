
import { PageWrapper } from '@/components/animate/page-wrapper'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradStudentsUser from '@/layouts/students/CradStudents'
import React from 'react'

export default function Students() {
  return (
    <>
      <Navbar/>
    <section className='mt-24 px-4 py-4 shadow-inner min-h-screen'>
      <PageWrapper>

    <CradStudentsUser/>
      </PageWrapper>
    </section>
    

    <Footer/>
    
    </>

  )
}
