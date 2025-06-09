
import { TResponse } from "@/types/apiType";
import { NotificationHeader } from "./type";

import axiosInstance from "@/lib/axios/axiosInstance";

export const getNotificationHeader = async (): Promise<TResponse<NotificationHeader>> => {
  const res = await axiosInstance.get<TResponse<NotificationHeader>>(`/api/notifications/header`);
  return res.data;
}