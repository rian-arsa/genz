"use client";

import { Paperclip, Send, Smile } from "lucide-react";
import MessageBubble from "./MessageBuble";
import Image from "next/image";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  return (
    <div className="flex flex-col flex-1 bg-chat bg-cover w-[80%]">
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
      </div>

      {/* Input */}
      <ChatInput />
      {/* <div className="flex items-center gap-2 p-4 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 rounded-full bg-zinc-100 dark:bg-zinc-700 text-sm text-zinc-800 dark:text-white outline-none"
        />
        <Send className="text-pink-500 w-5 h-5 cursor-pointer" />
      </div> */}
    </div>
  );
};

export default ChatWindow;
