import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "./api";

export const useUserDetail = () => {

  return useQuery({
    queryKey: ["user-detail"],
    queryFn: getUserDetail,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
