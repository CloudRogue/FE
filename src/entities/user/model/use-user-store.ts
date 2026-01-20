import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  UserState,
  ProfileBasic,
} from "@/src/entities/user/model/user.types";

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUserInfo: (user: ProfileBasic) =>
        set({ user, isLoggedIn: true }, false, "user/setUserInfo"),
      clearUser: () =>
        set({ user: null, isLoggedIn: false }, false, "user/clearUser"),
    }),
    { name: "UserStore" },
  ),
);
