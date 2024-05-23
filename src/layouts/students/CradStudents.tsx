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
import { PageWrapper } from "@/components/animate/page-wrapper";
import { Separator } from "@/components/ui/separator";
import CardSkeleton3 from "@/components/skeleton/card-skeleton3";
import { CDN } from "@/lib/cdn";

const CradStudentsUser = () => {
  const [totalFilteredData, setTotalFilteredData] = useState<number | null>(
    null
  );

  const pageSize = 3;
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
    setFilterValue(value);

    const filteredData = data.filter((student: Student) => {
      if (value === "Aktif") {
        return student.status === "Aktif";
      } else if (value === "1.8") {
        return student.ipk < 1.8;
      } else if (value === "Cuti") {
        return student.status === "Cuti";
      } else {
        return true;
      }
    });

    setTotalFilteredData(filteredData?.length ?? 0);
  };

  const renderStudent = (
    page: number,
    pageSize: number,
    data: Student[],
    searchTerm: string,
    filterValue: string
  ) => {
    if (isLoading) {
      return Array.from({ length: pageSize }).map((_, index) => (
        <CardSkeleton3 key={index} />
      ));
    }

    if (!data || data.length === 0) {
      return <p>No students found.</p>;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);

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
    } else if (filterValue === "Lulus") {
      filteredData = filteredData?.filter(
        (student) => student.status === "Lulus"
      );
    }

    const totalFilteredData = filteredData?.length || 0;

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
        <Card
          className="w-[270px] md:w-full dark:bg-zinc-800 "
          key={student.id}
        >
          <CardHeader>
            <CardTitle>
              <span>{student.name}</span>
            </CardTitle>
            <CardDescription>
              <span>{student.major}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3 mt-2 pb-4 justify-center mx-auto">
              {!student.image ? (
                <Skeleton className="h-[294px] w-full rounded-xl" />
              ) : (
                <img
                  src={
                    CDN + student.image
                   }
                  alt="Activity Image"
                  className="object-cover h-[294px] transition duration-300 ease-in-out rounded-xl hover:scale-105 cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-between flex-col gap-3 outline outline-1 py-4 px-4 outline-slate-100 rounded-md shadow-sm">
              <div className="flex justify-between gap-3">
                <div className="flex flex-col font-semibold">
                  <span>NRP</span>
                  <span>Angkatan</span>
                  <span>Semester</span>
                  <span>IPK</span>
                  <span>Beasiswa</span>
                </div>
                <div className="flex flex-col">
                  <span>:</span>
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
                  <span>{student.receivedAwardName}</span>
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
        <div className="flex flex-col mb-12   bg-white text-zinc-900 px-4 py-4 rounded-lg shadow-md dark:bg-neutral-800 dark:text-white max-w-4xl mx-auto justify-center">
          <h1 className="text-2xl font-bold justify-center mb-4 mx-auto uppercase">
            Data Mahasiswa
          </h1>
          <div className="">
            <section className="block mx-auto container max-w-4xl text-justify">
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
            className="md:w-full mt-2 mb-2 w-[700px]  dark:bg-zinc-800"
          />
        </div>
        <div className="flex justify-center flex-wrap mb-6">
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[700px] dark:bg-zinc-800">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent className="dark:bg-zinc-800">
              <SelectGroup>
                <SelectLabel>Filter Data Mahasiswa</SelectLabel>
                <SelectItem
                  value="Semua Data"
                  onClick={() => handleFilterChange("Semua Data")}
                >
                  Semua Data
                </SelectItem>
                <SelectItem
                  value="Aktif"
                  onClick={() => handleFilterChange("Aktif")}
                >
                  Aktif
                </SelectItem>
                <SelectItem
                  value="1.8"
                  onClick={() => handleFilterChange("1.8")}
                >
                  IPK Dibawah 1.8
                </SelectItem>
                <SelectItem
                  value="Cuti"
                  onClick={() => handleFilterChange("Cuti")}
                >
                  Cuti
                </SelectItem>
                {/* <SelectItem
                  value="Lulus"
                  onClick={() => handleFilterChange("Lulus")}
                >
                  Lulus
                </SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="my-4 max-w-4xl border-2 justify-center mx-auto" />
      <div
        className="flex justify-center mx-auto mb-4 font-bold
      "
      >
        {totalFilteredData !== null && (
          <p>Jumlah data Mahasiswa yang ditampilkan: {totalFilteredData}</p>
        )}
      </div>

      <div className="flex flex-wrap mx-auto gap-4 justify-center mb-5">
        {renderStudent(page, pageSize, data, searchTerm, filterValue)}
        {isLoading && (
          <div className="flex items-center justify-center mt-4"></div>
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
