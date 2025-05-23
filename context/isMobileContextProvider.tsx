"use client";

import { createContext, useContext, useEffect, useState } from "react";

const IsMobileContext = createContext<boolean | null>(null);

export const useIsMobile = () => {
  const context = useContext(IsMobileContext);
  if (context === null) {
    throw new Error("useIsMobile must be used within IsMobileProvider");
  }
  return context;
};

export const IsMobileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check(); // initial check

    // Tambahkan resize listener
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Jangan render child kalau masih null (supaya tidak salah deteksi saat SSR + CSR)
  if (isMobile === null) return null;

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
};
