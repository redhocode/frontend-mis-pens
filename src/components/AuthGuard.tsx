// components/AuthGuard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Konstanta untuk mengatur durasi timeout sesi (30 menit dalam milidetik)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 menit

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleUserActivity = () => {
    // Hapus timer yang ada
    window.clearTimeout(window.authTimeout);

    // Atur timeout baru
    window.authTimeout = window.setTimeout(() => {
      toast({
        title: "Session Timeout",
        description: "Your session has timed out. Please log in again.",
        variant: "destructive",
      });
      localStorage.removeItem("accessToken");
      router.push("/uhuy-12340987/login");
    }, SESSION_TIMEOUT);
  };

  useEffect(() => {
    // Pindahkan langsung ke halaman login saat browser direload
    router.push("/uhuy-12340987/login");

    // Atur timer awal saat komponen pertama kali dirender
    handleUserActivity();

    // Tambahkan event listeners untuk mendeteksi aktivitas pengguna
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Bersihkan event listeners saat komponen di-unmount
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      // Bersihkan timer saat komponen di-unmount
      window.clearTimeout(window.authTimeout);
    };
  }, []);

  // Render children jika pengguna sudah terautentikasi
  return <>{children}</>;
};

export default AuthGuard;
