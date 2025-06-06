"use client";

import { useAuthStore, useUserStore } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionBridge() {
  const { data: session, status } = useSession();

  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.reset);

  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
  const clearAuth = useAuthStore((s) => s.reset);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user, session.accessToken, session.refreshToken);
    }

    if (
      status === "authenticated" &&
      session?.accessToken &&
      session?.refreshToken
    ) {
      setAccessToken(session.accessToken);
      setRefreshToken(session.refreshToken);
    }

    if (status === "unauthenticated") {
      clearUser();
      clearAuth();
    }
  }, [
    status,
    session,
    setUser,
    clearUser,
    clearAuth,
    setAccessToken,
    setRefreshToken,
  ]);

  return null;
}
