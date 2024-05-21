"use client"
import { PageWrapper } from '@/components/animate/page-wrapper';
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import CradAcademics from '@/layouts/academics/CardAcademics'
import { motion, useScroll, useSpring } from 'framer-motion';
import "../../globals.css";
import React from 'react'

export default function Academics() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });
  return (
    <>
      <section className="mt-32 px-4 py-4 container shadow-inner min-h-screen">
        <Navbar />
        <motion.div className="progress-bar" style={{ scaleX }} />
        <PageWrapper>
        <CradAcademics />
        </PageWrapper>
      </section>
      <Footer />
    </>
  );
}
