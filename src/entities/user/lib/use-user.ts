"use client";

import { getProfileBasic } from "@/src/entities/user/api/user.action";
import { useUserStore } from "@/src/entities/user/model/use-user-store";
import { USER_QUERY_KEYS } from "@/src/entities/user/model/user.query-keys";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isLoggedIn } = useUserStore();

  const query = useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfileBasic,
    enabled: isLoggedIn,
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

 
  return {
    user: query.data ?? null, 
    isLoggedIn,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
