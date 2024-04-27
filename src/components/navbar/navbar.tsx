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
  NewspaperIcon,
  School,
  School2Icon,
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
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import dynamic from "next/dynamic";
import { NavbarItems } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Navbar() {
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
            {/* <Link
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
                    className="rounded-box hexport default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });over:text-primary "
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
                  </Link>export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
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
          </Link> */}

            <NavigationMenu className="bg-primary">
              <NavigationMenuList>
                <NavigationMenuItem className="bg-primary">
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary text-white">
                    <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider">
                      Beranda
                    </NavbarButton>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <Link href="/">
                          <NavigationMenuLink asChild>
                            <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                              <div className="mb-2 mt-4 text-lg font-medium">
                                PJJ D3 Teknik Informatika
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Politeknik Elektronika Negeri Surabaya
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <ListItem
                        href="https://pjj.pens.ac.id/"
                        target="_blank"
                        title="PJJ PENS"
                      >
                        Official Website Pendidikan Jarak Jauh (PJJ) Politeknik
                        Elektronika Negeri Surabaya
                      </ListItem>
                      <ListItem
                        href="https://www.pens.ac.id/"
                        target="_blank"
                        title="PENS"
                      >
                        Official Website Politeknik Elektronika Negeri Surabaya
                      </ListItem>
                      <ListItem
                        href="https://online.mis.pens.ac.id/"
                        title="MIS PENS"
                      >
                        Online MIS Politeknik Elektronika Negeri Surabaya
                      </ListItem>
                      <ListItem
                        href="https://ethol.pens.ac.id/"
                        target="_blank"
                        title="ETOL"
                      >
                        Enterprise Technology Hybrid Online Learning is a
                        platform that provides an excellent online learning
                        experience for students, with many features and easy to
                        use and has a good user experience. All learning is
                        neatly arranged, so that students will feel comfortable
                        to study online.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-primary text-white">
                    <NavbarButton className="hover:text-secondarypens -ml-8 uppercase font-medium tracking-wider">
                      Informasi
                    </NavbarButton>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <Link href="/academics">
                        <ListItem href="" title="Akademik">
                          Informasi Seputar Akademik PJJ D3 Teknik Informatika
                        </ListItem>
                      </Link>
                      <Link href="/scholarships">
                        <ListItem href="" title="Beasiswa">
                          Informasi Seputar Beasiswa PJJ D3 Teknik Informatika
                        </ListItem>
                      </Link>
                      <Link href="/activities">
                        <ListItem href="" title="Kegiatan">
                          Informasi Seputar Kegiatan PJJ D3 Teknik Informatika
                        </ListItem>
                      </Link>
                      <Link href="/students">
                        <ListItem href="" title="Mahasiswa">
                          Informasi Seputar Mahasiswa PJJ D3 Teknik Informatika
                        </ListItem>
                      </Link>
                      <Link href="/alumies">
                        <ListItem href="" title="Alumi">
                          Informasi Alumi Akademik PJJ Teknik Informatika
                        </ListItem>
                      </Link>
                      <Link href="/academics">
                        <ListItem href="" title="Katalog Proyek Akhir">
                          Informasi Seputar Katalog Hasil Proyek Akhir PJJ
                          Teknik Informatika
                        </ListItem>
                      </Link>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {/* <NavigationMenuTrigger className="bg-transparent hover:bg-primary text-white"> */}
                  <NavbarButton className="hover:text-secondarypens text-white -ml-4 uppercase font-medium tracking-wider">
                    Berita
                  </NavbarButton>
                  {/* </NavigationMenuTrigger> */}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {/* <NavigationMenuTrigger className="bg-transparent hover:bg-primary text-white"> */}
                  <Link href="/about">
                    <NavbarButton className="hover:text-secondarypens text-white -ml-4 uppercase font-medium tracking-wider">
                      Tetang PJJ
                    </NavbarButton>
                    {/* </NavigationMenuTrigger> */}
                  </Link>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <Link href="https://t.me/PJJPENSOFFICIAL" target="_blank">
                    <NavbarButton className="hover:text-secondarypens text-white -ml-4 uppercase font-medium tracking-wider">
                      Kontak
                    </NavbarButton>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="http://virtualtour.pens.ac.id/" target="_blank">
                    <NavbarButton className="hover:text-secondarypens text-white -ml-4 uppercase font-medium tracking-wider">
                      Virtual Tour
                    </NavbarButton>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="absolute inset-y-0 right-8 mt-5 mr-5">
            <ModeToggle />
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="">
            <div className="flex flex-col mx-auto" tabIndex={0}>
              <Link href="/">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Beranda
                </NavbarButton>
              </Link>
                            <Link href="/academics">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Akademik
                </NavbarButton>
              </Link>
                            <Link href="/scholarships">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Beasiswa
                </NavbarButton>
              </Link>
                            <Link href="/activities">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Kegiatan
                </NavbarButton>
              </Link>
                            <Link href="/students">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Mahasiswa
                </NavbarButton>
              </Link>
                            <Link href="/alumies">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Alumi
                </NavbarButton>
              </Link>
                            <Link href="/katalog">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Katalog PA
                </NavbarButton>
              </Link>
                            <Link href="/about">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Tentang PJJ
                </NavbarButton>
              </Link>
                            <Link href="https://t.me/PJJPENSOFFICIAL" target="_blank">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Kontak
                </NavbarButton>
              </Link>
                            <Link href="http://virtualtour.pens.ac.id/" target="_blank">
                <NavbarButton className="hover:text-secondarypens uppercase font-medium tracking-wider text-white">
                  Virtual Tour
                </NavbarButton>
              </Link>
            </div>
          </div>
        )}
        <div className="w-full bg-secondarypens h-2"></div>
      </nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
