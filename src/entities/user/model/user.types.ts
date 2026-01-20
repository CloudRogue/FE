import type { z } from "zod";
import type {
  profileBasicSchema,
  profileDetailSchema,
  profileAnswerSchema,
  profileUpdateAnswerSchema,
} from "@/src/entities/user/model/user.schema";

// API 응답 및 요청 타입
export type ProfileBasic = z.infer<typeof profileBasicSchema>;
export type ProfileDetail = z.infer<typeof profileDetailSchema>;
export type ProfileAnswer = z.infer<typeof profileAnswerSchema>;
export type ProfileUpdateAnswer = z.infer<typeof profileUpdateAnswerSchema>;

// Zustand 스토어 상태 타입
export interface UserState {
  user: ProfileBasic | null;
  isLoggedIn: boolean;
  setUserInfo: (user: ProfileBasic) => void;
  clearUser: () => void;
}
