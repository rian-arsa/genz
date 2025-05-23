import { DateTime } from "luxon";

export function timeAgo(timestamp?: string): string {
  if (!timestamp) return "";

  const now = DateTime.now();
  const then = DateTime.fromISO(timestamp);
  const diff = now.diff(then, ["years", "months", "days", "hours", "minutes", "seconds"]).toObject();

  if (diff.years && diff.years >= 1) return `${Math.floor(diff.years)} tahun yang lalu`;
  if (diff.months && diff.months >= 1) return `${Math.floor(diff.months)} bulan yang lalu`;
  if (diff.days && diff.days >= 7) return `${Math.floor(diff.days / 7)} minggu yang lalu`;
  if (diff.days && diff.days >= 1) return `${Math.floor(diff.days)} hari yang lalu`;
  if (diff.hours && diff.hours >= 1) return `${Math.floor(diff.hours)} jam yang lalu`;
  if (diff.minutes && diff.minutes >= 1) return `${Math.floor(diff.minutes)} menit yang lalu`;
  return `baru saja`;
}

