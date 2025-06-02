"use client";

import { useUserStore } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionBridge() {
  const { data: session, status } = useSession();
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.reset);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user, session.accessToken, session.refreshToken);
    }

    if (status === "unauthenticated") {
      clearUser();
    }
  }, [status, session, setUser, clearUser]);

  return null;
}
