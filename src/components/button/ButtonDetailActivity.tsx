"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function DetailActivity({ id }: { id: string }) {
  const router = useRouter();
  const hendleClick = () => {
    router.push(`/activities/${id}`);
  };
  return (
    <Button
      variant={"outline"}
      onClick={hendleClick}
      className="bg-primary text-white"
    >
      Detail
    </Button>
  );
}
