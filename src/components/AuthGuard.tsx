// components/AuthGuard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

// Konstanta untuk mengatur durasi timeout sesi (30 menit dalam milidetik)
const SESSION_TIMEOUT = 100000

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  // State untuk menyimpan ID timeout
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {toast} = useToast();
  // Callback untuk menangani aktivitas pengguna dan mengatur ulang timer
  const handleUserActivity = useCallback(() => {
    // Jika ada timeout yang sudah ada, bersihkan terlebih dahulu
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Atur timeout baru
    const newTimeoutId = setTimeout(() => {
      // Jika timeout tercapai, beri tahu pengguna dan hapus token dari localStorage
      toast({
        title: "Session Timeout",
        description: "Your session has timed out. Please log in again.",
        variant: "destructive",
      })
      localStorage.removeItem("accessToken");
      // Redirect ke halaman login
      router.push("/uhuy-12340987/login");
    }, SESSION_TIMEOUT);

    // Simpan ID timeout yang baru
    setTimeoutId(newTimeoutId);
  }, [timeoutId, router]);

  useEffect(() => {
    
    // Periksa apakah pengguna telah login dengan melihat apakah ada accessToken di localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Jika pengguna belum login, redirect ke halaman login
      router.push("/uhuy-12340987/login");
      return;
    }

    // Atur timer awal saat komponen pertama kali dirender
    handleUserActivity();

    // Tambahkan event listeners untuk mendeteksi aktivitas pengguna
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Bersihkan event listeners dan timeout saat komponen di-unmount
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleUserActivity, timeoutId, router]);

  // Render children jika pengguna sudah terautentikasi
  return <>{children}</>;
};

export default AuthGuard;
