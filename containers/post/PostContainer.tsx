"use client";

import { useState } from "react";

export default function PostDetailClient({ id }: { id: number }) {
  const [post, setPost] = useState({
    id,
    title: "Judul Postingan Keren",
    content:
      "Ini adalah isi lengkap dari postingan yang tampil di halaman detail. Bisa berisi text panjang, gambar, embed, dll.",
    author: "John Doe",
    date: "2025-05-24",
    isLiked: false,
    likeCount: 123,
    isSaved: false,
    commentCount: 17,
    shareCount: 5,
  });

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  };

  const handleSave = () => {
    setPost((prev) => ({ ...prev, isSaved: !prev.isSaved }));
  };

  const handleShare = () => {
    alert("Berbagi fitur belum diimplementasikan.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-black">Halo Rian</h1>
    </div>
  );
}
