import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai

const DonutChart = () => {
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
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 205, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
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
    <div>
      <div>
    
        <canvas
          ref={semesterChartRef}
          className="my-chart" // Menggunakan class untuk styling
          width="200" // Menentukan lebar canvas
          height="200" // Menentukan tinggi canvas
        ></canvas>
        <p>Total Data: {totalData}</p>
      </div>
    </div>
  );
};

export default DonutChart;
