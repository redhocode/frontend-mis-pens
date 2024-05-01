import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai

const BarChart = () => {
  const angkatanChartRef = useRef<HTMLCanvasElement | null>(null);
  const [totalData, setTotalData] = useState<number>(0);

  const { data: students } = useFetchStudent(); // Ganti dengan penggunaan hook atau fungsi pengambilan data yang sesuai

  useEffect(() => {
    if (students) {
      // Menghitung total jumlah data
      const total = students.length;
      setTotalData(total);

      // Proses data angkatan
      const angkatanCounts: { [key: string]: number } = {};
      students.forEach((student: any) => {
        if (angkatanCounts[student.year]) {
          angkatanCounts[student.year]++;
        } else {
          angkatanCounts[student.year] = 1;
        }
      });
      // Hancurkan chart sebelumnya jika ada
      if (angkatanChartRef.current) {
        const chartInstance = Chart.getChart(angkatanChartRef.current);
        if (chartInstance) {
          chartInstance.destroy();
        }
      }

      // Buat chart untuk angkatan
      if (angkatanChartRef.current) {
        const ctx = angkatanChartRef.current.getContext("2d");
        if (ctx) {
          const angkatanChartData = {
            labels: Object.keys(angkatanCounts),
            datasets: [
              {
                label: "Angkatan",
                data: Object.values(angkatanCounts),
                backgroundColor: [
                  "rgba(75, 192, 192, 0.2)", // Warna untuk angkatan
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)", // Warna untuk angkatan
                  "rgba(255, 99, 132, 6)",
                  "rgba(54, 162, 235, 6)",
                  "rgba(255, 206, 87, 6)",
                ],
                borderWidth: 1,
              },
            ],
          };

          new Chart(ctx, {
            type: "bar",
            data: angkatanChartData,
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    }
  }, [students]);

  return (
    <div>
      <div>
        <canvas
          ref={angkatanChartRef}
          className="my-chart" // Menggunakan class untuk styling
          width="300" // Menentukan lebar canvas
          height="300" // Menentukan tinggi canvas
        ></canvas>
        <p>Total Data: {totalData}</p>
      </div>
    </div>
  );
};

export default BarChart;
