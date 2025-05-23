import { TNotifItem } from "@/components/ui";

export const dummyNotifItems: TNotifItem[] = [
  {
    id: "1",
    message: "🎉 Selamat! Kamu berhasil menyelesaikan misi harian.",
    isRead: false,
    timestamp: "2025-05-23T22:00:00Z",
    url: "/missions/daily",
  },
  {
    id: "2",
    message: "📢 Ada update terbaru dari fitur Feed Sosial kamu!",
    isRead: true,
    timestamp: "2025-05-22T18:45:00Z",
    url: "/feed/updates",
  },
  {
    id: "3",
    message: "💼 Permintaan koneksi dari Budi Prasetyo telah diterima.",
    isRead: false,
    timestamp: "2025-05-21T09:30:00Z",
    url: "/network/requests",
  },
];
