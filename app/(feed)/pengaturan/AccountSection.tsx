// app/settings/sections/AccountSection.tsx
export default function AccountSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Akun & Profil
      </h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama kamu"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full px-3 py-2 mt-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-white"
          />
        </div>
      </div>
    </section>
  );
}
