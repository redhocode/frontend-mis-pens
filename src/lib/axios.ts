import axios from "axios";
const NEXT_PUBLIC_API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

export const getAuthorizationHeader = () => {
  const token = getToken();
  return token ? `Bearer ${token}` : "";
};

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  // headers: {
  //   "Content-Type": "multipart/form-data", // Pastikan tipe konten disetel ke multipart/form-data
  // },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authorizationHeader = getAuthorizationHeader();
    if (authorizationHeader) {
      config.headers.Authorization = authorizationHeader;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


