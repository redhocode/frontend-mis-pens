import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

const logoutUser = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter(); // Menggunakan useRouter untuk mendapatkan router

  try {
    // Kirim permintaan POST ke endpoint /logout di backend
    await axiosInstance.post("/logout");

    // Hapus token dari local storage atau cookie jika perlu
    localStorage.removeItem("accessToken");

    // Redirect pengguna ke halaman login atau halaman lainnya
    router.push("/"); // Ubah '/login' dengan rute halaman login Anda
  } catch (error) {
    // Handle error jika terjadi
    console.error("Error during logout:", error);
    // Tampilkan pesan kesalahan kepada pengguna jika perlu
  }
};

export default logoutUser;
