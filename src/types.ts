import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface SidebarItems{
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon;
    }>;
    extras?: ReactNode;
}

  export interface Student {
    id: string;
    nrp: string;
    name: string;
    major: string;
    year: number;
    ipk: number;
    semester: number;
    status: string;
  }

  export interface Academic {
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
  }
  export interface User {
    username: string;
    password: string;
  }
  export interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
  }
   export interface Scholarship {
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
  }
