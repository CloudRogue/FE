import { Api } from "@/src/shared/api/api";
import { UserSchema, type User } from "@/src/entities/user/model/user.types";

export const getProfile = async (): Promise<User> => {
  return await Api.get("/api/mypage/profile", UserSchema);
};
