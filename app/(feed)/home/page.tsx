import { HomeContainer } from "@/containers/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Negara Gen Z",
  description: "Connect with friends and share your thoughts on Negara Gen Z",
  openGraph: {
    title: "Home | Negara Gen Z",
    description: "Connect with friends and share your thoughts on Negara Gen Z",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Negara Gen Z",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Negara Gen Z",
    description: "Connect with friends and share your thoughts on Negara Gen Z",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return <HomeContainer />;
}
