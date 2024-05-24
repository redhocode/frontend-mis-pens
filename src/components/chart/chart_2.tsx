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
const BarChart = ({width = 50, height = 50}) => {
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
    <Card className="w-[270px] md:w-full">
      <CardHeader className="">
        <CardTitle className="">
          Jumlah Mahasiswa Per-Angkatan
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <canvas
          ref={angkatanChartRef}
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

export default BarChart;
