"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
const CradSkeleton = () => {
  return (
    <Card className="md:w-full h-[600px] w-[350px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-full" />
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-52 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-56 w-full" />
      </CardFooter>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(CradSkeleton), { ssr: false });
