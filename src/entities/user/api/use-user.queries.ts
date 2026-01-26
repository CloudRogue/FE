import { useQuery } from "@tanstack/react-query";
import { getProfileDetail } from "@/src/entities/user/api/user.action";
import { useUserStore } from "@/src/entities/user";
import { USER_QUERY_KEYS } from "@/src/entities/user/model/user.query-keys";

export const useGetProfileDetail = () => {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(),
    queryFn: getProfileDetail,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
