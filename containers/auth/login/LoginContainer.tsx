"use client";

import { useTheme } from "next-themes";
import { useSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { theme, setTheme } = useTheme();
  const { register, handleSubmit } = useForm<FormData>();
  const { status } = useSession();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/pusat-warga");
    }
  }, [status]);

  const onSubmit = async (data: FormData) => {
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah. 😢");
    } else {
      router.push("/pusat-warga");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 relative">
      {/* 🌗 Tombol toggle dark/light mode */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-4 right-4 text-zinc-500 hover:text-pink-500 transition"
        aria-label="Toggle Dark Mode">
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-pink-500">
          Selamat Datang!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Yuk login dan jadi warga Negara Gen Z 🚀
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="kamu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 pr-10 border border-zinc-300 dark:border-zinc-700 
                 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white 
                 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-pink-500"
              tabIndex={-1} // biar gak fokus tab ke tombol ini
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition duration-300">
          Masuk
        </button>
      </form>

      <div className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-6">
        Belum punya akun?{" "}
        <Link
          href="/auth/register"
          className="underline cursor-pointer text-pink-500 hover:text-pink-600">
          Daftar yuk
        </Link>
      </div>
    </div>
  );
}
