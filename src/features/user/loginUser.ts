import { axiosInstance } from "../../lib/axios";

interface UserData {
  username: string;
  password: string;
  role: string;
  userId: string;
}

const loginUser = async (userData: UserData) => {
  try {
    const response = await axiosInstance.post("/users/login", userData);
  //  console.log("Response from server:", response.data); // Log respons dari server
    const { accessToken } = response.data.data;
   // console.log("Access token:", accessToken); // Log token JWT

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    sessionStorage.setItem("accessToken", accessToken);

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error); // Log kesalahan
    throw (
      error.response?.data?.message ||
      error.message ||
      "An error occurred while logging in"
    );
  }
};

export default loginUser;
