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
export interface NavbarItems{
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon;
    }>;
    extras?: ReactNode;
}

  export interface Student {
    receivedAwardId: string;
    receivedAwardName: string;
    id: string;
    nrp: string;
    name: string;
    major: string;
    year: number;
    ipk: number;
    semester: number;
    status: string;
    image: string;
  }

  export interface Academic {
    username: ReactNode;
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
   
  }
  export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
  }
  export interface Activity {
    username: ReactNode;
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
    image: string;
  }
   export interface Scholarship {
    username: ReactNode;
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
    image: string;
    
  }
