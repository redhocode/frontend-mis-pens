import { axiosInstance } from "../lib/axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
export const useFetchStudent = (page, pageSize, filterValue) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students", page, pageSize, filterValue],
    queryFn: async () => {
      const response = await axiosInstance.get(`/students`, {
        params: {
          filter: filterValue,
          page,
          pageSize,
        },
      });
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

/// fetch Academic
export const useFetchAcademic = (page, pageSize, filterValue) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["academic", page, pageSize, filterValue],
    queryFn: async () => {
      const response = await axiosInstance.get(`/academics`, {
        params: {
          filter: filterValue,
          page,
          pageSize,
        },
      });
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

//fetch Scholarship

export const useFetchScholarship = (page, pageSize, filterValue) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["scholarship", page, pageSize, filterValue],
    queryFn: async () => {
      const response = await axiosInstance.get(`/scholarships`, {
        params: {
          filter: filterValue,
          page,
          pageSize,
        },
      });
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

//fetch Actifitys
export const useFetchActivity = (page, pageSize, filterValue) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["activity", page, pageSize, filterValue],
    queryFn: async () => {
      const response = await axiosInstance.get(`/activitys`, {
        params: {
          filter: filterValue,
          page,
          pageSize,
        },
      });
      // console.log("Response from API:", response.data);
      return response.data;
    },
  });
   return {
    data,
    isLoading,
    refetch,
  };
}

//fetch Users

export const useFetchUsers = (page, pageSize, filterValue) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", page, pageSize, filterValue],
    queryFn: async () => {
      const response = await axiosInstance.get(`/users`, {
        params: {
          filter: filterValue,
          page,
          pageSize,
        },
      });
      // console.log("Response from API:", response.data);
      return response.data;
    },
  });
   return {
    data,
    isLoading,
    refetch,
  };
}
