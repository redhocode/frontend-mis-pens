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
  const semesterChartRef = useRef<HTMLCanvasElement | null>(null);
  const [totalData, setTotalData] = useState<number>(0);

  const { data: students } = useFetchStudent(); // Ganti dengan penggunaan hook atau fungsi pengambilan data yang sesuai

  useEffect(() => {
    if (students) {
      // Menghitung total jumlah data
      const total = students.length;
      setTotalData(total);

      // Proses data semester
      const semesterCounts: { [key: string]: number } = {};
      students.forEach((student: any) => {
        if (semesterCounts[student.semester]) {
          semesterCounts[student.semester]++;
        } else {
          semesterCounts[student.semester] = 1;
        }
      });

      // Hancurkan chart sebelumnya jika ada
      if (semesterChartRef.current) {
        const chartInstance = Chart.getChart(semesterChartRef.current);
        if (chartInstance) {
          chartInstance.destroy();
        }
      }

      // Buat chart untuk semester
      if (semesterChartRef.current) {
        const ctx = semesterChartRef.current.getContext("2d");
        if (ctx) {
          const semesterChartData = {
            labels: Object.keys(semesterCounts),
            datasets: [
              {
                label: "Semester",
                data: Object.values(semesterCounts),
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

          new Chart(ctx, {
            type: "doughnut",
            data: semesterChartData,
          });
        }
      }
    }
  }, [students]);

  return (
    <Card className="w-[270px] md:w-full">
      <CardHeader className="">
        <CardTitle className="">Jumlah Mahasiswa Per-Semester</CardTitle>
      </CardHeader>
      <CardContent className="">
        <canvas
          ref={semesterChartRef}
          className="my-chart hover:cursor-pointer transition duration-300 ease-in-out hover:scale-105" // Menggunakan class untuk styling
          width={width} // Menentukan lebar canvas
          height={height} // Menentukan tinggi canvas
        ></canvas>
      </CardContent>
      <CardFooter className="">
        <CardDescription className="">Total Data: {totalData}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default DonutChart;
