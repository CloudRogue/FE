import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserAuthState {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}


export const useUserStore = create<UserAuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        setLoggedIn: (isLoggedIn: boolean) =>
          set({ isLoggedIn }, false, "user/setLoggedIn"),
        logout: () => set({ isLoggedIn: false }, false, "user/logout"),
      }),
      {
        name: "user-auth-storage",
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
        }),
      },
    ),
    { name: "UserAuthStore" },
  ),
);
