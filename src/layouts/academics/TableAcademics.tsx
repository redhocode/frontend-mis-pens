"use client";

import { useState } from "react";
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
  DialogClose
} from "@/components/ui/dialog";
import { CirclePlus, LoaderIcon, Pencil } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useQuery, useMutation, Mutation } from "@tanstack/react-query";
import type { Academic, Student } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ErrorMessage,
  useFormik,
  Formik,
  Field,
  Form,
  validateYupSchema,
} from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { useToast } from "@/components/ui/use-toast";

import React from "react";
import { Editor } from "primereact/editor";
import QuillResizeImage from "quill-resize-image";
import Quill from "quill";
import DetailAcademic from "@/components/button/ButtonDashDetailAcademic";
import { Skeleton } from "@/components/ui/skeleton";
export default function TableAcademic() {
  const pageSize = 3; // Tentukan nilai pageSize
  const [page, setPage] = useState(1); // Tentukan nilai awal page
  const {
    data,
    isLoading,
    refetch: refetchAcademic,
  } = useFetchAcademic(page, pageSize);
  // Mendapatkan total halaman dari data
  // Hitung total halaman berdasarkan jumlah data dan ukuran halaman
  const totalData = data?.length || 0; // Menggunakan data langsung, karena `useFetchStudent` sudah mengembalikan data, bukan respon lengkap
  const totalPages = Math.ceil(totalData / pageSize);

  //seach
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata kunci pencarian

  // Fungsi penanganan perubahan input untuk memperbarui state kata kunci pencarian

  //textarea function
  const [text, setText] = useState<string>("");
  Quill.register("modules/resizeImage", QuillResizeImage);

  // Fungsi untuk memotong teks HTML tanpa merusak tag
  const truncateHTML = (html: string, maxLength: number) => {
    if (html.length <= maxLength) return html;

    let length = 0;
    let result = "";
    const regex = /(<([^>]+)>)/gi;
    let tags: any[] = [];
    let lastIndex = 0;

    html.replace(regex, (match, p1, p2, offset) => {
      if (length >= maxLength) return "";

      const text = html.substring(lastIndex, offset);
      if (length + text.length > maxLength) {
        result += text.substring(0, maxLength - length);
        length = maxLength;
      } else {
        result += text;
        length += text.length;
      }
      result += match;
      tags.push(p2.split(" ")[0]);
      lastIndex = offset + match.length;

      return "";
    });

    if (length < maxLength) {
      result += html.substring(lastIndex, maxLength - length + lastIndex);
    }

    // Close any unclosed tags
    while (tags.length) {
      const tag = tags.pop();
      result += `</${tag}>`;
    }

    return result + (html.length > maxLength ? "..." : "");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const { toast } = useToast();
  const MAX_FILE_SIZE = 1024 * 1024 * 5;
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    link: Yup.string().optional(),
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
  const { mutate: CreateOrUpdateAcademic } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const { id, title, description, date, link, image } = formik.values;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("link", link);
        if (image !== null) {
          formData.append("image", image);
        }

        let academicsRes;

        if (id) {
          academicsRes = await axiosInstance.patch(
            `/academics/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          academicsRes = await axiosInstance.post("/academics", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        return academicsRes;
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
          className: "w-[400px] md:w-[300px]",
        });
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        className: "w-[400px] md:w-[300px]",
        description: "Data has been successfully posted",
      });
      refetchAcademic();
    },
  });
  //Delete handler function
  const { mutate: DeleteStudent } = useMutation({
    mutationFn: async (id: string) => {
      const academicRes = await axiosInstance.delete(`/academics/${id}`);
      return academicRes;
    },
    onSuccess: () => {
      refetchAcademic();
      toast({
        title: "Success",
        className: "w-[400px] md:w-[100px]",
        description: "Data has been successfully deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        className: "w-[400px] md:w-[100px]",
        description: "Failed to delete data",
        variant: "destructive",
      });
    },
  });
  //hendler reset
  const handleReset = () => {
    formik.resetForm();
  }
  const [preview, setPreview] = useState<string | null>(null);
  //remove image
  const handleRemoveImage = () => {
    formik.setFieldValue("image", ""); // Set nilai image ke string kosong
    setPreview(null); // Hapus pratinjau gambar
  };
  // Submit handler function
  const hendlerSubmit = async (values: any) => {
    try {
      await CreateOrUpdateAcademic(values);
      refetchAcademic();
      formik.resetForm();
      toast({
        title: "Success",
        description: "Data has been successfully posted",
        className: "w-[400px] md:w-[100px]",
      });
      formik.resetForm(); // Reset the form after successful mutation
    } catch (error) {
      toast({
        title: "Error",
        className: "w-[400px] md:w-[100px]",
        description: "Failed to post data",
        variant: "destructive",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      link: "",
      image: "",
      id: "",
    },
    validationSchema: validationSchema,
    onSubmit: hendlerSubmit,
  });
  const renderAcademic = (
    page: number,
    pageSize: number,
    data: Academic[],
    searchTerm: string
  ) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data?.length);
    // Filter berdasarkan searchTerm
    if (searchTerm) {
      data = data?.filter((academic: Academic) => {
        const searchTermLower = searchTerm.toLowerCase();
        const fieldsToSearch = [
          academic.title,
          academic.description,
          academic.date,
          academic.link,
        ];
        return fieldsToSearch.some((field) =>
          field.toLowerCase().includes(searchTermLower)
        );
      });
    }
    const academicToRender = data?.slice(startIndex, endIndex);
    let orderNumber = startIndex + 1;
    return academicToRender?.map((academic: Academic) => {
      const currentOrderNumber = orderNumber++;

      return (
        <TableRow key={academic.id}>
          <TableCell className="w-[100px]" hidden>
            {academic.id}
          </TableCell>
          <TableCell className="w-[50px]">{currentOrderNumber}</TableCell>
          <TableCell style={{ maxWidth: "200px" }}>
            {academic.title.length > 50
              ? academic.title.substring(0, 50) + "..."
              : academic.title}
          </TableCell>

          <TableCell>{academic.date}</TableCell>

          <TableCell>
            <div
              dangerouslySetInnerHTML={{
                __html: truncateHTML(academic.description, 0),
              }}
            />
          </TableCell>
          <TableCell>
            {academic.image && (
              <img
                src={academic.image}
                alt="Activity Image"
                className="w-[50px] h-[50px] object-cover"
              />
            )}
          </TableCell>
          <TableCell>
            {academic.link.length > 50
              ? academic.link.substring(0, 50) + "..."
              : academic.link}
          </TableCell>
          <TableCell className="flex gap-2">
            <DetailAcademic id={academic.id} />
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
                        id: academic.id,
                        title: academic.title,
                        description: academic.description,
                        date: academic.date,
                        link: academic.link,
                      });
                      setPreview(academic.image);
                    }}
                  >
                    <Edit name="Edit" className="mr-2" />{" "}
                    {/* Tambahkan class mr-2 untuk memberikan margin kanan */}
                    Edit
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-[1040px]">
                <DialogHeader>
                  <DialogTitle>Edit Data</DialogTitle>
                </DialogHeader>
                <Formik
                  initialValues={formik.initialValues}
                  validationSchema={validationSchema}
                  onSubmit={hendlerSubmit}
                >
                  <ScrollArea className="h-[700px] w-[1000px] rounded-md border p-4 md:h-[500px] md:w-[365px]">
                    <Form
                      className="flex flex-wrap "
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="w-full justify-normal gap-4 flex">
                        <div className="w-full">
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="title">Title</Label>
                            <span>{formik.values.title}</span>
                            <Input
                              type="text"
                              id="title"
                              name="title"
                              placeholder="Enter your title"
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.title}
                            />
                            {formik.touched.title && formik.errors.title ? (
                              <div className="text-red-500">
                                {formik.errors.title}
                              </div>
                            ) : null}
                          </div>
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="date">Date</Label>
                            <span>{formik.values.date}</span>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={formik.values.date}
                              onChange={(e) =>
                                formik.setFieldValue("date", e.target.value)
                              }
                            />
                            {formik.touched.date && formik.errors.date && (
                              <div className="text-red-500">
                                {formik.errors.date}
                              </div>
                            )}
                          </div>
                          <div className="mb-4 flex flex-col">
                            <Label htmlFor="description">Description</Label>
                            <Editor
                              name="description"
                              id="description"
                              value={formik.values.description}
                              style={{ height: "1000px" }}
                              onTextChange={(e: any) => {
                                setText(e.htmlValue);
                                formik.setFieldValue(
                                  "description",
                                  e.htmlValue
                                );
                              }}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              headerTemplate={
                                <>
                                  <span className="ql-formats">
                                    <select className="ql-font"></select>
                                    <select className="ql-size"></select>
                                  </span>
                                  <span className="ql-formats">
                                    <button className="ql-bold"></button>
                                    <button className="ql-italic"></button>
                                    <button className="ql-underline"></button>
                                    <button className="ql-strike"></button>
                                  </span>
                                  <span className="ql-formats">
                                    <select className="ql-color"></select>
                                    <select className="ql-background"></select>
                                  </span>
                                  <span className="ql-formats">
                                    <button
                                      className="ql-script"
                                      value="sub"
                                    ></button>
                                    <button
                                      className="ql-script"
                                      value="super"
                                    ></button>
                                  </span>
                                  <span className="ql-formats">
                                    <button
                                      className="ql-header"
                                      value="1"
                                    ></button>
                                    <button
                                      className="ql-header"
                                      value="2"
                                    ></button>
                                    <button className="ql-blockquote"></button>
                                    <button className="ql-code-block"></button>
                                  </span>
                                  <span className="ql-formats">
                                    <button
                                      className="ql-list"
                                      value="ordered"
                                    ></button>
                                    <button
                                      className="ql-list"
                                      value="bullet"
                                    ></button>
                                    <button
                                      className="ql-indent"
                                      value="-1"
                                    ></button>
                                    <button
                                      className="ql-indent"
                                      value="+1"
                                    ></button>
                                  </span>
                                  <span className="ql-formats">
                                    <button
                                      className="ql-direction"
                                      value="rtl"
                                    ></button>
                                    <select className="ql-align"></select>
                                  </span>
                                  <span className="ql-formats">
                                    <button className="ql-link"></button>
                                    <button className="ql-image"></button>
                                    <button className="ql-video"></button>
                                    <button className="ql-formula"></button>
                                  </span>
                                  <span className="ql-formats">
                                    <button className="ql-clean"></button>
                                  </span>
                                </>
                              }
                              modules={{
                                resizeImage: {
                                  displaySize: true,
                                },
                              }}
                            />
                            {formik.touched.description &&
                            formik.errors.description ? (
                              <div className="text-red-500">
                                {formik.errors.description}
                              </div>
                            ) : null}
                          </div>

                          <div className="flex flex-col mb-4">
                            <Label htmlFor="link">Link</Label>
                            <Input
                              type="text"
                              id="link"
                              name="link"
                              placeholder="Enter your link"
                              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.link}
                            />

                            {formik.touched.link && formik.errors.link ? (
                              <div className="text-red-500">
                                {formik.errors.link}
                              </div>
                            ) : null}
                          </div>
                          {/* Add other form fields similarly */}
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
                      variant="secondary"
                      type="button"
                      onClick={handleReset}
                    >
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
                  <AlertDialogAction onClick={() => DeleteStudent(academic.id)}>
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
      <h1 className="font-semibold text-2xl">Academic Data</h1>
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
            <DialogContent className="sm:max-w-[425px] min-w-[1040px]">
              <DialogHeader>
                <DialogTitle>Add Data</DialogTitle>
              </DialogHeader>
              <Formik
                initialValues={formik.initialValues}
                validationSchema={validationSchema}
                onSubmit={hendlerSubmit}
              >
                <ScrollArea className="h-[700px] w-[1000px] rounded-md border p-4 md:h-[500px] md:w-[365px]">
                  <Form
                    className="flex flex-wrap "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="w-full justify-normal gap-4 flex">
                      <div className="w-full">
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="title">Title</Label>
                          <span>{formik.values.title}</span>
                          <Input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your title"
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                          />
                          {formik.touched.title && formik.errors.title ? (
                            <div className="text-red-500">
                              {formik.errors.title}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="date">Date</Label>
                          <span>{formik.values.date}</span>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formik.values.date}
                            onChange={(e) =>
                              formik.setFieldValue("date", e.target.value)
                            }
                          />
                          {formik.touched.date && formik.errors.date && (
                            <div className="text-red-500">
                              {formik.errors.date}
                            </div>
                          )}
                        </div>
                        <div className="mb-4 flex flex-col">
                          <Label htmlFor="description">Description</Label>
                          <Editor
                            name="description"
                            id="description"
                            value={formik.values.description}
                            style={{ height: "1200px" }}
                            onTextChange={(e: any) => {
                              setText(e.htmlValue);
                              formik.setFieldValue("description", e.htmlValue);
                            }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            headerTemplate={
                              <>
                                <span className="ql-formats">
                                  <select className="ql-font"></select>
                                  <select className="ql-size"></select>
                                </span>
                                <span className="ql-formats">
                                  <button className="ql-bold"></button>
                                  <button className="ql-italic"></button>
                                  <button className="ql-underline"></button>
                                  <button className="ql-strike"></button>
                                </span>
                                <span className="ql-formats">
                                  <select className="ql-color"></select>
                                  <select className="ql-background"></select>
                                </span>
                                <span className="ql-formats">
                                  <button
                                    className="ql-script"
                                    value="sub"
                                  ></button>
                                  <button
                                    className="ql-script"
                                    value="super"
                                  ></button>
                                </span>
                                <span className="ql-formats">
                                  <button
                                    className="ql-header"
                                    value="1"
                                  ></button>
                                  <button
                                    className="ql-header"
                                    value="2"
                                  ></button>
                                  <button className="ql-blockquote"></button>
                                  <button className="ql-code-block"></button>
                                </span>
                                <span className="ql-formats">
                                  <button
                                    className="ql-list"
                                    value="ordered"
                                  ></button>
                                  <button
                                    className="ql-list"
                                    value="bullet"
                                  ></button>
                                  <button
                                    className="ql-indent"
                                    value="-1"
                                  ></button>
                                  <button
                                    className="ql-indent"
                                    value="+1"
                                  ></button>
                                </span>
                                <span className="ql-formats">
                                  <button
                                    className="ql-direction"
                                    value="rtl"
                                  ></button>
                                  <select className="ql-align"></select>
                                </span>
                                <span className="ql-formats z-10">
                                  <button className="ql-link"></button>
                                  <button className="ql-image"></button>
                                  <button className="ql-video"></button>
                                  <button className="ql-formula"></button>
                                </span>
                                <span className="ql-formats">
                                  <button className="ql-clean"></button>
                                </span>
                              </>
                            }
                            modules={{
                              resizeImage: {
                                displaySize: true,
                              },
                            }}
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className="text-red-500">
                              {formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-col mb-4">
                          <Label htmlFor="link">Link</Label>
                          <Input
                            type="text"
                            id="link"
                            name="link"
                            placeholder="Enter your link"
                            className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.link}
                          />
                          {formik.touched.link && formik.errors.link ? (
                            <div className="text-red-500">
                              {formik.errors.link}
                            </div>
                          ) : null}
                        </div>
                        {/* Add other form fields similarly */}
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
                    variant="secondary"
                    type="button"
                    onClick={handleReset}
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="md:w-full mt-2 mb-2 w-[300px]"
          />
        </div>
      </div>
      <div className="rounded-md shadow py-2 mb-4 px-4">
        <Table className="shadow-md border-2">
          <TableCaption className="">Total Data : {totalData}</TableCaption>
          <TableHeader className="rounded-md bg-primary">
            <TableRow>
              <TableHead className="w-[100px] text-white" hidden>
                Id
              </TableHead>
              <TableHead className="text-white font-semibold">No</TableHead>
              <TableHead className="text-white font-semibold">Title</TableHead>
              <TableHead className="text-white font-semibold">Date</TableHead>
              <TableHead className="text-white font-semibold">
                Description
              </TableHead>
              <TableHead className="text-white font-semibold">Image</TableHead>
              <TableHead className="text-white font-semibold">Link</TableHead>
              <TableHead className="text-white font-semibold justify-center content-center ">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderAcademic(page, pageSize, data, searchTerm)}
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
                <TableCell></TableCell>
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
