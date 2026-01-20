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
  user: ProfileBasic | null;
  isLoggedIn: boolean;
  setUserInfo: (user: ProfileBasic) => void;
  clearUser: () => void;
}
