"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai

const PieChart = ({ width = 200, height = 200 }) => {
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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(199, 199, 199, 0.2)",
              "rgba(83, 102, 255, 0.2)",
              "rgba(255, 159, 128, 0.2)",
              "rgba(255, 99, 71, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(199, 199, 199, 1)",
              "rgba(83, 102, 255, 1)",
              "rgba(255, 159, 128, 1)",
              "rgba(255, 99, 71, 1)",
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
        width={width} // Menentukan lebar canvas
        height={height} // Menentukan tinggi canvas
      ></canvas>
      <span className="bottom-0">Total Data: {totalData}</span>
    </div>
  );
};

export default PieChart;
