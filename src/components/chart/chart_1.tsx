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
const DonutChart = ({ width = 50, height = 50 }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [totalData, setTotalData] = useState<number>(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };
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

  const chartClassName = isEnlarged
    ? {
        transform: isEnlarged ? "scale(1)" : "scale(0.5)",
        transition: "transform 0.3s ease-in-out",
      }
    : {};

  return (
    <Card className="w-[270px] md:w-full relative">
      <CardHeader>
        <CardTitle>Data Status Mahasiswa</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div
          className={`my-chart-container 
          }`}
        >
          <canvas
            ref={chartRef}
            className={`my-chart  ${chartClassName} hover:cursor-pointer transition duration-300 ease-in-out hover:scale-105`}
            width={width}
            height={height}
            onClick={toggleEnlarged}
          ></canvas>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>Total Data: {totalData}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default DonutChart;
