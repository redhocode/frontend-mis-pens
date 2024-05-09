"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchStudent } from '@/features/useFetchData';
import { Student } from '@/types';
import React, { useEffect, useRef, useState } from "react";
import type Chart from "chart.js/auto";
import Chart_1 from '@/components/chart/chart_1';
import Chart_2 from '@/components/chart/chart_2';
import Chart_3 from '@/components/chart/chart_3';
import Chart_4 from '@/components/chart/chart_4';
import Welcome from '@/components/welcome';
const ChartDashboard = () => {

  return (
    <div className="flex flex-col px-4 py-4 w-full justify-between gap-4">
      <div className="flex flex-warp w-full gap-4 md:flex-col">
        <Card className="w-[400px] md:w-full">
          <CardHeader>
            <CardTitle>Status Mahasiswa</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Chart_1 />
          </CardContent>
        </Card>
        <Card className="w-[400px] md:w-full">
          <CardHeader>
            <CardTitle>Angkatan</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Chart_2 />
          </CardContent>
        </Card>
        <Card className="w-[400px] md:w-full">
          <CardHeader>
            <CardTitle>IPK</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Chart_3 />
          </CardContent>
        </Card>
        <Card className="w-[400px] md:w-full">
          <CardHeader>
            <CardTitle>Semester</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Chart_4/>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-warp gap-4 w-full md:flex-col">
        <div className="flex">
        
          {/* <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum facere nostrum debitis nam deleniti impedit ducimus,
                labore nesciunt esse totam molestias excepturi nihil! Fuga
                tenetur, atque quis quaerat tempora rem!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card> */}
        </div>
        <div className="flex">
          {" "}
          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                aperiam ex aliquid magnam, iusto maiores quas qui est eligendi
                repellendus harum ducimus officia, cum sequi dolor corporis?
                Architecto, iste veritatis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

export default ChartDashboard