"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { axiosInstance } from "../lib/axios";
import { useFetchStudent } from "../features";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";

type Student = {
  name: string;
  nrp: number | null;
  ipk: number | null;
  major: string;
  year: number | null;
  semester: number | null;
  status: string;
};

const ImportData = () => {
  const { data, isLoading, refetch } = useFetchStudent();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension === "csv") {
        parseCSV(file);
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        parseXLSX(file);
      } else {
        toast({
          variant: "destructive",
          title: "Error.",
          className: "max-w-sm",
          description:
            "File type not supported. Please upload a CSV or XLSX file.",
        });
      }
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<Student>(file, {
      complete: (result) => processParsedData(result.data),
      header: true,
    });
  };

  const parseXLSX = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        processParsedData(worksheet as unknown as Student[]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const processParsedData = async (data: any[]) => {
    const formattedData: Student[] = data.slice(1).map((row: any) => {
      const parseNumber = (value: any) => {
        const parsed = Number(value);
        return isNaN(parsed) ? null : parsed;
      };

      return {
        name: row.Name || row[2],
        nrp: parseNumber(row.NRP || row[1]),
        ipk: parseNumber(row.IPK || row[6]),
        major: row.Major || row[3],
        year: parseNumber(row.Year || row[4]),
        semester: parseNumber(row.Semester || row[5]),
        status: row.Status || row[7],
      };
    });

    for (const student of formattedData) {
      if (
        student.name &&
        student.nrp !== null &&
        student.ipk !== null &&
        student.major &&
        student.year !== null &&
        student.semester !== null &&
        student.status
      ) {
        try {
          await uploadStudents.mutateAsync(student);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to post data. Please try again later.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          console.error("Failed to post data:", error);
        }
      } else {
        console.error("Invalid data:", student);
      }
    }
  };

  const uploadStudents = useMutation({
    mutationFn: async (studentData: Student) => {
      try {
        const formData = new FormData();
        for (const key in studentData) {
          formData.append(key, studentData[key as keyof Student] as any);
        }
        const studentsRes = await axiosInstance.post("/students", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return studentsRes;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        className: "max-w-sm",
        description: "Data imported successfully.",
      });
      refetch();
    
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          window.open(
            "https://docs.google.com/spreadsheets/d/1ICMVYhdeTWyPc_UjM_0UqEOrjwCKmeNL/edit?usp=sharing&ouid=108188902208781559894&rtpof=true&sd=true","_blank"
          )
        }
        variant={"outline"}
      >
        <Download className="mr-2 h-4 w-4" />
        Template Import
      </Button>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleFileUpload} variant={"outline"}>
        Import
      </Button>
    </div>
  );
};

export default ImportData;
