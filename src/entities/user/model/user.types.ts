import type { z } from "zod";
import type {
  profileBasicSchema,
  profileDetailSchema,
  profileAnswerSchema,
  profileUpdateAnswerSchema,
} from "@/src/entities/user/model/user.schema";

export type ProfileBasic = z.infer<typeof profileBasicSchema>;
export type ProfileDetail = z.infer<typeof profileDetailSchema>;
export type ProfileAnswer = z.infer<typeof profileAnswerSchema>;
export type ProfileUpdateAnswer = z.infer<typeof profileUpdateAnswerSchema>;

export interface UserState {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

/**
 * @deprecated UserState에서 user 제거
 *
 * Before:
 * const { user } = useUserStore();
 *
 * After:
 * const { user } = useUser();
 */
export interface LegacyUserState {
  user: ProfileBasic | null;
  isLoggedIn: boolean;
  setUserInfo: (user: ProfileBasic) => void;
  logout: () => void;
}
