"use client";
import { PageWrapper } from "@/components/animate/page-wrapper";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import AboutLayout from "@/layouts/about/about";
import { motion, useScroll, useSpring } from "framer-motion";
import "../../globals.css";
export default function About(){
      const { scrollYProgress } = useScroll();
      const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
      });
    return (
      <>
        <Navbar />
        <section className="mt-24">
          <motion.div className="progress-bar" style={{ scaleX }} />
          <PageWrapper>
            <AboutLayout />
          </PageWrapper>
        </section>
        <Footer />
      </>
    );
}