import { Api } from "@/src/shared/api/api";
import { z } from "zod";
import {
  profileBasicSchema,
  profileDetailSchema,
} from "@/src/entities/user/model/user.schema";
import type {
  ProfileBasic,
  ProfileDetail,
  ProfileUpdateAnswer,
} from "@/src/entities/user/model/user.types";

/**
 * 프로필 기본정보 조회 (이름, 이메일, 온보딩 여부)
 */
export const getProfileBasic = async (): Promise<ProfileBasic> => {
  return await Api.get("/mypage/profile", profileBasicSchema);
};

/**
 * 맞춤 추천을 위한 프로필 상세 정보 조회
 */
export const getProfileDetail = async (): Promise<ProfileDetail> => {
  return await Api.get("/mypage/profile/detail", profileDetailSchema);
};

/**
 * 상세 프로필 정보 갱신 (Upsert)
 */
export const upsertProfileDetail = async (answers: ProfileUpdateAnswer[]) => {
  return await Api.put("/mypage/profile/detail", z.any(), { answers });
};
