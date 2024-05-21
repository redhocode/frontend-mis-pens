"use client"
import { PageWrapper } from '@/components/animate/page-wrapper'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradStudentsUser from '@/layouts/students/CradStudents'
import React from 'react'
import { motion, useScroll, useSpring } from "framer-motion";
import "../../globals.css";

export default function Students() {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
     stiffness: 100,
     damping: 30,
     restDelta: 0.001,
   });
  return (
    <>
      <Navbar />
      <section className="mt-24 px-4 py-4 shadow-inner min-h-screen">
        <motion.div className="progress-bar" style={{ scaleX }} />
        <PageWrapper>
          <CradStudentsUser />
        </PageWrapper>
      </section>

      <Footer />
    </>
  );
}
