"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai

const PieChart = () => {
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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)", // Warna untuk tahun angkatan
              // Tambahkan warna tambahan jika ada status lainnya
            ],
            borderColor: [
              "rgba(255, 99, 132, 6)",
              "rgba(54, 162, 235, 6)",
              "rgba(255, 206, 87, 6)",
              // Tambahkan warna tambahan jika ada status lainnya
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
    <div className="flex flex-col items-center">
      <h1>Pie Chart</h1>
      <canvas
        ref={chartRef}
        className="my-chart" // Menggunakan class untuk styling
        width="200" // Menentukan lebar canvas
        height="200" // Menentukan tinggi canvas
      ></canvas>
      <span className="bottom-0">Total Data: {totalData}</span>
    </div>
  );
};

export default PieChart;
