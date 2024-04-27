
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradAcademics from '@/layouts/academics/CardAcademics'
import CradActivities from '@/layouts/activities/CardActivities'

import React from 'react'

export default function Activities() {
  return (
<>
    <section className='mt-32 px-4 py-4 container shadow-inner min-h-screen'>
      <Navbar/>
    <CradActivities/>
    </section>
<Footer/>
</>
  )
}
