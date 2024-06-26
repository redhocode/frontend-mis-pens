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
const LineChart = ({width= 50, height= 50}) => {
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

       if (ipkChartRef.current) {
         const ctx = ipkChartRef.current.getContext("2d");
         if (ctx) {
           new Chart(ctx, {
             type: "line",
             data: ipkChartData,
             options: {
               scales: {
                 y: {
                   beginAtZero: true,
                   suggestedMax: 4.0,
                   ticks: {
                     stepSize: 0.5, // Atur step size sesuai kebutuhan
                    
                   },
                 },
               },
             },
           });
         }
       }
     }
   }, [students]);

  return (
    <Card className=" w-[270px] md:w-full">
      <CardHeader className="">
        <CardTitle className="">Jumlah Mahasiswa Per-IPK</CardTitle>
      </CardHeader>
      <CardContent className="">
        <canvas
          ref={ipkChartRef}
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

export default LineChart;
