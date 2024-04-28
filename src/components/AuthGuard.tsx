// components/AuthGuard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Periksa apakah pengguna telah login
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Jika pengguna belum login, redirect ke halaman login
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
