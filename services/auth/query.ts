import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "./api";

export const useUserDetail = () => {

  return useQuery({
    queryKey: ["user-detail"],
    queryFn: getUserDetail,
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
