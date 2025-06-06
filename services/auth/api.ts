// ✅ api.ts
import { axiosBase } from "@/lib/axios/base";
import { TResponse } from "@/types/apiType";
import axiosInstance from "@/lib/axios/axiosInstance";

// ================= REGISTER ====================

export interface RegisterPayload {
  email: string;
  name: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

export const registerUser = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  const res = await axiosBase.post<RegisterResponse>("/api/auth/register", data);
  return res.data;
};

// ================= LOGOUT ====================

export interface LogoutPayload {
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const logoutUser = async (payload: LogoutPayload): Promise<LogoutResponse> => {
  const res = await axiosBase.post<LogoutResponse>("/api/auth/logout", payload);
  return res.data;
};

// ================= USER DETAIL ====================
export interface UserDetail {
  following: number;
  followers: number;
}

export const getUserDetail = async (): Promise<TResponse<UserDetail>> => {
  const res = await axiosInstance.get<TResponse<UserDetail>>(`/api/auth/me-detail`);
  return res.data;
}


