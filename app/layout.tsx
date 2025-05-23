import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/themeContextProvider";
import { IsMobileProvider } from "@/context/isMobileContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Negara GenZ | Platform Sosial Masa Depan",
  description:
    "Gabung bersama Gen Z lainnya dan eksplorasi masa depan sosial media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-zinc-50 dark:bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <IsMobileProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </IsMobileProvider>
      </body>
    </html>
  );
}
