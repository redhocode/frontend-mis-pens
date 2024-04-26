import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  onNotAuthenticated: () => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  onNotAuthenticated,
}) => {
  const router = useRouter();

  useEffect(() => {
    // Lakukan pengecekan autentikasi di sini
    const isAuthenticated = true; // Misalnya, pengguna selalu dianggap terotentikasi

    if (!isAuthenticated) {
      onNotAuthenticated(); // Jika pengguna tidak terotentikasi, panggil fungsi onNotAuthenticated
    }
  }, [onNotAuthenticated]);

  return <>{children}</>; // Render children jika pengguna terotentikasi
};
