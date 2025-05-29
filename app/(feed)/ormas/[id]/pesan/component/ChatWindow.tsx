"use client";

import { useEffect, useRef } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import MessageBubble from "./MessageBuble";
import Image from "next/image";
import ChatInput from "./ChatInput";

type TChatWindowProps = {
  idChat?: string;
};

const ChatWindow = ({ idChat }: TChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [idChat]);

  if (!idChat) {
    return (
      <div className="flex flex-col flex-1 bg-chat bg-cover w-[70%] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-800 dark:text-white">
            Tidak ada pesan yang dipilih
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Pilih salah satu pesan untuk memulai percakapan seru!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-chat bg-cover w-[70%]">
      {/* Header */}
      <div className="text-sm flex gap-4 items-center p-4 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <Image
          src={`/images/avatar1.jpg`} // dummy images/avatar
          alt={`User`}
          width={30}
          height={30}
          className="rounded-full"
        />
        <div className="font-semibold text-base text-zinc-800 dark:text-white">
          Teman 1
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50 dark:bg-zinc-900">
        <MessageBubble sender="Ayu" text="Halo semua! 👋" timestamp="10:12" />
        <MessageBubble
          sender="me"
          text="Hai Ayu, siap rapat hari ini?"
          timestamp="10:13"
        />
        <MessageBubble
          sender="Rizky"
          text="Aku udah standby ya. elative px-3 py-2 rounded-lg text-sm leading-relaxed break-words whitespace-pre-wrap"
          timestamp="10:14"
        />
        <MessageBubble sender="Ayu" text="Halo semua! 👋" timestamp="10:12" />
        <MessageBubble
          sender="me"
          text="Hai Ayu, siap rapat hari ini? elative px-3 py-2 rounded-lg text-sm leading-relaxed break-words whitespace-pre-wrap"
          timestamp="10:13"
        />
        <MessageBubble
          sender="Rizky"
          text="Aku udah standby ya. elative px-3 py-2 rounded-lg text-sm leading-relaxed break-words whitespace-pre-wrap"
          timestamp="10:14"
        />
        <MessageBubble sender="Ayu" text="Halo semua! 👋" timestamp="10:12" />
        <MessageBubble
          sender="me"
          text="Hai Ayu, siap rapat hari ini?"
          timestamp="10:13"
        />
        <MessageBubble
          sender="Rizky"
          text="Aku udah standby ya."
          timestamp="10:14"
        />
        <MessageBubble sender="Ayu" text="Halo semua! 👋" timestamp="10:12" />
        <MessageBubble
          sender="me"
          text="Hai Ayu, siap rapat hari ini?"
          timestamp="10:13"
        />
        <MessageBubble
          sender="Rizky"
          text="Aku udah standby ya."
          timestamp="10:14"
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
