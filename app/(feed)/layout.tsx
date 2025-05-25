import { ReactNode } from "react";
import type { Metadata } from "next";

import ClientLayout from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Negara GenZ | Platform Sosial Masa Depan",
  description:
    "Gabung bersama Gen Z lainnya dan eksplorasi masa depan sosial media.",
  keywords: [
    "Gen Z",
    "Sosial Media",
    "Platform Anak Muda",
    "Next.js",
    "Indonesia",
  ],
  openGraph: {
    title: "Negara GenZ",
    description:
      "Gabung bersama Gen Z lainnya dan eksplorasi masa depan sosial media.",
    url: "https://negara-genz.com",
    siteName: "Negara GenZ",
    images: [
      {
        url: "https://negara-genz.com/og-image.jpg", // ganti dengan gambar OG-mu
        width: 1200,
        height: 630,
        alt: "Negara GenZ Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Negara GenZ",
    description:
      "Gabung bersama Gen Z lainnya dan eksplorasi masa depan sosial media.",
    images: ["https://negara-genz.com/og-image.jpg"],
  },
  metadataBase: new URL("https://negara-genz.com"),
};

export default function FeedLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
