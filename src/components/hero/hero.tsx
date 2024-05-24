/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Chart_5 from "../chart/chart_5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Hero() {
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
                </motion.div>
              </div>
                {/* Chart */}
                <div className="flex flex-warp md:flex-col mx-auto">
                  <Chart_5 />
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
