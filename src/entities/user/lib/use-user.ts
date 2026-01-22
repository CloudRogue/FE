"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProfileBasic } from "@/src/entities/user/api/user.action";
import { useUserStore } from "@/src/entities/user/model/use-user-store";

export function useUser() {
  const { setUserInfo, clearUser, user, isLoggedIn } = useUserStore();

  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfileBasic,
    retry: false,
    
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data) {
      setUserInfo(query.data);
    } else if (query.isError) {
      clearUser();
    }
  }, [query.data, query.isError, setUserInfo, clearUser]);

  return {
    user,
    isLoggedIn,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
