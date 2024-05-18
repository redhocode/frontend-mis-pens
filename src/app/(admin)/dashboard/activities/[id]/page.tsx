"use client";
import { PageWrapper } from "@/components/animate/page-wrapper";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import {
  useFetchDataAcademicById,
  useFetchDataById,
  useFetchDataActivityById,
} from "@/features/useFetchDataById";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CardSkeleton from "@/components/skeleton/card-skeleton";
interface pageProps {
  params: {
    id: string;
  };
}
const Page: React.FC<pageProps> = ({ params }) => {
  const router = useRouter();
  // Gunakan hook useFetchDataById untuk mengambil data berdasarkan ID
  const { data, isLoading } = useFetchDataActivityById(params.id);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center mt-4">
          <CardSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <section className="mt-32 px-4 py-4 container shadow-inner min-h-screen">
     
        <PageWrapper>
          <div className="flex gap-4 mb-5 justify-center md:flex-col flex-col mx-auto items-center">
            {data.data ? (
              <div>
                {/* Tambahkan komponen lain sesuai kebutuhan */}
                <Card className="md:w-full min-h-screen w-[800px]">
                  <CardHeader>
                    <CardTitle>{data.data.title}</CardTitle>
                    <CardDescription>
                      <span>{data.data.date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-3 mt-2">
                      {!data.data.image ? ( // Periksa jika tidak ada gambar
                        <span></span>
                      ) : (
                        <img
                          src={
                            process.env.NODE_ENV === "production"
                              ? process.env.NEXT_PUBLIC_URL_IMAGE_PROD +
                                data.data.image
                              : process.env.NEXT_PUBLIC_URL_IMAGE_DEV +
                                data.data.image
                          }
                          alt="Activity Image"
                          className="object-cover cursor-pointer w-full h-xl min-w-screen"
                        />
                      )}
                    </div>
                    <br />
                    <Label>Keterangan</Label>
                    <ScrollArea className="min-h-screen w-full rounded-md border p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.data.description,
                        }}
                        className="text-justify"
                      />
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="uppercase font-thin">
                      by: {data.data.username}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <p>Data tidak ditemukan</p>
            )}
          </div>
        </PageWrapper>
      </section>
    
    </>
  );
};
export default Page;
