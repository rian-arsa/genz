"use client";

export default function TopInfoSection() {
  const saldoPoin = 12500;

  return (
    <div className="w-full bg-pink-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
        {/* Informasi Poin */}
        <div className="text-pink-700 font-medium">
          Saldo Poin:{" "}
          <span className="font-bold">
            Rp{saldoPoin.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Tombol Top Up */}
        <button className="px-4 py-1.5 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700 transition">
          Top Up
        </button>
      </div>
    </div>
  );
}
