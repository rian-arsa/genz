"use client";

import {
  HeaderItemProfil,
  HeaderNotifItem,
  THeaderItemProfil,
  TNotifItem,
} from "@/components/ui";
import { useRouter } from "next/navigation";

type THeaderNotifProps = {
  notifs: TNotifItem[];
};

export const HeaderNotif = ({ notifs }: THeaderNotifProps) => {
  return (
    <div className="absolute right-12 top-12 w-64 bg-white dark:bg-zinc-800 shadow-lg rounded-md p-3 z-50 text-sm">
      <p className="text-zinc-700 dark:text-zinc-200 font-semibold mb-2">
        Notifications
      </p>
      <ul className="flex flex-col gap-2">
        {notifs.map((notif) => (
          <HeaderNotifItem key={notif.id} {...notif} />
        ))}
      </ul>
    </div>
  );
};

type THeaderProfilProps = {
  menus: THeaderItemProfil[];
};

export const HeaderProfil = ({ menus }: THeaderProfilProps) => {
  const router = useRouter();

  const handleMenuClick = (menu: THeaderItemProfil) => {
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
