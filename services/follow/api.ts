import { TResponse } from "@/types/apiType";

import axiosInstance from "@/lib/axios/axiosInstance";
import { FollowToggle } from "./type";

export const followUserToggle = async (userIdFollow: string): Promise<TResponse<FollowToggle>> => {
  const res = await axiosInstance.post<TResponse<FollowToggle>>(`/api/follow/${userIdFollow}/toggle`);
  return res.data;
}