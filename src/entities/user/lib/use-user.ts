import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProfile } from "@/src/entities/user/api/profile.action";
import { useUserStore } from "@/src/entities/user/model/use-user-store";

export function useUser() {
  const { setUserInfo, clearUser, user, isLoggedIn } = useUserStore();

  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
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
