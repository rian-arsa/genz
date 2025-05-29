"use client";

import { HeaderBottom, HeaderTrigger } from "@/components/features";
import { Sidebar } from "@/containers/pusat-warga";
import { OrwaSidebar } from "@/containers/ormas";
import { useIsMobile } from "@/context/isMobileContextProvider";
import { usePathname } from "next/navigation";

export const URL_POST = [
  "/post",
  "/pusat-warga",
  "/ormas",
  "/pasar",
  "/pemberitahuan",
];
export const URL_ORWA = ["/ormas/"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const activeUrl = usePathname();

  if (isMobile === null) return null;

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950">
      <HeaderTrigger isMobile={isMobile} activeUrl={activeUrl} />

      {isMobile ? (
        <main className="flex flex-col md:hidden flex-1 px-4 py-20">
          {children}
        </main>
      ) : (
        <>
          {URL_ORWA.some((url) => activeUrl?.includes(url)) ? (
            <section className="flex flex-row w-full">
              <OrwaSidebar isLanding={false} />
              <main className="flex-1 px-4 py-20 xl:pr-96">{children}</main>
            </section>
          ) : URL_POST.some((url) => activeUrl?.includes(url)) ? (
            <section className="flex flex-row w-full">
              <Sidebar />
              <main className="flex-1 px-4 py-20 xl:pr-96">{children}</main>
            </section>
          ) : (
            <main className="flex-1 px-4 py-20">{children}</main>
          )}
        </>
      )}

      <HeaderBottom />
    </section>
  );
}
