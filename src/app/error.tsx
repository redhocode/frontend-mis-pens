"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-9xl animate-bounce">Oops!</h1>
      <h2 className="mb-4 text-xl">Some thing went wrong</h2>
      
        <Button variant="outline" size="sm">
          Try again
        </Button>
      
    </div>
  );
}
