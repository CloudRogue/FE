import { useQuery } from "@tanstack/react-query";
import {
  getProfileBasic,
  getProfileDetail,
} from "@/src/entities/user/api/user.action";
import { USER_QUERY_KEYS } from "@/src/entities/user/model/user.query-keys";

/**
 * 프로필 기본 정보 조회
 *
 */
export const useGetProfileBasic = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfileBasic,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

/**
 * 프로필 상세 정보 조회
 */
export const useGetProfileDetail = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(),
    queryFn: getProfileDetail,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
