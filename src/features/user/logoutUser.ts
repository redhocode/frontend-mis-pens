import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

const logoutUser = async (router:any) => {
  try {
    sessionStorage.removeItem("accessToken");
    console.log("User logged out successfully");
    router.push("/"); // Ubah '/login' dengan rute halaman login Anda
  } catch (error: any) {
    console.error("Logout error:", error); // Log kesalahan
    throw error.message || "An error occurred while logging out";
  }
};

export default logoutUser;

