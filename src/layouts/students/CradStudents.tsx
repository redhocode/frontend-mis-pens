"use client";
import React, { useState } from "react";
import { useFetchStudent } from "@/features";
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
import type { Student } from "@/types";
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
import { Skeleton } from "@/components/ui/skeleton";

const CradStudentsUser = () => {
  const [totalFilteredData, setTotalFilteredData] = useState<number | null>(null);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchStudents,
  } = useFetchStudent(page, pageSize, filterValue);

  const totalStudents = data?.length || 0;
  const totalPages = Math.ceil(totalStudents / pageSize);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

 const handleFilterChange = (value: string) => {
  //console.log("New Filter Value:", value); // Tambahkan logging di sini
  setFilterValue(value);
  
  // Setelah Anda melakukan pemfilteran data, update totalFilteredData di sini
  const filteredData = data.filter((student: Student) => {
    // Logika pemfilteran data sesuai dengan value dari filter
    if (value === "Aktif") {
      return student.status === "Aktif";
    } else if (value === "1.8") {
      return student.ipk < 1.8;
    } else if (value === "Cuti") {
      return student.status === "Cuti";
    } else {
      // Jika tidak ada filter yang sesuai, maka data tidak difilter
      return true;
    }
  });
  
  setTotalFilteredData(filteredData.length);
};



  const renderStudent = (
    page: number,
    pageSize: number,
    data: Student[],
    searchTerm: string,
    filterValue: string
  ) => {
    // console.log("Data Mahasiswa:", data);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    // Filter berdasarkan filterValue
    let filteredData = data;
    if (filterValue === "Aktif") {
      filteredData = filteredData?.filter(
        (student: Student) => student.status === "Aktif"
      );
    } else if (filterValue === "1.8") {
      filteredData = filteredData?.filter((student) => student.ipk < 1.8);
    } else if (filterValue === "Cuti") {
      filteredData = filteredData?.filter(
        (student) => student.status === "Cuti"
      );
    }
    // Hitung jumlah data setelah filter
const totalFilteredData = filteredData?.length || 0;

    // Filter berdasarkan searchTerm
    if (searchTerm) {
      filteredData = filteredData?.filter((student: Student) => {
        const searchTermLower = searchTerm.toLowerCase();
        const fieldsToSearch = [
          student.name,
          student.nrp,
          student.major,
          student.year.toString(),
          student.semester.toString(),
          student.ipk.toString(),
          student.status,
        ];

        // Cek apakah setiap field mengandung kata kunci pencarian (dalam huruf kecil)
        return fieldsToSearch.some(
          (field) =>
            typeof field === "string" &&
            field.toLowerCase().includes(searchTermLower)
        );
      });
    }

    const studentsToRender = filteredData?.slice(startIndex, endIndex);
    return studentsToRender?.map((student: Student) => {
      return (
        <Card className="w-[270px] md:w-full" key={student.id}>
          <CardHeader>
            <CardTitle>
              <span>{student.name}</span>
            </CardTitle>
            <CardDescription>
              <span>{student.major}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Avatar className="w-[200px] h-[200px] justify-center mx-auto mb-5 rounded-none">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Uhuy</AvatarFallback>
            </Avatar> */}
                  <div className="flex flex-col space-y-3 mt-2 pb-4">
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </div>
            <div className="flex justify-between flex-col gap-3 outline outline-1 py-4 px-4 outline-slate-100 rounded-md shadow-sm">
              <div className="flex justify-between gap-3">
                <div className="flex flex-col font-semibold">
                  <span>NRP</span>
                  <span>Angkatan</span>
                  <span>Semester</span>
                  <span>IPK</span>
                </div>
                <div className="flex flex-col">
                  <span>:</span>
                  <span>:</span>
                  <span>:</span>
                  <span>:</span>
                </div>
                <div className="flex flex-col">
                  <span>{student.nrp}</span>
                  <span>{student.year}</span>
                  <span>{student.semester}</span>
                  <span>{student.ipk}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
  
        </Card>
      );
    });
  };

  return (
    <>
      <div className="flex justify-center flex-col mx-auto">
       
        <div className="flex flex-col justify-center mb-12  ">
          <h1 className="text-2xl font-bold justify-center mb-4 mx-auto uppercase">
            - Data Mahasiswa -
          </h1>
          <div className="">
            <section className="block mx-auto container max-w-4xl text-justif">
              <p className="mb-4">
                Selamat datang di halaman informasi mahasiswa untuk Program
                Pendidikan Jarak Jauh (PJJ) D3 Teknik Informatika di Politeknik
                Elektronika Negeri Surabaya (PENS). Di sini Anda dapat menemukan
                informasi tentang Mahasiwa yang sedang berkuliah di PENS.
              </p>
              <p>
                Semoga informasi ini membantu Anda dalam menavigasi pengalaman
                belajar Anda sebagai mahasiswa PJJ D3 Teknik Informatika. Terima
                kasih telah mengunjungi halaman informasi mahasiswa ini.
              </p>
            </section>
          </div>
     
        </div>
        <div className="flex justify-center flex-wrap">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari Data Mahasiswa..."
            className="md:w-full mt-2 mb-2 w-[700px]"
          />
        </div>
        <div className="flex justify-center flex-wrap mb-6">
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[700px]">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter Data Mahasiswa</SelectLabel>
                <SelectItem
                  value="Aktif"
                  onClick={() => handleFilterChange("Aktif")}
                >
                  Aktif
                </SelectItem>
                <SelectItem value="1.8" onClick={() => handleFilterChange("1.8")}>
                  IPK Dibawah 1.8
                </SelectItem>
                <SelectItem
                  value="Cuti"
                  onClick={() => handleFilterChange("Cuti")}
                >
                  Cuti
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <hr className="mb-4" />
      </div>
      <div className="flex justify-center mx-auto mb-4 font-bold
      ">

        {totalFilteredData !== null && (
  <p>Jumlah data Mahasiswa yang ditampilkan: {totalFilteredData}</p>
)}
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

export default CradStudentsUser;
