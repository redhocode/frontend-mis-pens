import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useFetchStudent } from "@/features"; // Ganti dengan fungsi pengambilan data dari database yang sesuai

const LineChart = () => {
  const ipkChartRef = useRef<HTMLCanvasElement | null>(null);
  const [totalData, setTotalData] = useState<number>(0);
  const [allIpk, setAllIpk] = useState<number[]>([]);

  const { data: students } = useFetchStudent(); // Ganti dengan penggunaan hook atau fungsi pengambilan data yang sesuai

 useEffect(() => {
   if (students) {
     // Menghitung total jumlah data
     const total = students.length;
     setTotalData(total);

     // Memproses semua IPK dari data mahasiswa
     const ipkData = students.map((student: any) => {
       // Pastikan nilai IPK tidak melebihi 4.0
       return Math.min(student.ipk, 4.0);
     });

     // Set state untuk semua IPK
     setAllIpk(ipkData);

     // Persiapan data untuk chart
     const ipkChartData = {
       labels: ipkData.map((ipk: number, index: number) => index + 1), // Menggunakan nomor urut sebagai label
       datasets: [
         {
           label: "IPK",
           data: ipkData,
           fill: false,
           borderColor: "rgba(75, 192, 192, 1)",
           tension: 0.1,
         },
       ],
     };

     // Hancurkan chart sebelumnya jika ada
     if (ipkChartRef.current) {
       const chartInstance = Chart.getChart(ipkChartRef.current);
       if (chartInstance) {
         chartInstance.destroy();
       }
     }

     // Membuat chart untuk IPK
     if (ipkChartRef.current) {
       const ctx = ipkChartRef.current.getContext("2d");
       if (ctx) {
         new Chart(ctx, {
           type: "line",
           data: ipkChartData,
         });
       }
     }
   }
 }, [students]);

  return (
    <div>
      <div>
        <canvas
          ref={ipkChartRef}
          className="my-chart" // Menggunakan class untuk styling
          width="200" // Menentukan lebar canvas
          height="200" // Menentukan tinggi canvas
        ></canvas>
        <p>Total Data: {totalData}</p>
      </div>
    </div>
  );
};

export default LineChart;
