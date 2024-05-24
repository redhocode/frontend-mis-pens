"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const DonutChart = ({width=50, height=50}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [studentData, setStudentData] = useState<any[]>([]);
   const [totalData, setTotalData] = useState<number>(0);

  const { data: students } = useFetchStudent(); // Ganti dengan penggunaan hook atau fungsi pengambilan data yang sesuai

  useEffect(() => {
    if (students) {
      // Menghitung total jumlah data
      const total = students.length;
      setTotalData(total);
      // Proses data
      const statusCounts: { [key: string]: number } = {};
      students.forEach((student: any) => {
        if (statusCounts[student.status]) {
          statusCounts[student.status]++;
        } else {
          statusCounts[student.status] = 1;
        }
      });
      // Hancurkan chart sebelumnya jika ada
      if (chartRef.current) {
        const chartInstance = Chart.getChart(chartRef.current);
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
      // Buat data untuk chart
      const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C7C7C7",
              "#5366FF",
              "#FF9F80",
              "#FF6347",
            ],
            borderColor: [
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
            ],
            borderWidth: 1,
          },
        ],
      };

      // Buat chart
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "pie",
            data: chartData,
          });
        }
      }
    }
  }, [students]);

  return (
    <Card className=" w-[270px] md:w-full">
      <CardHeader className="">
        <CardTitle className="">
          Setatus Mahasiswa
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <canvas
          ref={chartRef}
          className="my-chart" // Menggunakan class untuk styling
          width={width} // Menentukan lebar canvas
          height={height} // Menentukan tinggi canvas
        ></canvas>
      </CardContent>
      <CardFooter className="">
        <CardDescription className="">
          Total Data: {totalData}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default DonutChart;
