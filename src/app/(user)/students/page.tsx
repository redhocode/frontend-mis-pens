
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradStudentsUser from '@/layouts/students/CradStudents'
import React from 'react'

export default function Students() {
  return (
    <>
    <section className='mt-32 px-4 py-4 container shadow-inner'>
      <Navbar/>
    <CradStudentsUser/>
    </section>
    <Footer/>
    </>

  )
}
