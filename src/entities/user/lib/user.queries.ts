import { useQuery } from "@tanstack/react-query";
import {
  getProfileBasic,
  getProfileDetail,
} from "@/src/entities/user/api/user.action";

export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  profile: () => [...USER_QUERY_KEYS.all, "profile"] as const,
  detail: () => [...USER_QUERY_KEYS.all, "detail"] as const,
};

/**
 * 프로필 기본 정보 (이름, 이메일, 온보딩 여부) 조회 훅
 * OpenAPI: GET /api/mypage/profile
 */
export const useGetProfileBasic = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfileBasic,
    staleTime: 1000 * 60 * 5, // 5분 유지
  });
};

/**
 * 프로필 상세 정보 (온보딩 질문 및 답변 리스트) 조회 훅
 * OpenAPI: GET /api/mypage/profile/detail
 */
export const useGetProfileDetail = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(),
    queryFn: getProfileDetail,
    staleTime: 1000 * 60 * 5,
  });
};
