"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ThemeProvider from "@/context/themeContextProvider";
import { IsMobileProvider } from "@/context/isMobileContextProvider";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <IsMobileProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Toaster richColors position="top-right" />
            {children}
          </ThemeProvider>
        </IsMobileProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
