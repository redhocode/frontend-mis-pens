"use client";
import React, { useState } from "react";
import {
  useFetchAcademic,
  useFetchActivity,
  useFetchScholarship,
} from "@/features";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Academic, Activity, Scholarship, Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { LoaderIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CradScholarships = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchData,
  } = useFetchScholarship(page, pageSize, filterValue);

  const totalStudents = data?.length || 0;
  const totalPages = Math.ceil(totalStudents / pageSize);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  //   const handleFilterChange = (value: string) => {
  //     console.log("New Filter Value:", value); // Tambahkan logging di sini
  //     setFilterValue(value);
  //   };
  // const imageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
  //   return `https://unsplash.com/photos/shallow-focus-photography-of-books-lUaaKCUANVI/`
  // }
  const renderStudent = (
    page: number,
    pageSize: number,
    data: Scholarship[],
    searchTerm: string,
    filterValue: string
  ) => {
    // console.log("Data Mahasiswa:", data);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    // Filter berdasarkan filterValue
    let filteredData = data;
    // if (filterValue === "Belum Lulus") {
    //   filteredData = filteredData?.filter(
    //     (academic: Academic) => student.status === "Belum Lulus"
    //   );
    // } else if (filterValue === "2") {
    //   filteredData = filteredData?.filter((student) => student.ipk < 2);
    // } else if (filterValue === "Cuti") {
    //   filteredData = filteredData?.filter(
    //     (student) => student.status === "Cuti"
    //   );
    // }

    // Filter berdasarkan searchTerm
    if (searchTerm) {
      filteredData = filteredData?.filter((data: Scholarship) => {
        const searchTermLower = searchTerm.toLowerCase();
        const fieldsToSearch = [
          data.title,
          data.description,
          data.date,
          data.link,
        ];

        // Cek apakah setiap field mengandung kata kunci pencarian (dalam huruf kecil)
        return fieldsToSearch.some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(searchTermLower)
        );
      });
    }

    const dataToRender = filteredData?.slice(startIndex, endIndex);
    return dataToRender?.map((data: Scholarship) => {
      return (
        <Card className="w-[500px] md:w-full" key={data.id}>
          <CardHeader>
            <CardTitle>
              <span>{data.title}</span>
            </CardTitle>
            <CardDescription>
              <span>{data.date}</span>

              <div className="flex flex-col space-y-3 mt-2">
                {!data.image ? ( // Periksa jika tidak ada gambar
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                ) : (
                  <img
                    src={
                      process.env.NODE_ENV === "production"
                        ? process.env.NEXT_PUBLIC_URL_IMAGE_PROD + data.image
                        : process.env.NEXT_PUBLIC_URL_IMAGE_DEV + data.image
                    }
                    alt="Activity Image h-[200px]"
                    className="object-cover"
                  />
                )}
              </div>
              <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Keterangan</Label>
            <ScrollArea className="h-[150px] w-full rounded-md border p-4">
              <p>{data.description}</p>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={data.link} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="ml-2 bg-primary text-white">
                Lebih Lanjut
              </Button>
            </Link>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <>
      <div className="flex justify-center flex-col mx-auto mb-12">
        <div className="flex flex-col justify-center mb-12 mx-auto max-w-4xl">
          {" "}
          <h1 className="text-4xl font-bold justify-center mb-4 mx-auto uppercase">
            Informasi Beasiswa
          </h1>
          <p className="mb-4 text-justify">
            Selamat datang di halaman informasi mahasiswa untuk Program
            Pendidikan Jarak Jauh (PJJ) D3 Teknik Informatika di Politeknik
            Elektronika Negeri Surabaya (PENS). Di sini Anda dapat menemukan
            informasi tentang berbagai fasilitas dan layanan yang tersedia untuk
            mahasiswa PJJ, serta tips dan saran untuk menyelesaikan studi secara
            efektif dalam lingkungan pembelajaran jarak jauh.
          </p>
          <p className="mb-4 text-justify">
            Jika Anda adalah mahasiswa PJJ D3 Teknik Informatika di PENS,
            pastikan Anda memanfaatkan semua fasilitas yang tersedia, termasuk
            platform pembelajaran daring, perpustakaan online, dan layanan
            konseling akademik. Anda juga dapat bergabung dalam forum diskusi
            atau grup studi online untuk berinteraksi dengan sesama mahasiswa
            dan mendukung proses belajar Anda.
          </p>
          <hr className="mt-4 ouline" />
        </div>
        <div className="flex justify-center flex-wrap">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari data."
            className="md:w-full mt-2 mb-2 w-[700px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-gray-300"
          />
        </div>
        <div className="flex justify-center flex-wrap mb-6"></div>
      </div>
      <div className="flex gap-4 mb-5 justify-center md:flex-col">
        {renderStudent(page, pageSize, data, searchTerm, filterValue)}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <p className="font-semibold mr-1">Loading</p>
            <LoaderIcon className="animate-spin h-10 w-10" />
          </div>
        )}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            if (index < 2 || index >= totalPages - 2) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (index === 2) {
              return <PaginationEllipsis key={index} />;
            }
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* Total Data : {totalStudents} */}
    </>
  );
};

export default CradScholarships;
