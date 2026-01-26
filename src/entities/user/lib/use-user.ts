"use client";

import { getProfileBasic } from "@/src/entities/user/api/user.action";
import { useUserStore } from "@/src/entities/user/model/use-user-store";
import { USER_QUERY_KEYS } from "@/src/entities/user/model/user.query-keys";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

export function useUser() {
  const [isMounted, setIsMounted] = useState(false);
  const { setUserInfo, clearUser, user, isLoggedIn } = useUserStore();

  const query = useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfileBasic,
    enabled: isMounted,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleSetUser = useCallback(
    (data: typeof query.data) => {
      if (data) {
        setUserInfo(data);
      }
    },
    [setUserInfo],
  );

  const handleClearUser = useCallback(() => {
    clearUser();
  }, [clearUser]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (query.data) {
      handleSetUser(query.data);
    } else if (query.isError) {
      handleClearUser();
    }
  }, [isMounted, query.data, query.isError, handleSetUser, handleClearUser]);

  return {
    user,
    isLoggedIn,
    isLoading: !isMounted || query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
