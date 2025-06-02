// store/user/userStore.ts
import { TUser } from "@/types/auth/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: TUser | null;
  accessToken?: string;
  refreshToken?: string;
  setUser: (user: TUser, accessToken?: string, refreshToken?: string) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: undefined,
      refreshToken: undefined,
      setUser: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),
      reset: () => {
        set({
          user: null,
          accessToken: undefined,
          refreshToken: undefined
        });
        if (typeof window !== "undefined") {
          localStorage.removeItem("user-storage"); // tergantung nama key di persist
        }
      }

    }),
    { name: "user-storage" } // localStorage key
  )
);
