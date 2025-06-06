"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useUserDetail } from "@/services/auth/query";
import React from "react";

const DetailCountProfil: React.FC = () => {
  const { data } = useUserDetail();

  return (
    <div className="flex justify-around text-center mt-6 border-t pt-4 border-zinc-200 dark:border-zinc-700">
      <div>
        <p className="text-lg font-bold text-zinc-900 dark:text-white">{120}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Tulisan</p>
      </div>
      <div>
        <p className="text-lg font-bold text-zinc-900 dark:text-white">
          {useCountUp(data?.data?.followers || 0)}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Warga</p>
      </div>
      <div>
        <p className="text-lg font-bold text-zinc-900 dark:text-white">
          {useCountUp(data?.data?.following || 0)}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Tetangga</p>
      </div>
    </div>
  );
};

export default DetailCountProfil;
