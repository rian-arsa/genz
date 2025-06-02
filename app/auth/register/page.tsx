import RegisterForm from "@/containers/auth/register/RegisterContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Negara Gen Z",
  description: "Bergabunglah dengan komunitas warga Negara Gen Z!",
};

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
                    bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300 px-4">
      <RegisterForm />
    </div>
  );
}
