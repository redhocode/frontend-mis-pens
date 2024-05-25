/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Chart_5 from "../chart/chart_5";
import Chart_4 from "../chart/chart_4";
import Chart_3 from "../chart/chart_3";
import Chart_1 from "../chart/chart_1";
import Chart_2 from "../chart/chart_2";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { PieChart,FilePieChart } from "lucide-react";
function Hero() {
  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];



  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="relative min-h-screen">
            <video
              className="absolute inset-0 object-cover w-full h-full"
              autoPlay
              loop
              muted
            >
              <source
                src="https://pjj.pens.ac.id/wp-content/uploads/2019/10/DJI_06721.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 opacity-50 bg-sky-900"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center outline outline-secondary">
              <div className="absolute inset-0 flex items-center justify-center text-center outline outline-secondary flex-col">
                <div className="max-w-full p-6 rounded-xl text-neutral-content">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <img
                      className="p-5 mb-5 transition duration-300 ease-in-out bg-white rounded-md card hover:scale-110"
                      src="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png"
                      alt=""
                      width="386"
                      height="126"
                      srcSet="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png 300w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-768x251.png 768w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ.png 840w"
                      sizes="(max-width: 386px) 100vw, 386px"
                    ></img>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <h1 className="mb-3 text-5xl font-bold text-white transition duration-300 ease-in-out hover:scale-110">
                      D3 Teknik Informatika
                    </h1>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p className="text-white transition duration-300 ease-in-out  hover:scale-110 mb-6">
                      Mixing The Best of Distance and On-Campus Higher Education
                    </p>

                    <Sheet>
                      <SheetTrigger>
                        <Button
                          variant="secondary"
                          className="rounded-full px-4 py-4"
                        >
                          <FilePieChart className="w-6 h-6 mr-2" />
                          View Chart
                        </Button>
                      </SheetTrigger>
                      {/* Chart */}

                      <SheetContent
                        className="w-full md:h-3/2"
                        side={SHEET_SIDES[2]}
                      >
                        <SheetHeader>
                          <SheetTitle className="mb-2">
                            Chart Data Mahasiswa PJJ D3 Teknik Informatika
                          </SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="w-full md:w-full h-full rounded-md border px-2 py-2">
                          <SheetDescription>
                            <div className="w-full flex flex-grow mx-auto gap-4 justify-center">
                              <Chart_1 />
                              <Chart_5 />
                              <Chart_4 />
                              <Chart_2 />
                            </div>
                          </SheetDescription>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </SheetContent>
                    </Sheet>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default dynamic(() => Promise.resolve(Hero), { ssr: false });