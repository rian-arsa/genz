import { useQuery } from "@tanstack/react-query"
import { getNotificationHeader } from "./api"

export const useQueryGetNotificationHeader = () => {
  return useQuery({
    queryKey: ["notification-header"],
    queryFn: getNotificationHeader,
    refetchOnWindowFocus: true,
  })
}