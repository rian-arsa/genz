"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/services/auth/mutation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type FormData = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { mutate, isPending } = useRegisterMutation();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/pusat-warga");
    }
  }, [status]);

  const [form, setForm] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Register berhasil 🎉");

        router.push("/auth/login");
      },
      onError: (err: any) => {
        toast.error(err.message || "Gagal register");
      },
    });
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 relative">
      {/* 🌗 Toggle Theme */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-4 right-4 text-zinc-500 hover:text-pink-500 transition"
        aria-label="Toggle Theme">
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-pink-500">
          👋 Daftar Yuk!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Jadi warga resmi Negara Gen Z ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Nama Lengkap
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            required
            placeholder="Nama kamu"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 
              rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Username
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            required
            placeholder="Username kamu"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 
              rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            placeholder="email@kamu.com"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 
              rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white 
              focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 border border-zinc-300 dark:border-zinc-700 
                rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-pink-500"
              tabIndex={-1}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition duration-300">
          {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>
      </form>

      <div className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-6">
        Sudah punya akun?{" "}
        <span
          className="underline cursor-pointer text-pink-500 hover:text-pink-600"
          onClick={() => router.push("/auth/login")}>
          Masuk
        </span>
      </div>
    </div>
  );
}
