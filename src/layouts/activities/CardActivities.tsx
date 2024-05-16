"use client";
import React, { useState } from "react";
import { useFetchAcademic, useFetchActivity } from "@/features";
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
import { Input } from "@/components/ui/input";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import DetailActivity from "@/components/button/ButtonDetailActivity";
import CardSkeleton2 from "@/components/skeleton/card-skeleton2";
export const CradActivities = () => {
  const pageSize = 2;
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

  const renderStudent = (
    page: number,
    pageSize: number,
    data: Activity[],
    searchTerm: string,
    filterValue: string
  ) => {
    // Tambahkan pengecekan jika data kosong
    if (!data || data.length === 0) {
      // Tampilkan skeleton terus menerus
      return Array.from({ length: pageSize }).map((_, index) => (
        <CardSkeleton2 key={index} />
      ));
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    let filteredData = data;
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
        <Card className="w-[400px] md:w-full outline-1" key={data.id}>
          <CardHeader>
            <CardTitle>
              <span>{data.title}</span>
            </CardTitle>
            <CardDescription>
              <span>{data.date}</span>
              <br />
              <div className="flex flex-col space-y-3 mt-2">
                {!data.image ? ( // Periksa jika tidak ada gambar
                  <Skeleton className="h-[295px] w-full rounded-xl" />
                ) : (
                  <img
                    src={
                      process.env.NODE_ENV === "production"
                        ? process.env.NEXT_PUBLIC_URL_IMAGE_PROD + data.image
                        : process.env.NEXT_PUBLIC_URL_IMAGE_DEV + data.image
                    }
                    alt="Activity Image "
                    className="object-cover h-[200px]"
                  />
                )}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px] w-full rounded-md border p-4">
              <p>{data.description}</p>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
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
            <DetailActivity id={data.id} />
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <>
      <div className="flex justify-center flex-col mx-auto mb-12">
        <div className="flex flex-col justify-center mb-12 mx-auto max-w-4xl bg-white text-zinc-900 px-4 py-4 rounded-lg shadow-md dark:bg-zinc-950 dark:text-white">
          <h1 className="text-4xl font-bold justify-center mb-4 mx-auto uppercase">
            Informasi Kegiatan
          </h1>{" "}
          <p className="mb-4 text-justify">
            Selamat datang di halaman informasi kegiatan untuk Program
            Pendidikan Jarak Jauh (PJJ) D3 Teknik Informatika di Politeknik
            Elektronika Negeri Surabaya (PENS). Di sini Anda dapat menemukan
            informasi tentang berbagai kegiatan di luar jam kuliah atau kegiatan
            yang bersifat ekstrakurikuler, seperti kegiatan UKM, seminar,
            workshop, dan lain sebagainya.
          </p>
          <p className="mb-4 text-justify">
            Jika Anda tertarik untuk mengikuti kegiatan di luar jam kuliah,
            silakan hubungi bagian kemahasiswaan atau kunjungi situs web resmi
            PENS untuk informasi lebih lanjut mengenai kegiatan yang tersedia
            dan cara untuk bergabung.
          </p>
        </div>
        <Separator className="my-4 max-w-4xl border-2 justify-center mx-auto" />
        <div className="flex justify-center flex-wrap">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari data."
            className="md:w-full mt-2 mb-2 w-[700px] h-[50px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap mx-auto gap-4 justify-center mb-5">
        {renderStudent(page, pageSize, data, searchTerm, filterValue)}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
         
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
