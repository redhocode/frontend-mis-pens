
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradAcademics from '@/layouts/academics/CardAcademics'

import React from 'react'

export default function Academics() {
  return (
    <>
    <section className='mt-32 px-4 py-4 container shadow-inner min-h-screen'>
      <Navbar/>
    <CradAcademics/>
    </section>
    <Footer/>

    </>

  )
}
