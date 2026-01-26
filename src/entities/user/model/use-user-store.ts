import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  UserState,
  ProfileBasic,
} from "@/src/entities/user/model/user.types";

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setUserInfo: (user: ProfileBasic) =>
          set({ user, isLoggedIn: true }, false, "user/setUserInfo"),
        clearUser: () =>
          set({ user: null, isLoggedIn: false }, false, "user/clearUser"),
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
        }),
      },
    ),
    { name: "UserStore" },
  ),
);
