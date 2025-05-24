"use client";

import { HeaderTrigger } from "@/components/features";
import { Sidebar } from "@/containers/home";
import { useIsMobile } from "@/context/isMobileContextProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950">
      <HeaderTrigger isMobile={isMobile} />

      {isMobile ? (
        <main className="flex flex-col md:hidden flex-1 px-4 py-20">
          {children}
        </main>
      ) : (
        <div className="flex flex-row gap-4 w-full">
          <Sidebar />
          <main className="flex-1 p-4 py-20 xl:pr-96">{children}</main>
        </div>
      )}
    </section>
  );
}
