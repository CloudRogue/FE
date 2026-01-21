import { useQuery } from "@tanstack/react-query";
import {
  getProfileBasic,
  getProfileDetail,
} from "@/src/entities/user/api/user.action";
import { useUserStore } from "@/src/entities/user";

export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  profile: () => [...USER_QUERY_KEYS.all, "profile"] as const,
  detail: () => [...USER_QUERY_KEYS.all, "detail"] as const,
};

export const useGetProfileBasic = () => {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfileBasic,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetProfileDetail = () => {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(),
    queryFn: getProfileDetail,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });
};
