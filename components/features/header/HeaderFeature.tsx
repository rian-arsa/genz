"use client";

import {
  HeaderItemProfil,
  HeaderNotifItem,
  THeaderItemProfil,
} from "@/components/ui";
import { useLogoutMutation } from "@/services/auth/mutation";
import { useQueryGetNotificationHeader } from "@/services/notifications/query";
import { resetAllStores } from "@/store";
import { useRouter } from "next/navigation";

export const HeaderNotif = () => {
  const { data, isLoading } = useQueryGetNotificationHeader();

  return (
    <div className="absolute right-12 top-12 w-64 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-3 z-50 text-sm">
      <p className="text-base text-zinc-700 dark:text-zinc-200 font-semibold">
        Notifications
      </p>
      {isLoading ? (
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Loading...</p>
      ) : (
        <>
          {data && data.data.unreadCount > 0 && (
            <p className="text-zinc-500 dark:text-zinc-400 mb-3">
              Ada {data?.data?.unreadCount || 0} notif nganggur belum dibaca!
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {(data?.data?.notifications?.length ?? 0) > 0 &&
              data?.data?.notifications?.map((notif) => (
                <HeaderNotifItem key={notif.id} {...notif} />
              ))}
          </ul>
          {data?.data?.notifications.length === 0 && (
            <p className="text-zinc-500 dark:text-zinc-400 text-center">
              Tidak ada notifikasi baru
            </p>
          )}
        </>
      )}

      <button
        onClick={() => console.log("Clicked: Mark all notifications as read")}
        className="mt-3 w-full text-center text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
        Lihat Semua Notifikasi
      </button>
    </div>
  );
};

type THeaderProfilProps = {
  menus: THeaderItemProfil[];
};

export const HeaderProfil = ({ menus }: THeaderProfilProps) => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleMenuClick = (menu: THeaderItemProfil) => {
    if (menu.label === "Keluar") {
      logout();
      if (isPending) return; // Prevent multiple clicks while pending
      router.push("/auth/login");
      return;
    }

    router.push(menu.url);
  };

  return (
    <div className="absolute right-0 top-12 w-48 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-2 z-50">
      <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        {menus.map((menu) => (
          <HeaderItemProfil
            key={menu.label}
            item={menu}
            onClick={() => handleMenuClick(menu)}
          />
        ))}
      </ul>
    </div>
  );
};
