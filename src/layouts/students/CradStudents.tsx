"use client";
import React, { useState, useEffect } from "react";
import { useFetchStudent } from "@/features";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Student } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
const CradStudentsUser = () => {
  const [totalFilteredData, setTotalFilteredData] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filterValue, setFilterValue] = useState("Semua Data");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    refetch: refetchStudents,
  } = useFetchStudent(page, pageSize, filterValue);

  useEffect(() => {
    if (data) {
      const filteredData = handleFilterAndSearch(data, filterValue, searchTerm);
      setTotalFilteredData(filteredData.length);
    } else {
      setTotalFilteredData(0);
    }
  }, [data, filterValue, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const handleFilterAndSearch = (
    data: Student[],
    filterValue: string,
    searchTerm: string
  ) => {
    if (!data) return [];

    let filteredData = data;

    if (filterValue === "Aktif") {
      filteredData = filteredData.filter(
        (student) => student.status === "Aktif"
      );
    } else if (filterValue === "1.8") {
      filteredData = filteredData.filter((student) => student.ipk < 1.8);
    } else if (filterValue === "Cuti") {
      filteredData = filteredData.filter(
        (student) => student.status === "Cuti"
      );
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredData = filteredData.filter((student: Student) => {
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

    return filteredData;
  };

  const renderStudent = (page: number, pageSize: number, data: Student[]) => {
    if (isLoading) {
      return Array.from({ length: pageSize }).map((_, index) => (
        <CardSkeleton3 key={index} />
      ));
    }

    if (!data || data.length === 0) {
      return <p>No students found.</p>;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);

    return data.slice(startIndex, endIndex).map((student: Student) => (
      <Card className="w-[270px] md:w-full dark:bg-zinc-800 " key={student.id}>
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
                src={student.image}
                alt="Student Image"
                className="object-cover h-[294px] transition duration-300 ease-in-out rounded-xl hover:scale-105 cursor-pointer"
              />
            )}
          </div>
          <div className="flex justify-between flex-col gap-3 dark:bg-zinc-900 py-4 px-4 rounded-md shadow-sm">
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
     
      </Card>
    ));
  };

  return (
    <>
      <div className="flex justify-center flex-col mx-auto">
        <div className="flex flex-col mb-12 bg-white text-zinc-900 px-4 py-4 rounded-lg shadow-md dark:bg-zinc-800 dark:text-white max-w-4xl mx-auto justify-center">
          <h1 className="text-2xl font-bold justify-center mb-4 mx-auto uppercase">
            Data Mahasiswa
          </h1>
          <div>
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
            className="md:w-full mt-2 mb-2 w-[700px] dark:bg-zinc-800"
          />
        </div>
        <div className="flex justify-center flex-wrap mb-6">
          <Tabs
            defaultValue="Semua Data"
            className="w-full items-center justify-center flex flex-col"
            onValueChange={handleFilterChange}
          >
            <TabsList className="shadow-sm px-4 py-4">
              <TabsTrigger value="Semua Data">Semua Data Mahasiswa</TabsTrigger>
              <TabsTrigger value="Aktif"> Mahasiswa Aktif</TabsTrigger>
              <TabsTrigger value="1.8"> Mahasiswa IPK Dibawah 1.8</TabsTrigger>
              <TabsTrigger value="Cuti">Mahasiswa Cuti</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator className="my-4 max-w-4xl border-2 justify-center mx-auto dark:border-zinc-800" />
      </div>

      <div className="flex justify-center mx-auto mb-4 font-bold">
        <p>
         
          <Badge variant="secondary" className="px-2 py-2">{totalFilteredData} {""} Mahasiswa</Badge>
        </p>
      </div>
      <div className="flex flex-wrap mx-auto gap-4 justify-center mb-5">
        {renderStudent(
          page,
          pageSize,
          handleFilterAndSearch(data || [], filterValue, searchTerm)
        )}
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
          {Array.from(
            { length: Math.ceil(totalFilteredData / pageSize) },
            (_, index) => {
              if (
                index < 2 ||
                index >= Math.ceil(totalFilteredData / pageSize) - 2
              ) {
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
            }
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(
                  Math.min(page + 1, Math.ceil(totalFilteredData / pageSize))
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default CradStudentsUser;
