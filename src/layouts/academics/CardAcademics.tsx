"use client";
import React, { useState } from "react";
import { useFetchAcademic } from "@/features";
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
import type { Academic, Student } from "@/types";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageWrapper } from "@/components/animate/page-wrapper";
import DetailAcademic from "@/components/button/ButtonDetailAcademic";
import CradSkeleton from "@/components/skeleton/card-skeleton";
import CardSkeleton from "@/components/skeleton/card-skeleton";
export const CradAcademics = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchData,
  } = useFetchAcademic(page, pageSize, filterValue);

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
    console.log("New Filter Value:", value); // Tambahkan logging di sini
    setFilterValue(value);
  };

  const renderStudent = (
    page: number,
    pageSize: number,
    data: Academic[],
    searchTerm: string,
    filterValue: string
  ) => {
    // Tambahkan pengecekan jika data kosong
    if (!data || data.length === 0) {
      // Tampilkan skeleton terus menerus
      return Array.from({ length: pageSize }).map((_, index) => (
        <CardSkeleton key={index} />
      ));
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    // Filter berdasarkan filterValue
    let filteredData = data;
    if (searchTerm) {
      filteredData = filteredData?.filter((data: Academic) => {
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
    return dataToRender?.map((data: Academic) => {
      return (
        <Card className="w-full md:w-full outline-1" key={data.id}>
          <CardHeader>
            <CardTitle>
              <span>{data.title}</span>
            </CardTitle>
            <CardDescription>
              <span>{data.date}</span>
              <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Keterangan</Label>
            <ScrollArea className="h-[150px] w-full rounded-md border p-4">
              <p>{data.description}</p>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button variant="ghost" className="uppercase font-thin">
              by: {data.username}
            </Button>
            {!data.link ? (
              <span></span>
            ) : (
              <Link href={data.link} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="">
                  <span>Link</span>
                </Button>
              </Link>
            )}
            <DetailAcademic id={data.id} />
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <>
      <PageWrapper>
        <div className="flex justify-center flex-col mx-auto mb-12">
          <div className="flex flex-col justify-center mb-12 mx-auto max-w-4xl bg-white text-zinc-900 px-4 py-4 rounded-lg shadow-md dark:bg-zinc-950 dark:text-white">
            <h1 className="text-4xl font-bold justify-center mb-4 mx-auto uppercase">
              Informasi Akademik
            </h1>
            <article className="block mx-auto  max-w-4xl text-justify ">
              <p className="mb-4">
                Selamat datang di halaman informasi akademik untuk Program
                Pendidikan Jarak Jauh (PJJ) D3 Teknik Informatika di Politeknik
                Elektronika Negeri Surabaya (PENS). Program PJJ D3 Teknik
                Informatika merupakan salah satu program pendidikan yang
                diselenggarakan oleh PENS untuk memberikan kesempatan kepada
                masyarakat yang ingin mengembangkan pengetahuan dan keterampilan
                di bidang teknik informatika, tanpa harus menghadiri perkuliahan
                secara langsung di kampus.
              </p>
              <p className="mb-4">
                Jika Anda tertarik untuk bergabung dengan Program PJJ D3 Teknik
                Informatika di PENS, jangan ragu untuk menghubungi bagian
                penerimaan mahasiswa atau mengunjungi situs web resmi PENS untuk
                informasi lebih lanjut mengenai persyaratan pendaftaran dan
                jadwal kuliah.
              </p>
            </article>
            <div className="flex justify-center mt-5">
              <embed
                src="https://pjj.pens.ac.id/wp-content/uploads/2017/03/Final-Kurikulum-2022-2.pdf"
                width="100%"
                height=""
                className="max-w-4xl mb-5 h-[400px] md:h-[300px]"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-center flex-wrap">
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Cari data."
              className="md:w-full max-w-4xl mt-2 w-[700px] h-[50px] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col mx-auto gap-4 justify-center mb-5 max-w-4xl">
          {renderStudent(page, pageSize, data, searchTerm, filterValue)}
          {isLoading && (
            <div className="flex items-center justify-center mt-4">
              <CradSkeleton />
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
      </PageWrapper>
    </>
  );
};

export default CradAcademics;
