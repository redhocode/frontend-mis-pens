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
const PieChart = ({ width = 50, height = 50 }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [studentData, setStudentData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  const { data: students } = useFetchStudent(); // Ganti dengan penggunaan hook atau fungsi pengambilan data yang sesuai

  useEffect(() => {
    if (students) {
      // Filter out students with null graduated status
      const filteredStudents = students.filter(
        (student: any) => student.graduated !== null
      );

      // Menghitung total jumlah data
      const total = filteredStudents.length;
      setTotalData(total);

      // Proses data
      const statusCounts: { [key: string]: number } = {};
      filteredStudents.forEach((student: any) => {
        if (statusCounts[student.graduated]) {
          statusCounts[student.graduated]++;
        } else {
          statusCounts[student.graduated] = 1;
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
    <Card className="bg-white bg-opacity-10 backdrop-blur-lg w-[270px] md:w-full">
      <CardHeader className="bg-white bg-opacity-10 backdrop-blur-lg">
        <CardTitle className="text-secondarypens">Jumlah Mahasiswa Lulus Per-Tahun</CardTitle>
      </CardHeader>
      <CardContent className="bg-white bg-opacity-10 backdrop-blur-lg">
        <canvas
          ref={chartRef}
          className="my-chart text-secondarypens" // Menggunakan class untuk styling
          width={width} // Menentukan lebar canvas
          height={height} // Menentukan tinggi canvas
        ></canvas>
      </CardContent>
      <CardFooter className="bg-white bg-opacity-10 backdrop-blur-lg">
        <CardDescription className="text-secondarypens">Total Data: {totalData}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default PieChart;
