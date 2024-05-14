import { PageWrapper } from "@/components/animate/page-wrapper";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import CradScholarships from "@/layouts/scholarships/CardScholarships";

import React from "react";

export default function Page() {
  return (
    <>
      <section className="mt-32 px-4 py-4 container shadow-inner min-h-screen">
        <Navbar />
        <PageWrapper>
          <CradScholarships />
        </PageWrapper>
      </section>
      <Footer />
    </>
  );
}
