"use client";
import { PageWrapper } from "@/components/animate/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { useRouter } from "next/navigation";
import {
  useFetchDataAcademicById,
  useFetchDataById,
  useFetchDataActivityById,
} from "@/features/useFetchDataById";
import { Button } from "@/components/ui/button";
import { ScaleLoader } from "react-spinners";
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
        <div className="flex items-center justify-center h-screen">
          <ScaleLoader
            color="#f0d400"
            height={200}
            margin={5}
            radius={52}
            speedMultiplier={1}
            width={40}
          />
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
                <Card className="md:w-full min-h-screen w-[800px] dark:bg-zinc-800">
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
                          src={data.data.image!}
                          alt="academic Image"
                          className="object-cover cursor-pointer w-full h-xl min-w-screen"
                        />
                      )}
                    </div>
                    <br />

                    <div className="min-h-screen w-full rounded-md border p-4 px-2 py-2 dark:border-zinc-700">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.data.description,
                        }}
                        className="text-justify"
                      />
                    </div>
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
