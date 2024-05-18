"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {EyeIcon} from "lucide-react"
export default function DetailScholarship({ id }: { id: string }) {
  const router = useRouter();
  const hendleClick = () => {
    router.push(`/dashboard/scholarships/${id}`);
  };
  return (
    <Button
      variant={"outline"}
      onClick={hendleClick}
      className="bg-yellow-300 text-slate-700"
    >
    <EyeIcon className="mr-2"/>
      Detail
    </Button>
  );
}
