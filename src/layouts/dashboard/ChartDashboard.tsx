"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchStudent } from "@/features/useFetchData";
import { Student } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import type Chart from "chart.js/auto";
import Chart_1 from "@/components/chart/chart_1";
import Chart_2 from "@/components/chart/chart_2";
import Chart_3 from "@/components/chart/chart_3";
import Chart_4 from "@/components/chart/chart_4";
import Welcome from "@/components/welcome";
import Chart_5 from "@/components/chart/chart_5";

const ChartDashboard = () => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Ambil informasi pengguna dari penyimpanan lokal saat komponen dimuat
    const username = localStorage.getItem("username");
    setUser(username);
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  // Periksa apakah pengguna adalah admin
  const isAdmin = role === "Admin";

  return (
    <div className="flex flex-col px-4 py-4 w-full justify-between gap-4">
      <div className="flex flex-warp w-full gap-4 md:flex-col">
        {/* Tampilkan chart hanya jika pengguna adalah admin */}
        {isAdmin && (
          <>
            <div className="flex flex-wrap md:flex-col mx-auto gap-5 md:hidden sm:hidden sm:flex-col">
              <Chart_1 />
              <Chart_2 />
              <Chart_3 />
              <Chart_4 />
              <Chart_5 />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-warp gap-4 w-full md:flex-col">
        {/* Tampilkan komponen tambahan jika pengguna adalah admin */}
        {isAdmin && (
          <div className="flex">
            {/* Tambahkan komponen tambahan di sini */}
          </div>
        )}
        {/* Tampilkan komponen tambahan di sini */}
      </div>
    </div>
  );
};

export default ChartDashboard;
