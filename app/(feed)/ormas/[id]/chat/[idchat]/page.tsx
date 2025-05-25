"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Send,
  Smile,
  CheckCheck,
  Image as ImageIcon,
  EllipsisVertical,
} from "lucide-react";

const dummyMessages = [
  {
    id: "m1",
    sender: "Ayu",
    content: "Hai semuanya! 👋",
    timestamp: "10:03",
    status: "read",
    replyTo: null,
    image: "",
    avatar: "/images/avatar1.jpg",
  },
  {
    id: "m2",
    sender: "Rizky",
    content: "Selamat pagi! Sudah siap rapat hari ini?",
    timestamp: "10:05",
    status: "read",
    replyTo: null,
    image: "",
    avatar: "/images/avatar2.jpg",
  },
];

export default function OrganizationChatPage() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() && !previewImage) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: "Kamu",
      content: input,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      replyTo: null,
      image: previewImage || "",
      avatar: "",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setPreviewImage(null);
  };

  // useEffect(() => {
  //   if (messages) {
  //     const timeout = setTimeout(() => {
  //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //     }, 100);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [messages]);

  return (
    <div className="fixed top-20 left-0 w-full h-[85dvh] md:w-[38rem] md:left-72 xl:left-80 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-zinc-800 shadow-md rounded-none md:rounded-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 rounded-t-xl">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-700" />
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
            Grup Rapat
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            5 anggota online
          </p>
        </div>
        <EllipsisVertical className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${
              msg.sender === "Kamu" ? "justify-end" : "justify-start"
            }`}>
            {msg.sender !== "Kamu" && (
              <div className="flex flex-col items-center">
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-7 h-7 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col items-start max-w-[80%]">
              {msg.sender !== "Kamu" && (
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 ml-1">
                  {msg.sender}
                </span>
              )}
              <div
                className={`rounded-3xl px-4 py-2 text-sm shadow-sm ${
                  msg.sender === "Kamu"
                    ? "bg-pink-500 text-white self-end"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                }`}>
                <p>{msg.content}</p>
                <div className="flex justify-end items-center gap-1 mt-1 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "Kamu" && (
                    <CheckCheck className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Preview if image attached */}
      {previewImage && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-sm border-t border-gray-300 dark:border-zinc-700">
          <span>📷 Gambar terlampir</span>
          <button
            onClick={() => setPreviewImage(null)}
            className="text-red-500 text-xs">
            Hapus
          </button>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-2 bg-white dark:bg-zinc-900 flex items-center gap-2 border-t border-gray-300 dark:border-zinc-700 rounded-">
        <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreviewImage(URL.createObjectURL(file));
            }}
          />
          <ImageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ketik pesan..."
          className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
