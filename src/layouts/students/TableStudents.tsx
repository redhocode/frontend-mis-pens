"use client";
import { useFetchStudent } from "@/features";
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
} from "@/components/ui/dialog";
import { CirclePlus, LoaderIcon } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useQuery, useMutation, Mutation } from "@tanstack/react-query";
import type { Student } from "@/types";
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

export default function TableStudent() {
  const pageSize = 3; // Tentukan nilai pageSize
  const [page, setPage] = useState(1); // Tentukan nilai awal page
  const {
    data,
    isLoading,
    refetch: refetchStudents,
  } = useFetchStudent(page, pageSize);
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
      .min(8, "NRP must be 8 digits"),
    ipk: Yup.number()
      .required("IPK is required")
      .lessThan(5, "IPK must be less than 4"),
    major: Yup.string().required("Major is required"),
    year: Yup.number().required("Year is required"),
    semester: Yup.number().required("Semester is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed()
      .test("fileSize", "File size too large", (value: any) => {
        const file = value as File | undefined;
        return !file || file.size <= MAX_FILE_SIZE;
      })
      .test("fileType", "Invalid file type", (value: any) => {
        const file = value as File | undefined;
        return (
          !file ||
          (typeof file.type === "string" && file.type.includes("image"))
        );
      }),
  });
  const { mutate: CreateOrUpdateStudent } = useMutation({
    mutationFn: async () => {
      try {
        const { id, name, nrp, ipk, major, year, semester, status, image } =
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
  // Submit handler function

  const [preview, setPreview] = useState<string | null>(null);
  const hendlerSubmit = async (values: any) => {
    try {
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
    },
    validationSchema: validationSchema,
    onSubmit: hendlerSubmit,
  });

  // Function to render student data and search

  const renderStudent = (
    page: number,
    pageSize: number,
    data: Student[],
    searchTerm: string
  ) => {
    // Menghitung indeks awal dan akhir data yang harus dirender berdasarkan halaman saat ini
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
          <TableCell>
            {!student.image ? ( // Periksa jika tidak ada gambar
              <Skeleton className="h-[50px] w-full rounded-xl" />
            ) : (
              <img
                src={
                  process.env.NODE_ENV === "production"
                    ? process.env.NEXT_PUBLIC_URL_IMAGE_PROD + student.image
                    : process.env.NEXT_PUBLIC_URL_IMAGE_DEV + student.image
                }
                alt="Image"
                className="object-cover"
              />
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
                        image: student.image,
                      });
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
                            <Label htmlFor="major">Jurusan</Label>
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
                            <Label htmlFor="year">Tahun Angkatan</Label>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="" disabled>
                                      Status Mahasiswa
                                    </option>
                                    <option value="Lulus">Lulus</option>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Cuti">Cuti</option>

                                    {/* Tambahkan pilihan semester lainnya sesuai kebutuhan */}
                                  </select>
                                </>
                              )}
                            </Field>
                            {formik.touched.status && formik.errors.status ? (
                              <div className="text-red-500">
                                {formik.errors.status}
                              </div>
                            ) : null}
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
                          <Label htmlFor="major">Jurusan</Label>
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
                          <Label htmlFor="year">Tahun Angkatan</Label>
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
                                      formik.setFieldValue("tahunLulus", ""); // Reset tahun jika status bukan "Lulus"
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
                                </select>
                                {" "}
                                {formik.values.status === "Lulus" && (
                                  <select
                                    name="tahunLulus"
                                    // value={formik.values.tahunLulus}
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
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari siswa..."
            className="md:w-full mt-2 mb-2 w-[300px]"
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
              <TableHead className="text-white font-semibold">Nama</TableHead>
              <TableHead className="text-white font-semibold">
                Jurusan
              </TableHead>
              <TableHead className="text-white font-semibold">
                Angkatan
              </TableHead>
              <TableHead className="text-white font-semibold">
                Semester
              </TableHead>
              <TableHead className="text-white font-semibold">IPK</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">
                Picture
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
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <div className="flex items-center justify-center mt-4">
                    <p className="font-semibold mr-1">Loading</p>
                    <LoaderIcon className="animate-spin h-10 w-10" />
                  </div>
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
