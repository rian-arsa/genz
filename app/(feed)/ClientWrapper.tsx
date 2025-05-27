"use client";

import { HeaderBottom, HeaderTrigger } from "@/components/features";
import { Sidebar } from "@/containers/home";
import { OrwaSidebar } from "@/containers/ormas";
import { useIsMobile } from "@/context/isMobileContextProvider";
import { usePathname } from "next/navigation";

export const URL_POST = ["/post", "/home"];
export const URL_ORWA = ["/ormas/"];
export const URL_ORWA_LANDING = "/ormas";

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
        <section className="flex flex-row w-full">
          {URL_POST.some((url) => activeUrl.includes(url)) && <Sidebar />}
          {URL_ORWA.some((url) => activeUrl.includes(url)) && (
            <OrwaSidebar isLanding={false} />
          )}
          {URL_ORWA_LANDING === activeUrl && <OrwaSidebar isLanding={true} />}

          {/* Main content area */}
          <main className="flex-1 p-4 py-20 xl:pr-96">{children}</main>
        </section>
      )}

      <HeaderBottom />
    </section>
  );
}
