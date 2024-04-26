/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  ActivitySquare,
  Banknote,
  BookA,
  GraduationCap,
  Home,
  Info,
  LucideGraduationCap,
  Newspaper,
  School,
  SquareLibrary,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarButton } from "./navbar-button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <nav className="fixed top-0 left-0 z-10 justify-center w-full mx-auto shadow bg-primary container">
      <div className="relative flex items-center justify-start py-4 pl-10 md:pl-0">
        <div className="px-4">
          <img
            className="w-auto h-10"
            src="https://www.pens.ac.id/wp-content/uploads/2018/04/Logo_PENS_putih.png"
            alt="Your Company"
          />
        </div>
        {/* Hamburger menu */}
        <div className="absolute inset-y-0 right-0 mt-5 mr-5 md:block hidden">
          <button
            onClick={toggleMenu}
            className="md:text-white hover:bg-primary hover:text-white focus:outline-none bg-primary"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}

        <nav className="justify-between space-x-4 flex rounded-t-non cursor-pointer lg:hidden">
          <Link
            href="/"
            className="px-3 py-2 text-base font-medium text-white rounded-md "
          >
            <NavbarButton icon={Home}>Beranda</NavbarButton>
          </Link>
          <div className="relative mt-2 hover:text-yellow-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="px-3 py-2 pb-3 text-base font-medium text-white rounded-md">
                  <NavbarButton icon={Info}>Informasi</NavbarButton>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-box hover:bg-primary ">
                  <Link
                    href="/academics"
                    className="rounded-box hover:text-primary "
                  >
                    <NavbarButton icon={BookA}>Akademik</NavbarButton>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-box hover:bg-primary">
                  <Link href="/scholarships" className="rounded-box hover:text-primary ">
                    <NavbarButton icon={Banknote}>Beasiswa</NavbarButton>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-box hover:bg-primary">
                  <Link href="/activities" className="rounded-box hover:text-primary ">
                    <NavbarButton icon={ActivitySquare}>Kegiatan</NavbarButton>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-box hover:bg-primary">
                  <Link
                    href="/students"
                    className="rounded-box hover:text-primary "
                  >
                    <NavbarButton icon={GraduationCap}>Mahasiswa</NavbarButton>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-box hover:bg-primary">
                  <Link href="/alumies" className="rounded-box hover:text-primary ">
                    <NavbarButton icon={LucideGraduationCap}>
                      Alumi
                    </NavbarButton>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-box hover:bg-primary">
                  <Link href="/katalog" className="rounded-box hover:text-primary ">
                    <NavbarButton icon={SquareLibrary}>Katalog PA</NavbarButton>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link
            href="/news"
            className="px-3 py-2 text-base font-medium text-white rounded-md "
          >
            <NavbarButton icon={Newspaper}>Berita</NavbarButton>
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 text-base font-medium text-white rounded-md "
          >
            <NavbarButton icon={School}>Tentang</NavbarButton>
          </Link>
        </nav>
        <div className="absolute inset-y-0 right-8 mt-5 mr-5">
          <ModeToggle />
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="">
          <div className="flex flex-col space-y-4 " tabIndex={0}>
            <Link
              href="/"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={Home}>Beranda</NavbarButton>
            </Link>
            <Link
              href="/academics"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={BookA}>Akademik</NavbarButton>
            </Link>
            <Link
              href="/scholarships"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary"
            >
              <NavbarButton icon={Banknote}>Beasiswa</NavbarButton>
            </Link>
            <Link
              href="/activities"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={ActivitySquare}>Kegiatan</NavbarButton>
            </Link>
            <Link
              href="/students"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={GraduationCap}>Mahasiswa</NavbarButton>
            </Link>
            <Link
              href="/alumies"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={LucideGraduationCap}>Alumni</NavbarButton>
            </Link>
            <Link
              href="/Katalog"
              className="block px-3 py-2 text-base text-white focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={SquareLibrary}>Katalog PA</NavbarButton>
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={Newspaper}>Berita</NavbarButton>
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-white text-md focus:bg-blue-800 focus:text-secondary "
            >
              <NavbarButton icon={School}>Tentang</NavbarButton>
            </Link>
          </div>
        </div>
      )}
      <div className="w-full bg-secondarypens h-2"></div>
    </nav>
      </>
  );
}
