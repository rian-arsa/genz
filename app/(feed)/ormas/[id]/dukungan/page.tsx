"use client";

import { useState } from "react";

type Donation = {
  name: string;
  amount: number;
  message: string;
  timestamp: string;
};

export default function SupportUs() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(15000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);

  const getAmount = (): number => {
    return selectedAmount !== null
      ? selectedAmount
      : parseInt(customAmount || "0");
  };

  const handleDonate = () => {
    const amount = getAmount();
    if (isNaN(amount) || amount <= 0) {
      alert("Masukkan nominal yang valid.");
      return;
    }

    const newDonation: Donation = {
      name: name || "Anonim",
      amount,
      message,
      timestamp: new Date().toLocaleString("id-ID", { hour12: false }),
    };

    setDonations([newDonation, ...donations]);
    setName("");
    setMessage("");
    setCustomAmount("");
    setSelectedAmount(15000); // reset
    alert(
      `Terima kasih, ${newDonation.name}! Dukungan Rp${amount.toLocaleString()}`
    );
  };

  const quickAmounts = [10000, 20000, 30000, 50000, 80000, 100000];

  return (
    <section className=" mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-600">
          Dukung Kami Untuk Buat Lebih Banyak Karya
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
          Bantu kami terus berkarya dengan dukungan kecilmu. Setiap kontribusi
          yang kamu berikan akan sangat berarti bagi kami untuk terus
          menciptakan karya-karya yang bermanfaat.
        </p>
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            className={`px-4 py-2 rounded-lg text-sm border ${
              selectedAmount === amt
                ? "bg-pink-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white"
            }`}
            onClick={() => {
              setSelectedAmount(amt);
              setCustomAmount("");
            }}>
            Rp{amt.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <input
        type="number"
        placeholder="Atau masukkan nominal sendiri"
        value={customAmount}
        onChange={(e) => {
          setCustomAmount(e.target.value);
          setSelectedAmount(null);
        }}
        className="w-full px-4 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white"
      />

      {/* Name and Message */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nama kamu (opsional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white"
        />

        <textarea
          placeholder="Pesan penyemangat..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white"
        />
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition">
        Dukung Rp{getAmount().toLocaleString()}
      </button>

      {/* Donation History */}
      {donations.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Riwayat Dukungan untuk Organisasi Kami
          </h3>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {donations.map((donation, idx) => (
              <li
                key={idx}
                className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-sm">
                <p className="font-bold text-pink-600">{donation.name}</p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Donasi: Rp{donation.amount.toLocaleString()}
                </p>
                {donation.message && (
                  <p className="italic text-zinc-500 mt-1">
                    "{donation.message}"
                  </p>
                )}
                <p className="text-xs text-zinc-400 mt-1">
                  {donation.timestamp}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
