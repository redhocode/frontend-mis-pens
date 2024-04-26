import { axiosInstance } from '../../lib/axios';

interface UserData {
  username: string;
  password: string;
  userId: string;
}

const loginUser = async (userData: UserData) => {
  try {
    // Make the POST request to the backend
    const response = await axiosInstance.post('/users/login', userData);
    
    // Ensure that the response structure matches what you expect
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    
    // Store tokens and username in both localStorage and cookies
    localStorage.setItem('accessToken', accessToken);
    // document.cookie = `accessToken=${accessToken}; path=/`; // Store in a cookie with path set to root
    
    // Return response data
    return response.data;
  } catch (error:any) {
    // Handle errors and throw custom error message
    throw error.response?.data?.message || error.message || 'An error occurred while logging in';
  }
};

export default loginUser;
