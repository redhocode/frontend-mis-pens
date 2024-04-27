"use client";
import React, { useState } from "react";
import { useFetchAcademic, useFetchActivity } from "@/features";
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
import type { Academic, Activity, Student } from "@/types";
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
import { Skeleton } from "@/components/ui/skeleton";
export const CradActivities = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchData,
  } = useFetchActivity(page, pageSize, filterValue);

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

  const renderStudent = (
    page: number,
    pageSize: number,
    data: Activity[],
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
      filteredData = filteredData?.filter((data: Activity) => {
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
    return dataToRender?.map((data: Activity) => {
      return (
        <Card
          className="w-[400px] md:w-full outline outline-primary"
          key={data.id}
        >
          <CardHeader>
            <CardTitle>
              <span>{data.title}</span>
            </CardTitle>
            <CardDescription>
              <span>{data.date}</span>
              <br />
              <div className="flex flex-col space-y-3 mt-2">
                <Skeleton className="h-[100px] w-full rounded-xl" />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.description}</p>
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
          
           
          <h1 className="text-4xl font-bold justify-center mb-4 mx-auto uppercase">
            Informasi Kegiatan
          </h1>
              {" "}
              <p className="mb-4 text-justify">
                Selamat datang di halaman informasi kegiatan untuk Program
                Pendidikan Jarak Jauh (PJJ) D3 Teknik Informatika di Politeknik
                Elektronika Negeri Surabaya (PENS). Di sini Anda dapat menemukan
                informasi tentang berbagai kegiatan di luar jam kuliah atau
                kegiatan yang bersifat ekstrakurikuler, seperti kegiatan UKM,
                seminar, workshop, dan lain sebagainya.
              </p>
              <p className="mb-4 text-justify">
                Jika Anda tertarik untuk mengikuti kegiatan di luar jam kuliah,
                silakan hubungi bagian kemahasiswaan atau kunjungi situs web
                resmi PENS untuk informasi lebih lanjut mengenai kegiatan yang
                tersedia dan cara untuk bergabung.
              </p>
             
            

            <hr className="mt-4 ouline" />
         
        </div>
        <div className="flex justify-center flex-wrap">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari data."
            className="md:w-full mt-2 mb-2 w-[700px]"
          />
        </div>
        <div className="flex justify-center flex-wrap mb-6"></div>
      </div>
      <div className="flex flex-wrap mx-auto gap-4 justify-center mb-5">
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
    </>
  );
};

export default CradActivities;
