"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

const dummyEvent = {
  id: "1",
  title: "Workshop Design Thinking",
  imageUrl: "/images/event.jpg",
  location: "Jakarta",
  date: "2025-06-10T09:00:00Z",
  status: "upcoming",
  price: 0,
  category: "Workshop",
  description:
    "Pelajari cara berpikir kreatif dan menyelesaikan masalah melalui metode design thinking. Terbuka untuk umum dan gratis!",
  terms:
    "Peserta wajib membawa alat tulis pribadi. Dilarang melakukan perekaman selama sesi berlangsung.",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.816666!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJakarta!5e0!3m2!1sen!2sid!4v1610000000000!5m2!1sen!2sid",
  testimonials: [
    {
      name: "Rani A.",
      comment:
        "Event-nya keren banget! Materi mudah dipahami dan pembicaranya luar biasa.",
    },
    {
      name: "Dimas W.",
      comment:
        "Aku jadi lebih paham tentang cara berpikir kreatif. Highly recommended!",
    },
  ],
};

type TEventDetail = {
  id: string;
};

export default function EventDetailPage({ id }: TEventDetail) {
  const params = useParams();
  const event = dummyEvent;

  return (
    <div className="w-full bg-white dark:bg-[#1f1f1f] rounded-xl shadow-sm">
      <div className="relative w-full aspect-[21/9] bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-6 py-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
              {event.title}
            </h1>

            <div className="text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1">
                📍 {event.location}
              </span>
              <span className="inline-flex items-center gap-1">
                🗓️{" "}
                {new Date(event.date).toLocaleString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                {event.category}
              </span>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-700" />

            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                Tentang Event
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mt-6 mb-1">
                Syarat & Ketentuan
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {event.terms}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mt-6 mb-1">
                Lokasi Map
              </h2>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src={event.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen></iframe>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mt-6 mb-1">
                Testimoni Peserta
              </h2>
              <div className="space-y-3">
                {event.testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
                    <p className="text-sm text-zinc-800 dark:text-white font-medium">
                      {t.name}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 italic">
                      "{t.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-md sticky top-24 h-fit">
          <div className="space-y-1">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Harga Tiket
            </p>
            <div className="text-2xl font-bold text-zinc-800 dark:text-white">
              {event.price === 0
                ? "Gratis"
                : event.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
            </div>
          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
            {event.price === 0 ? "Daftar Sekarang" : "Beli Tiket Sekarang"}
          </button>

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Tiket terbatas. Pastikan kamu sudah login sebelum membeli.
          </div>
        </div>
      </div>
    </div>
  );
}
