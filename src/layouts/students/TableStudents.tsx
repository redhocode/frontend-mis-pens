"use client";
import { useFetchScholarship, useFetchStudent } from "@/features";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CirclePlus, LoaderIcon } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useQuery, useMutation, Mutation } from "@tanstack/react-query";
import type { Scholarship, Student } from "@/types";
import { Button } from "@/components/ui/button";
import { ErrorMessage, useFormik, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CSVLink} from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import ImportData from "../../components/importdata"
export default function TableStudent() {
  const pageSize = 10; // Tentukan nilai pageSize
  const [page, setPage] = useState(1); // Tentukan nilai awal page
  const {
    data,
    isLoading,
    refetch: refetchStudents,
  } = useFetchStudent(page, pageSize);
  const {data: dataScholarship} = useFetchScholarship();
  // Mendapatkan total halaman dari data
  // Hitung total halaman berdasarkan jumlah data dan ukuran halaman
  const totalStudents = data?.length || 0; // Menggunakan data langsung, karena `useFetchStudent` sudah mengembalikan data, bukan respon lengkap
  const totalPages = Math.ceil(totalStudents / pageSize);
  //seach
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata kunci pencarian

  // Fungsi penanganan perubahan input untuk memperbarui state kata kunci pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { toast } = useToast();
  // Define validation schema
  const MAX_FILE_SIZE = 1024 * 1024;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    nrp: Yup.number()
      .required("NRP is required")
      .min(10, "NRP must be 8 digits"),
    ipk: Yup.number()
      .required("IPK is required")
      .lessThan(5, "IPK must be less than 4"),
    major: Yup.string().required("Major is required"),
    year: Yup.number().required("Year is required"),
    semester: Yup.number().required("Semester is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed()
      .test("fileSize", "File size too large", (value: any) => {
        // Jika value tidak ada (tidak ada gambar yang dipilih), maka validasi dilewati
        if (!value) return true;

        const file = value as File;
        return file.size <= MAX_FILE_SIZE;
      })
      .test("fileType", "Invalid file type", (value: any) => {
        // Jika value tidak ada (tidak ada gambar yang dipilih), maka validasi dilewati
        if (!value) return true;

        const file = value as File;
        return typeof file.type === "string" && file.type.includes("image");
      }),
  });
  const { mutate: CreateOrUpdateStudent } = useMutation({
    mutationFn: async () => {
      try {
        const { id, name, nrp, ipk, major, year, semester, status,graduated, image ,receivedAwardId,receivedAwardName} =
          formik.values;
        let studentsRes;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("nrp", nrp);
        formData.append("ipk", ipk);
        formData.append("major", major);
        formData.append("year", year);
        formData.append("semester", semester);
        formData.append("status", status);
        formData.append("receivedAwardId", receivedAwardId);
        formData.append("receivedAwardName", receivedAwardName);
        formData.append("graduated", graduated);

        if (image !== null) {
          formData.append("image", image);
        }
        if (id) {
          // Jika ada ID, berarti kita akan mengedit data
          studentsRes = await axiosInstance.patch(`/students/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          // Jika tidak ada ID, berarti kita akan membuat data baru
          // Jika tidak ada ID, berarti kita akan membuat data baru
          studentsRes = await axiosInstance.post("/students", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        return studentsRes;
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          className: "w-[400px]",
          description: "Failed to post data",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: () => {
      refetchStudents();
      formik.resetForm();
      setPreview(null);
      formik.setFieldValue("image", "");
      toast({
        title: "Success",
        className: "w-[400px]",
        description: "Data has been successfully posted",
      });
    },
  });

  // Define mutation for deleting student
  const { mutate: DeleteStudent } = useMutation({
    mutationFn: async (id: string) => {
      const studentsRes = await axiosInstance.delete(`/students/${id}`);
      return studentsRes;
    },
    onSuccess: () => {
      refetchStudents();
      toast({
        title: "Success",
        className: "w-[400px]",
        description: "Data has been successfully deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        className: "w-[400px]",
        description: "Failed to delete data",
        variant: "destructive",
      });
    },
  });

  //reset form
    const handleReset = () => {
      formik.resetForm();
    };

  const [preview, setPreview] = useState<string | null>(null);
  //remove image
  const handleRemoveImage = () => {
    setPreview(null); // Hapus pratinjau gambar
    formik.setFieldValue("image", ""); // Set nilai image ke string kosong
  }
  const hendlerSubmit = async (values: any) => {
    try {
       values.receivedAwardId = values.receivedAwardId;

      await CreateOrUpdateStudent(values);
      refetchStudents();
      toast({
        title: "Success",
        description: "Data has been successfully posted",
        className: "w-[400px]",
      });
      formik.resetForm(); // Reset the form after successful mutation
    } catch (error) {
      toast({
        title: "Error",
        className: "w-[400px]",
        description: "Failed to post data",
        variant: "destructive",
      });
    }
  };

  //submit handler function edit

  const formik = useFormik({
    initialValues: {
      name: "",
      nrp: "",
      ipk: "",
      major: "",
      year: "",
      semester: "",
      status: "",
      id: "",
      image: "",
      graduated: "",
      receivedAwardId: "",
      receivedAwardName: "",
    },
    validationSchema: validationSchema,
    onSubmit: hendlerSubmit,
  });
 // export data
   const generateExportData = (data: Student[]) => {
     return data.map((student, index) => ({
        No: index + 1,
       NRP: student.nrp,
       Name: student.name,
       Major: student.major,
       Year: student.year,
       Semester: student.semester,
       IPK: student.ipk,
       Status: student.status,
       Graduated: student.graduated,
       receivedAwardName: student.receivedAwardName
     }));
   };
 const downloadPDF = () => {
   const pdf = new jsPDF();
   const pdfData = generateExportData(data as Student[] || []);
   const headers = [
     "No",
     "NRP",
     "Nama",
     "Jurusan",
     "Angkatan",
     "Semester",
     "IPK",
     "Status",
     "Tahun Lulus",
     "Beasiswa"
   ];
   const dataRows = pdfData.map((student, index) => [
     index + 1,
     student.NRP,
     student.Name,
     student.Major,
     student.Year,
     student.Semester,
     student.IPK,
     student.Status,
     student.Graduated,
     student.receivedAwardName
   ]);
   autoTable(pdf, {
     head: [headers],
     body: dataRows,
   })
   pdf.save("students.pdf");
 };
   const downloadXLSX = () => {
     const xlsxData = generateExportData(data as Student[] || []);
     const worksheet = XLSX.utils.json_to_sheet(xlsxData);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
     XLSX.writeFile(workbook, "students.xlsx");
   };
// Define renderStudent function
  const renderStudent = (
    page: number,
    pageSize: number,
    data: Student[],
    searchTerm: string
  ) => {
    // Menghitung indeks awal dan akhir data yang harus dirender berdasarkan halaman saat ini
    refetchStudents();
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    const filteredData = data?.filter((student) => {
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
      // Cek apakah setiap field yang berupa string mengandung kata kunci pencarian (dalam huruf kecil)
      return fieldsToSearch.some(
        (field) =>
          typeof field === "string" &&
          field.toLowerCase().includes(searchTermLower)
      );
    });

    // Memotong array data yang telah difilter untuk hanya merender data yang sesuai dengan halaman saat ini
    const studentsToRender = filteredData?.slice(startIndex, endIndex);
    // Nomor urutan yang dimulai dari nomor tertentu (misalnya, 100)
    let orderNumber = startIndex + 1;
   
    return studentsToRender?.map((student: Student) => {
      const currentOrderNumber = orderNumber++;
      return (
        
        <TableRow key={student.id}>
          <TableCell className="w-[100px]" hidden>
            {student.id}
          </TableCell>
          <TableCell className="w-[50px]">{currentOrderNumber}</TableCell>
          <TableCell>{student.nrp}</TableCell>
          <TableCell>{student.name}</TableCell>
          <TableCell>{student.major}</TableCell>
          <TableCell>{student.year}</TableCell>
          <TableCell>{student.semester}</TableCell>
          <TableCell>{student.ipk}</TableCell>
          <TableCell>{student.status}</TableCell>
          <TableCell>{student.graduated}</TableCell>
          <TableCell>
            {!student.image ? ( // Periksa jika tidak ada gambar
              <Skeleton className="h-[50px] w-full rounded-xl" />
            ) : (
              <img
                src={student.image}
                alt="Image"
                className="object-cover h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            )}
          </TableCell>
          <TableCell>
            {!student.receivedAwardName ? (
              <span>-</span>
            ) : (
              <span>{student.receivedAwardName}</span>
            )}
          </TableCell>
          <TableCell className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  {/* Tambahkan ikon di dalam tombol */}
                  <Button
                    variant="ghost"
                    className="bg-primary text-white flex items-center outline-1 outline" // Tambahkan class flex dan items-center untuk menyesuaikan posisi ikon dan teks
                    onClick={() => {
                      // Atur nilai formik untuk id sesuai dengan id mahasiswa yang akan diedit
                      formik.setValues({
                        ...formik.values,
                        id: student.id,
                        // Atur nilai formik untuk bidang lainnya sesuai dengan data mahasiswa yang akan diedit
                        name: student.name,
                        nrp: student.nrp,
                        ipk: student.ipk.toString(),
                        major: student.major,
                        year: student.year.toString(),
                        semester: student.semester.toString(),
                        status: student.status,
                        graduated: student.graduated?.toString() || "",
                        receivedAwardId: student.receivedAwardId || "",
                        receivedAwardName: student.receivedAwardName || "",
                       
                       
                      });

                      setPreview(student.image);
                    }}
                  >
                    <Edit name="Edit" className="mr-2" />{" "}
                    {/* Tambahkan class mr-2 untuk memberikan margin kanan */}
                    Edit
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Student</DialogTitle>
                </DialogHeader>
                <Formik
                  initialValues={formik.initialValues}
                  validationSchema={validationSchema}
                  onSubmit={hendlerSubmit}
                >
                  <ScrollArea className="h-[700px] w-full rounded-md border p-4 md:h-[500px] md:w-[365px]">
                    <Form
                      className="flex flex-wrap "
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="w-full justify-normal gap-4 flex">
                        <div className="w-full">
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="nrp">NRP</Label>
                            <span>{formik.values.nrp}</span>
                            <Input
                              type="number"
                              id="nrp"
                              name="nrp"
                              placeholder="Enter your NRP"
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.nrp}
                            />
                            {formik.touched.nrp && formik.errors.nrp ? (
                              <div className="text-red-500">
                                {formik.errors.nrp}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex-col flex">
                            <Label htmlFor="name">Name</Label>
                            <span>{formik.values.name}</span>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter your name"
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="text-red-500">
                                {formik.errors.name}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="major">Program Study</Label>
                            <span>{formik.values.major}</span>
                            <RadioGroup className="grid grid-cols-2 gap-2 mt-4">
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="radio"
                                  name="major"
                                  id="r1"
                                  value="D3 PJJ AK Teknik Informatika"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  checked={
                                    formik.values.major ===
                                    "D3 PJJ AK Teknik Informatika"
                                  }
                                  className="h-6 w-6"
                                />
                                <Label htmlFor="r1">
                                  D3 PJJ AK Teknik Informatika
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="radio"
                                  name="major"
                                  id="r2"
                                  value="D3 PJJ Teknik Informatika"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  checked={
                                    formik.values.major ===
                                    "D3 PJJ Teknik Informatika"
                                  }
                                  className="h-6 w-6"
                                />
                                <Label htmlFor="r2">
                                  D3 PJJ Teknik Informatika
                                </Label>
                              </div>
                            </RadioGroup>
                            {formik.touched.major && formik.errors.major ? (
                              <div className="text-red-500">
                                {formik.errors.major}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <Label htmlFor="year">Class Year</Label>
                            <span className="ml-2">{formik.values.year}</span>
                            <Field name="year" as="select">
                              {({
                                field,
                              }: {
                                field: {
                                  value: string;
                                  onChange: (
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => void;
                                  onBlur: (
                                    e: React.FocusEvent<HTMLSelectElement>
                                  ) => void;
                                };
                              }) => (
                                <>
                                  <select
                                    {...field}
                                    value={formik.values.year.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="" disabled>
                                      Pilih Tahun Angkatan
                                    </option>
                                    {Array.from(
                                      { length: 11 },
                                      (_, i) => 2020 + i
                                    ).map((year) => (
                                      <option
                                        key={year}
                                        value={year.toString()}
                                      >
                                        {year}
                                      </option>
                                    ))}
                                  </select>
                                </>
                              )}
                            </Field>
                            {formik.touched.year && formik.errors.year ? (
                              <div className="text-red-500">
                                {formik.errors.year}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <Label htmlFor="semester">Semester</Label>
                            <span className="ml-2">
                              {formik.values.semester}
                            </span>
                            <Field name="semester" as="select">
                              {({
                                field,
                              }: {
                                field: {
                                  value: string;
                                  onChange: (
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => void;
                                  onBlur: (
                                    e: React.FocusEvent<HTMLSelectElement>
                                  ) => void;
                                };
                              }) => (
                                <>
                                  <select
                                    {...field}
                                    value={formik.values.semester.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="" disabled>
                                      Pilih Semester
                                    </option>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                    <option value="3">Semester 3</option>
                                    <option value="4">Semester 4</option>
                                    <option value="5">Semester 5</option>
                                    <option value="6">Semester 6</option>
                                    <option value="7">Semester 7</option>
                                    <option value="8">Semester 8</option>
                                    {/* Tambahkan pilihan semester lainnya sesuai kebutuhan */}
                                  </select>
                                </>
                              )}
                            </Field>
                            {formik.touched.semester &&
                            formik.errors.semester ? (
                              <div className="text-red-500">
                                {formik.errors.semester}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="ipk">IPK</Label>
                            <span>{formik.values.ipk}</span>
                            <Input
                              type="number"
                              id="ipk"
                              name="ipk"
                              placeholder="Masukkan IPK"
                              step="0.01" // Menetapkan langkah nilai pada 2 angka desimal
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.ipk}
                            />
                            {formik.touched.ipk && formik.errors.ipk ? (
                              <div className="text-red-500">
                                {formik.errors.ipk}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex-col flex">
                            <Label htmlFor="status">Status</Label>
                            <span>{formik.values.status}</span>
                            <Field name="status" as="select">
                              {({
                                field,
                              }: {
                                field: {
                                  value: string;
                                  onChange: (
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => void;
                                  onBlur: (
                                    e: React.FocusEvent<HTMLSelectElement>
                                  ) => void;
                                };
                              }) => (
                                <>
                                  <select
                                    {...field}
                                    value={formik.values.status}
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                      if (e.target.value === "Lulus") {
                                        formik.setFieldValue("graduated", ""); // Reset tahun jika status bukan "Lulus"
                                      }
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="" disabled>
                                      Status Mahasiswa
                                    </option>
                                    <option value="Lulus">Lulus</option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Cuti">Cuti</option>
                                  </select>{" "}
                                  {formik.values.status === "Lulus" && (
                                    <select
                                      name="graduated"
                                      value={formik.values.graduated.toString()}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                      <option value="" disabled>
                                        Tahun Lulus
                                      </option>
                                      {/* Tambahkan opsi tahun sesuai kebutuhan */}
                                      {Array.from(
                                        { length: 11 },
                                        (_, i) => 2020 + i
                                      ).map((graduated) => (
                                        <option
                                          key={graduated}
                                          value={graduated.toString()}
                                        >
                                          {graduated}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </>
                              )}
                            </Field>
                            {formik.touched.status && formik.errors.status ? (
                              <div className="text-red-500">
                                {formik.errors.status}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="receivedAwardId">
                              Scholarship of
                            </Label>
                            <Field name="receivedAwardId" as="select">
                              {({
                                field,
                                form,
                              }: {
                                field: {
                                  value: string;
                                  onChange: (
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => void;
                                  onBlur: (
                                    e: React.FocusEvent<HTMLSelectElement>
                                  ) => void;
                                };
                                form: {
                                  values: { status: string };
                                  setFieldValue: (
                                    field: string,
                                    value: any
                                  ) => void;
                                  errors: { receivedAwardId?: string };
                                  touched: { receivedAwardId?: boolean };
                                };
                              }) => (
                                <>
                                  <select
                                    {...field}
                                    value={formik.values.receivedAwardId}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      formik.setFieldValue(
                                        "receivedAwardId",
                                        e.target.value
                                      );
                                      const selectedScholarship =
                                        dataScholarship.find(
                                          (scholarship: Scholarship) =>
                                            scholarship.id === e.target.value
                                        );
                                      formik.setFieldValue(
                                        "receivedAwardName",
                                        selectedScholarship
                                          ? selectedScholarship.title
                                          : ""
                                      );
                                    }}
                                    onBlur={field.onBlur}
                                    className={`w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                      form.errors.receivedAwardId &&
                                      form.touched.receivedAwardId
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Pilih Beasiswa
                                    </option>
                                    {dataScholarship &&
                                      dataScholarship.map(
                                        (scholarship: Scholarship) => (
                                          <option
                                            key={scholarship.id}
                                            value={scholarship.id}
                                          >
                                            {scholarship.title}
                                          </option>
                                        )
                                      )}
                                  </select>
                                  {form.errors.receivedAwardId &&
                                    form.touched.receivedAwardId && (
                                      <div className="text-red-500 text-sm mt-1">
                                        {form.errors.receivedAwardId}
                                      </div>
                                    )}
                                </>
                              )}
                            </Field>
                          </div>
                          <div className="flex flex-col mb-4">
                            <Label htmlFor="image">Picture</Label>
                            <Input
                              id="image"
                              name="image"
                              type="file"
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={(e) => {
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (reader.readyState === 2) {
                                      const file = e.target.files![0];
                                      if (file) {
                                        formik.setFieldValue(
                                          "image",
                                          file
                                        );
                                        setPreview(reader.result as string);
                                      }
                                    }
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.image && formik.errors.image && (
                              <div className="text-red-500">
                                {formik.errors.image}
                              </div>
                            )}
                            {preview && ( // Tampilkan pratinjau gambar jika ada
                              <div className="mt-2 flex items-center flex-col gap-2">
                                <img
                                  src={preview}
                                  alt="Selected"
                                  className="max-w-full h-auto"
                                />

                                {/* Tombol untuk menghapus gambar */}
                                <Button
                                  type="button"
                                  className=" px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full"
                                  onClick={handleRemoveImage}
                                >
                                  Remove Image
                                </Button>
                              </div>
                            )}

                            <ErrorMessage
                              name="image"
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                          {/* Add other form fields similarly */}
                          <Button type="submit" className="w-full">
                            Submit
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </ScrollArea>
                </Formik>
                 <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={handleReset}>
                    Close

                  </Button>
                </DialogClose>
              </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-red-500 text-white outline outline-1"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => DeleteStudent(student.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
      );
    });
  };
   const csvData = generateExportData(data as Student[] || []);
     const csvHeaders = [
       { label: "No", key: "No" },
       { label: "NRP", key: "NRP" },
       { label: "Name", key: "Name" },
       { label: "Major", key: "Major" },
       { label: "Year", key: "Year" },
       { label: "Semester", key: "Semester" },
       { label: "IPK", key: "IPK" },
       { label: "Status", key: "Status" },
       { label: "Graduated", key: "Graduated" },
     ];
      const handleExportChange = (value: string) => {
        if (value === "csv") {
          // Trigger CSV download through CSVLink
          const csvLink = document.getElementById("csv-link");
          if (csvLink) {
            csvLink.click();
          }
        } else if (value === "xlsx") {
          downloadXLSX();
        } else if (value === "pdf") {
          downloadPDF();
        }
      };
  const [file, setFile] = useState<File | null>(null);

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
          title: "Error",
          className: "w-[400px]",
          description: "Invalid file format. Please upload a CSV or XLSX file.",
          variant: "destructive",
        });
      }
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
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

 const processParsedData = async (data: any) => {
   const formattedData = data.map((row: any, index: number) => {
     console.log(`Row ${index}:`, row); // Debug log

     // Parse numbers safely
     const parseNumber = (value: any) => {
       const parsed = Number(value);
       return isNaN(parsed) ? null : parsed;
     };

     return {
       name: row.name || row[1],
       nrp: parseNumber(row.nrp || row[0]),
       ipk: parseNumber(row.ipk || row[5]),
       major: row.major || row[2],
       year: parseNumber(row.year || row[3]),
       semester: parseNumber(row.semester || row[4]),
       status: row.status || row[6],
       graduated: row.graduated || row[7],
       receivedAwardId: row.receivedAwardId || row[8] || "",
       receivedAwardName: row.receivedAwardName || row[9] || "",
     };
   });

   console.log("Formatted Data:", formattedData); // Debug log

   for (const student of formattedData) {
     if (
       student.name &&
       student.nrp !== null &&
       student.ipk !== null &&
       student.major &&
       student.year !== null &&
       student.semester !== null &&
       student.status &&
       student.graduated
     ) {
       try {
         await uploadStudents.mutateAsync(student);
       } catch (error) {
         console.error("Failed to upload student:", student, error); // Debug log
       }
     } else {
       console.error("Invalid data:", student); // Log invalid data
     }
   }
 };

 const uploadStudents = useMutation({
   mutationFn: async (studentData: any) => {
     try {
       const formData = new FormData();
       for (const key in studentData) {
         formData.append(key, studentData[key]);
       }
       const studentsRes = await axiosInstance.post("/students", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
       return studentsRes;
     } catch (error) {
       toast({
         title: "Error",
         className: "w-[400px]",
         description: "Failed to post data",
         variant: "destructive",
       });
       throw error;
     }
   },
   onSuccess: () => {
     toast({
       title: "Success",
       className: "w-[400px]",
       description: "Data has been successfully posted",
     });
   },
 });
  return (
    <div className="px-4 mt-3">
      <h1 className="font-semibold text-2xl">Students Data</h1>
      <div className="flex justify-between ... md:flex-col">
        <div className="order-first">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full text-white font-semibold bg-primary sm:w-full px-2 py-2 mt-3"
                variant="ghost"
              >
                <CirclePlus className="mr-2 h-6 w-6" />
                Add Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Student</DialogTitle>
              </DialogHeader>
              <Formik
                initialValues={formik.initialValues}
                validationSchema={validationSchema}
                onSubmit={hendlerSubmit}
              >
                <ScrollArea className="h-[700px] w-full rounded-md border p-4 md:h-[500px] md:w-[365px]">
                  <Form
                    className="flex flex-wrap "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="w-full justify-normal gap-4 flex">
                      <div className="w-full">
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="nrp">NRP</Label>
                          <span>{formik.values.nrp}</span>
                          <Input
                            type="number"
                            id="nrp"
                            name="nrp"
                            placeholder="Enter your NRP"
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nrp}
                          />
                          {formik.touched.nrp && formik.errors.nrp ? (
                            <div className="text-red-500">
                              {formik.errors.nrp}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="name">Name</Label>
                          <span>{formik.values.name}</span>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="major">Program Study</Label>
                          <span>{formik.values.major}</span>
                          <RadioGroup className="grid grid-cols-2 gap-2 mt-4">
                            <div className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                name="major"
                                id="r1"
                                value="D3 PJJ AK Teknik Informatika"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={
                                  formik.values.major ===
                                  "D3 PJJ AK Teknik Informatika"
                                }
                                className="h-6 w-6"
                              />
                              <Label htmlFor="r1">
                                D3 PJJ AK Teknik Informatika
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                name="major"
                                id="r2"
                                value="D3 PJJ Teknik Informatika"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={
                                  formik.values.major ===
                                  "D3 PJJ Teknik Informatika"
                                }
                                className="h-6 w-6"
                              />
                              <Label htmlFor="r2">
                                D3 PJJ Teknik Informatika
                              </Label>
                            </div>
                          </RadioGroup>
                          {formik.touched.major && formik.errors.major ? (
                            <div className="text-red-500">
                              {formik.errors.major}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="year">Class Year</Label>
                          <span>{formik.values.year}</span>
                          <Field name="year" as="select">
                            {({
                              field,
                            }: {
                              field: {
                                value: string;
                                onChange: (
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => void;
                                onBlur: (
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => void;
                              };
                            }) => (
                              <>
                                <select
                                  {...field}
                                  value={formik.values.year.toString()}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="" disabled>
                                    Pilih Tahun Angkatan
                                  </option>
                                  {Array.from(
                                    { length: 11 },
                                    (_, i) => 2020 + i
                                  ).map((year) => (
                                    <option key={year} value={year.toString()}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </Field>
                          {formik.touched.year && formik.errors.year ? (
                            <div className="text-red-500">
                              {formik.errors.year}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <Label htmlFor="semester">Semester</Label>
                          <span className="ml-2">{formik.values.semester}</span>
                          <Field name="semester" as="select">
                            {({
                              field,
                            }: {
                              field: {
                                value: string;
                                onChange: (
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => void;
                                onBlur: (
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => void;
                              };
                            }) => (
                              <>
                                <select
                                  {...field}
                                  value={formik.values.semester.toString()}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="" disabled>
                                    Pilih Semester
                                  </option>
                                  <option value="1">Semester 1</option>
                                  <option value="2">Semester 2</option>
                                  <option value="3">Semester 3</option>
                                  <option value="4">Semester 4</option>
                                  <option value="5">Semester 5</option>
                                  <option value="6">Semester 6</option>
                                  <option value="7">Semester 7</option>
                                  <option value="8">Semester 8</option>
                                  {/* Tambahkan pilihan semester lainnya sesuai kebutuhan */}
                                </select>
                              </>
                            )}
                          </Field>
                          {formik.touched.semester && formik.errors.semester ? (
                            <div className="text-red-500">
                              {formik.errors.semester}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex-col flex">
                          <Label htmlFor="ipk">IPK</Label>
                          <span>{formik.values.ipk}</span>
                          <Input
                            type="number"
                            id="ipk"
                            name="ipk"
                            placeholder="Masukkan IPK"
                            step="0.01" // Menetapkan langkah nilai pada 2 angka desimal
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ipk}
                          />
                          {formik.touched.ipk && formik.errors.ipk ? (
                            <div className="text-red-500">
                              {formik.errors.ipk}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="status">Status</Label>
                          <span>{formik.values.status}</span>
                          <Field name="status" as="select">
                            {({
                              field,
                            }: {
                              field: {
                                value: string;
                                onChange: (
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => void;
                                onBlur: (
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => void;
                              };
                            }) => (
                              <>
                                <select
                                  {...field}
                                  value={formik.values.status}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    if (e.target.value === "Lulus") {
                                      formik.setFieldValue("graduated", ""); // Reset tahun jika status bukan "Lulus"
                                    }
                                  }}
                                  onBlur={formik.handleBlur}
                                  className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="" disabled>
                                    Status Mahasiswa
                                  </option>
                                  <option value="Lulus">Lulus</option>
                                  <option value="Aktif">Aktif</option>
                                  <option value="Cuti">Cuti</option>
                                </select>{" "}
                                {formik.values.status === "Lulus" && (
                                  <select
                                    name="graduated"
                                    value={formik.values.graduated.toString()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="" disabled>
                                      Tahun Lulus
                                    </option>
                                    {/* Tambahkan opsi tahun sesuai kebutuhan */}
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                  </select>
                                )}
                              </>
                            )}
                          </Field>
                          {formik.touched.status && formik.errors.status ? (
                            <div className="text-red-500">
                              {formik.errors.status}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="receivedAwardId">
                            Scholarship of
                          </Label>
                          <Field name="receivedAwardId" as="select">
                            {({
                              field,
                              form,
                            }: {
                              field: {
                                value: string;
                                onChange: (
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => void;
                                onBlur: (
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => void;
                              };
                              form: {
                                values: { status: string };
                                setFieldValue: (
                                  field: string,
                                  value: any
                                ) => void;
                                errors: { receivedAwardId?: string };
                                touched: { receivedAwardId?: boolean };
                              };
                            }) => (
                              <>
                                <select
                                  {...field}
                                  value={formik.values.receivedAwardId}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    formik.setFieldValue(
                                      "receivedAwardId",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={field.onBlur}
                                  className={`w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    form.errors.receivedAwardId &&
                                    form.touched.receivedAwardId
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                >
                                  <option value="" disabled>
                                    Pilih Beasiswa
                                  </option>

                                  {/* Mapping through scholarships data to render options */}
                                  {dataScholarship &&
                                    dataScholarship.map(
                                      (scholarship: Scholarship) => (
                                        <option
                                          key={scholarship.id}
                                          value={scholarship.id}
                                        >
                                          {scholarship.title}
                                        </option>
                                      )
                                    )}
                                </select>
                                {form.errors.receivedAwardId &&
                                  form.touched.receivedAwardId && (
                                    <div className="text-red-500 text-sm mt-1">
                                      {form.errors.receivedAwardId}
                                    </div>
                                  )}
                              </>
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-col mb-4">
                          <Label htmlFor="image">Picture</Label>
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (reader.readyState === 2) {
                                    const file = e.target.files![0];
                                    if (file) {
                                      formik.setFieldValue("image", file);
                                      setPreview(reader.result as string);
                                    }
                                  }
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.image && formik.errors.image && (
                            <div className="text-red-500">
                              {formik.errors.image}
                            </div>
                          )}
                          {preview && ( // Tampilkan pratinjau gambar jika ada
                            <img
                              src={preview}
                              alt="Selected"
                              className="mt-2 max-w-full h-auto"
                            />
                          )}
                          <Button
                            type="button"
                            className=" mt-2px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full"
                            onClick={handleRemoveImage}
                          >
                            Remove Image
                          </Button>
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        {/* Add other form fields similarly */}
                        <Button type="submit" className="w-full">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </ScrollArea>
              </Formik>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search data..."
            className="md:w-full  mb-2 w-[300px]"
          />
          <div className="flex gap-2">
       
         <ImportData/>
          </div>
          <Select onValueChange={handleExportChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">Export CSV</SelectItem>
              <SelectItem value="xlsx">Export XLSX</SelectItem>
              <SelectItem value="pdf">Export PDF</SelectItem>
            </SelectContent>
          </Select>
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename="students.csv"
            id="csv-link"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="rounded-md shadow py-2 mb-4 px-4">
        <Table className="shadow-md border-2">
          <TableCaption className="">Total Data : {totalStudents}</TableCaption>
          <TableHeader className=" rounded-md bg-primary">
            <TableRow>
              <TableHead className="w-[100px] text-white" hidden>
                Id
              </TableHead>
              <TableHead className="text-white font-semibold">No</TableHead>
              <TableHead className="text-white font-semibold">NRP</TableHead>
              <TableHead className="text-white font-semibold">Name</TableHead>
              <TableHead className="text-white font-semibold">
                Study Program
              </TableHead>
              <TableHead className="text-white font-semibold">
                Class Year
              </TableHead>
              <TableHead className="text-white font-semibold">
                Semester
              </TableHead>
              <TableHead className="text-white font-semibold">IPK</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">
                GraduatedYear
              </TableHead>
              <TableHead className="text-white font-semibold">
                Picture
              </TableHead>
              <TableHead className="text-white font-semibold">
                Scholarship Of
              </TableHead>
              <TableHead className="text-white font-semibold justify-center content-center ">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderStudent(page, pageSize, data, searchTerm)}
            {isLoading && (
              <TableRow>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-warp">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
              />
            </PaginationItem>

            {/* Render pagination items */}
            {Array.from({ length: totalPages }, (_, index) => {
              // Render first two pages
              if (index < 2) {
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

              // Render last two pages
              if (index >= totalPages - 2) {
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

              // Render ellipsis for other pages
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
      </div>
      {/* Display data count */}
    </div>
  );
}
