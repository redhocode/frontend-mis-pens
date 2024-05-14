"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export  default function DetailScholarship({id}:{id:string}) {
    const router = useRouter();
    const hendleClick = () => {
        router.push(`/scholarships/${id}`);
    }
    return(
        <Button
        variant={"outline"}
        onClick={hendleClick}
        >
        Detail
        </Button>
    )
}
