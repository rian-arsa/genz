"use client";

import { HeaderBottom, HeaderTrigger } from "@/components/features";
import { Sidebar } from "@/containers/home";
import { OrwaSidebar } from "@/containers/orwa";
import { useIsMobile } from "@/context/isMobileContextProvider";
import { usePathname } from "next/navigation";

const URL_POST = ["/post", "/home"];
const URL_ORWA = ["/orwa"];

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
      <HeaderTrigger isMobile={isMobile} />

      {isMobile ? (
        <main className="flex flex-col md:hidden flex-1 px-4 py-20">
          {children}
        </main>
      ) : (
        <div className="flex flex-row gap-4 w-full">
          {URL_POST.some((url) => activeUrl.includes(url)) && <Sidebar />}
          {URL_ORWA.some((url) => activeUrl.includes(url)) && <OrwaSidebar />}

          {/* Main content area */}
          <main className="flex-1 p-4 py-20 xl:pr-96">{children}</main>
        </div>
      )}

      <HeaderBottom />
    </section>
  );
}
