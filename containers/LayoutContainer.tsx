"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ThemeProvider from "@/context/themeContextProvider";
import { IsMobileProvider } from "@/context/isMobileContextProvider";
import { ReactNode, useState } from "react";
import SessionBridge from "./sessionBridge";
import QueryProvider from "@/providers/query-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <IsMobileProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Toaster richColors position="top-right" />
            <SessionBridge />
            {children}
          </ThemeProvider>
        </IsMobileProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
