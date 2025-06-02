import LoginForm from "@/containers/auth/login/LoginContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Negara Gen Z",
  description:
    "Masuk ke akun Negara Gen Z untuk berbagi, berdiskusi, dan menjadi warga aktif komunitas digital Gen Z Indonesia.",
  openGraph: {
    title: "Masuk | Negara Gen Z",
    description:
      "Bergabung dan login ke Negara Gen Z, sosial media dengan semangat komunitas dan kebebasan berpendapat.",
    url: "https://negara-genz.com/login",
    siteName: "Negara Gen Z",
    images: [
      {
        url: "https://negara-genz.com/og-image-login.png",
        width: 1200,
        height: 630,
        alt: "Negara Gen Z Login",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masuk | Negara Gen Z",
    description:
      "Gabung dan login ke Negara Gen Z, tempatnya Gen Z berbicara, berbagi, dan bersatu.",
    images: ["https://negara-genz.com/og-image-login.png"],
  },
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
                    transition-colors duration-300 
                    bg-zinc-100 dark:bg-zinc-900 px-4">
      <LoginForm />
    </div>
  );
}
