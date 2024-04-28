import axios from "axios";

// Mengekstrak URL backend dari variabel lingkungan sesuai dengan mode yang sedang berjalan
const NEXT_PUBLIC_API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL;

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
