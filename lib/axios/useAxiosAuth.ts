"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  const instance = useMemo(() => {
    const token = session?.user?.accessToken;

    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    return axiosInstance;
  }, [session?.user?.accessToken]);

  return instance;
};
