"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RedirectToLogin = () => {
  const router = useRouter();
  const { status } = useSession(); // ambil status: loading | unauthenticated | authenticated

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      router.replace("/pusat-warga"); // user sudah login
    } else {
      router.replace("/auth/login"); // user belum login
    }
  }, [status, router]);

  return null;
};

export default RedirectToLogin;
