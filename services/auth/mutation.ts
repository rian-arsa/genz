// ✅ mutation.ts
import { useMutation } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import { registerUser, RegisterPayload, RegisterResponse, logoutUser } from "./api";
import { resetAllStores } from "@/store";

export const useRegisterMutation = () =>
  useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: registerUser,
  });

export const useLogoutMutation = () => {
  const { data: session } = useSession();
  const token = session?.refreshToken || "";

  return useMutation({
    mutationFn: async () => {
      logoutUser({ refreshToken: token });
      resetAllStores();
      await signOut({ callbackUrl: "/auth/login" });
    },
  });
};