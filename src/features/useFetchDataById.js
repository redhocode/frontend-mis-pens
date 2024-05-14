import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDataById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dataById", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/scholarships/${id}`);
      // console.log("Response from API:", response.data);
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useFetchDataAcademicById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dataById", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/academics/${id}`);
      // console.log("Response from API:", response.data);
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useFetchDataActivityById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dataById", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/activitys/${id}`);
      // console.log("Response from API:", response.data);
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};